import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/libs/supabase/server'

export async function GET(req: NextRequest) {
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

  let matchingFounderIds: Set<string> | null = null

  for (const term of terms) {
    const like = `%${term}%`
    // Search founder_profiles
    const { data: fp } = await supabase
      .from('founder_profiles')
      .select('id')
      .or(`founder_name.ilike.${like},company_name.ilike.${like}`)
    // Search founder_education
    const { data: fe } = await supabase
      .from('founder_education')
      .select('founder_id')
      .or(`school.ilike.${like},degree.ilike.${like}`)
    // Search founder_experience
    const { data: fx } = await supabase
      .from('founder_experience')
      .select('founder_id')
      .or(`company.ilike.${like},title.ilike.${like}`)
    // Collect all matching founder_ids for this term
    const ids = new Set<string>([...(fp || []).map(f => f.id), ...(fe || []).map(f => f.founder_id), ...(fx || []).map(f => f.founder_id)])
    // Intersect with previous terms for AND logic
    if (matchingFounderIds === null) {
      matchingFounderIds = ids
    } else {
      matchingFounderIds = new Set(Array.from(matchingFounderIds as Set<string>).filter((id: string) => ids.has(id)))
    }
  }

  // If there are search terms and no matches, return empty
  if (terms.length > 0 && (!matchingFounderIds || matchingFounderIds.size === 0)) {
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

  if (matchingFounderIds) {
    founderQuery = founderQuery.in('id', Array.from(matchingFounderIds))
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