import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseAdminClient } from "@/lib/supabase/server"
import { isAdminAuthorized } from "@/lib/admin-auth"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const adminSupabase = await getSupabaseAdminClient()

    if (!(await isAdminAuthorized(request))) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()

    const { name, slug, description, parentId } = body

    const { data, error } = await adminSupabase
      .from("categories")
      .update({
        name,
        slug,
        description,
        parent_id: parentId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating category:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in PUT /api/admin/categories:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const adminSupabase = await getSupabaseAdminClient()

    if (!(await isAdminAuthorized(request))) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 })
    }

    // First delete all subcategories
    await adminSupabase.from("categories").delete().eq("parent_id", id)

    // Then delete the category itself
    const { error } = await adminSupabase.from("categories").delete().eq("id", id)

    if (error) {
      console.error("Error deleting category:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in DELETE /api/admin/categories:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
