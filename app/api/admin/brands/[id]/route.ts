import { NextResponse, NextRequest } from "next/server"
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
    const { name, slug, description, logo, featured } = body

    if (!name || !slug) {
      return NextResponse.json({ success: false, error: "Name and slug are required" }, { status: 400 })
    }

    // Update brand
    const { data: brand, error } = await adminSupabase
      .from("brands")
      .update({
        name,
        slug,
        description: description || null,
        logo: logo || null,
        featured: featured || false,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating brand:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data: brand })
  } catch (error) {
    console.error("Error in PUT /api/admin/brands/[id]:", error)
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

    // Delete brand
    const { error } = await adminSupabase.from("brands").delete().eq("id", id)

    if (error) {
      console.error("Error deleting brand:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data: null })
  } catch (error) {
    console.error("Error in DELETE /api/admin/brands/[id]:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
