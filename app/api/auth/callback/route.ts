import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/libs/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
    
    // Get the user after authentication
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Check if user already has access
      const { data: profile } = await supabase
        .from("profiles")
        .select("has_access")
        .eq("id", user.id)
        .single();
      
      // If user already has access, redirect to home page
      if (profile?.has_access) {
        return NextResponse.redirect(requestUrl.origin + "/");
      }
    }
  }

  // Redirect to checkout if user doesn't have access
  return NextResponse.redirect(requestUrl.origin + "/checkout");
} 