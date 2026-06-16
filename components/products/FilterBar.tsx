'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialQ = searchParams?.get('q') ?? ''
  const initialSort = searchParams?.get('sortBy') ?? ''
  const initialInStock = searchParams?.get('inStock') ?? ''

  const [q, setQ] = useState(initialQ)
  const [sortBy, setSortBy] = useState(initialSort)
  const [inStock, setInStock] = useState(initialInStock === '1' || initialInStock === 'true')

  useEffect(() => {
    setQ(initialQ)
    setSortBy(initialSort)
    setInStock(initialInStock === '1' || initialInStock === 'true')
  }, [initialQ, initialSort, initialInStock])

  function pushWithParams(params: URLSearchParams) {
    const search = params.toString()
    router.push(`/products${search ? `?${search}` : ''}`)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (q && q.trim()) params.set('q', q.trim())
    else params.delete('q')
    pushWithParams(params)
  }

  function onSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (v) params.set('sortBy', v)
    else params.delete('sortBy')
    pushWithParams(params)
  }

  function onInStockChange(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (checked) params.set('inStock', '1')
    else params.delete('inStock')
    pushWithParams(params)
  }

  function onReset() {
    router.push('/products')
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 items-center mb-6">
      <div className="flex-1">
        <input
          aria-label="Search products"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex items-center gap-3">
        <select value={sortBy} onChange={onSortChange} className="border rounded px-3 py-2">
          <option value="">Sort</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name">Name</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={inStock} onChange={onInStockChange} />
          In stock
        </label>

        <button type="submit" className="bg-primary text-white px-3 py-2 rounded">
          Apply
        </button>

        <button type="button" onClick={onReset} className="px-3 py-2 rounded border">
          Reset
        </button>
      </div>
    </form>
  )
}
