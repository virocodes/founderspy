import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/libs/supabase/server'

export async function GET(req: NextRequest) {
  // Check if request is coming from the same origin
  const origin = req.headers.get('origin')
  const referer = req.headers.get('referer')
  
  // Allow requests from same origin or from your domain
  const allowedOrigins = [
    'http://localhost:3000',
    'https://localhost:3000',
    process.env.NEXT_PUBLIC_SITE_URL, // Your production domain
  ].filter(Boolean)
  
  const isAllowedOrigin = origin && allowedOrigins.includes(origin)
  const isSameOrigin = !origin // Same-origin requests don't have origin header
  const isFromYourDomain = referer && (
    referer.includes('localhost:3000') || 
    (process.env.NEXT_PUBLIC_SITE_URL && referer.includes(process.env.NEXT_PUBLIC_SITE_URL))
  )
  
  // Additional check: prevent direct browser access
  // Direct browser requests typically don't have a referer or have a different pattern
  const isDirectBrowserAccess = !referer || referer === req.url || referer.endsWith('/api/founders')
  
  if (!isAllowedOrigin && !isSameOrigin && !isFromYourDomain) {
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    )
  }
  
  // Block direct browser access
  if (isDirectBrowserAccess) {
    return NextResponse.json(
      { error: 'Direct access not allowed' },
      { status: 403 }
    )
  }

  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '24', 10)
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  // Parse search terms for AND logic
  const terms = search
    .split('+')
    .map(t => t.trim())
    .filter(Boolean)

  let matchingFounderIds: string[] | null = null

  if (terms.length > 0) {
    // Build search conditions for all terms
    const searchConditions = terms.map(term => `%${term}%`)
    
    // Execute all search queries in parallel for better performance
    const searchPromises = searchConditions.map(async (like) => {
      const [fpResult, feResult, fxResult] = await Promise.all([
        // Search founder_profiles
        supabase
          .from('founder_profiles')
          .select('id')
          .or(`founder_name.ilike.${like},company_name.ilike.${like}`),
        // Search founder_education
        supabase
          .from('founder_education')
          .select('founder_id')
          .or(`school.ilike.${like},degree.ilike.${like}`),
        // Search founder_experience
        supabase
          .from('founder_experience')
          .select('founder_id')
          .or(`company.ilike.${like},title.ilike.${like}`)
      ])
      
      // Collect all matching founder_ids for this term
      const founderIds = new Set<string>([
        ...(fpResult.data || []).map(f => f.id),
        ...(feResult.data || []).map(f => f.founder_id),
        ...(fxResult.data || []).map(f => f.founder_id)
      ])
      
      return Array.from(founderIds)
    })
    
    // Wait for all search queries to complete
    const searchResults = await Promise.all(searchPromises)
    
    // Find intersection of all results (AND logic)
    if (searchResults.length > 0) {
      matchingFounderIds = searchResults.reduce((intersection, currentIds) => {
        if (intersection.length === 0) return currentIds
        return intersection.filter(id => currentIds.includes(id))
      }, [] as string[])
    }
  }

  // If there are search terms and no matches, return empty
  if (terms.length > 0 && (!matchingFounderIds || matchingFounderIds.length === 0)) {
    return NextResponse.json({ founders: [], totalCount: 0 })
  }

  // Query founder_profiles with matching IDs (or all if no search)
  let founderQuery = supabase
    .from('founder_profiles')
    .select(`*,
      founder_education(id, school, degree),
      founder_experience(id, company, title)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (matchingFounderIds && matchingFounderIds.length > 0) {
    founderQuery = founderQuery.in('id', matchingFounderIds)
  }

  const { data, error, count } = await founderQuery

  if (error) {
    return NextResponse.json({ founders: [], totalCount: 0 }, { status: 500 })
  }

  return NextResponse.json({
    founders: data || [],
    totalCount: count || 0,
  })
} 