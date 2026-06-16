import React from "react"
import Link from "next/link"
import FilterBar from "@/components/products/FilterBar"
import { getProducts } from "@/lib/data"

export default async function Page({ searchParams }: { searchParams?: { [key: string]: string | string[] } }) {
  try {
    // `searchParams` may be a Promise in some Next versions/environments — unwrap it safely
    const sp: { [key: string]: string | string[] } = (await (searchParams as any)) || (searchParams as any) || {}
    const getSP = (k: string) => {
      const v = sp?.[k]
      return Array.isArray(v) ? v[0] : v
    }

    const page = parseInt(getSP("page") || "1", 10) || 1
    const pageSize = parseInt(getSP("pageSize") || "24", 10) || 24

    const options: any = {
      page,
      pageSize,
      q: getSP("q") || undefined,
      sortBy: (getSP("sortBy") as any) || undefined,
      inStock: getSP("inStock") === "1" || getSP("inStock") === "true",
    }

    const { data: products } = await getProducts(options)

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Products</h1>

        <FilterBar />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center p-8">No products found.</div>
          ) : (
            products.map((p: any) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="block border rounded overflow-hidden hover:shadow"
              >
                <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {p.images && p.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-muted p-8">No image</div>
                  )}
                </div>
                <div className="p-3">
                  <h2 className="font-medium">{p.name}</h2>
                  <div className="text-sm text-muted-foreground">{p.price}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    )
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Error rendering products index:", e)
    return <div className="p-8">Failed to load products.</div>
  }
}
