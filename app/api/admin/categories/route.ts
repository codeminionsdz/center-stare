import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseAdminClient } from "@/lib/supabase/server"
import { isAdminAuthorized } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
  try {
    const adminSupabase = await getSupabaseAdminClient()

    if (!(await isAdminAuthorized(request))) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()

    const { name, slug, description, parentId } = body

    const { data, error } = await adminSupabase
      .from("categories")
      .insert({
        name,
        slug,
        description,
        parent_id: parentId,
        image: "/pharmacy-category.jpg",
        product_count: 0,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating category:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in POST /api/admin/categories:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
