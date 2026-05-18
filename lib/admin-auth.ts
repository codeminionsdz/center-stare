import type { NextRequest } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export const ADMIN_AUTH_COOKIE = "admin_authenticated"

export async function isAdminAuthorized(request: NextRequest): Promise<boolean> {
  const legacyAdminCookie = request.cookies.get(ADMIN_AUTH_COOKIE)?.value
  if (legacyAdminCookie === "true") {
    return true
  }

  try {
    const supabase = await getSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return false
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
    return profile?.role === "admin"
  } catch (error) {
    console.error("Error checking admin authorization:", error)
    return false
  }
}