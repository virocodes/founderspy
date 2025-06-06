'use server'

import { createClient } from "@/libs/supabase/server";

export async function getUserAndAccess() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, hasAccess: false };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('has_access')
    .eq('id', user.id)
    .single();

  return {
    user,
    hasAccess: profile?.has_access ?? false
  };
} 