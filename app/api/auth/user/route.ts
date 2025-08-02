import { NextResponse } from 'next/server'
import { createClient } from "@/libs/supabase/server"

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ user: null, hasAccess: false })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('has_access')
    .eq('id', user.id)
    .single()

  return NextResponse.json({
    user,
    hasAccess: profile?.has_access ?? false
  })
} 