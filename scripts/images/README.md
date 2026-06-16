Usage
-----

This small script converts and optimizes banners and product images into `public/images/*`.

1) Install dependencies (if not already):

```bash
pnpm install
# or
npm install
```

2) Put your source images into:

- `scripts/images-src/banners/` — hero/banner images (high-res)
- `scripts/images-src/products/` — product photos (high-res)

3) Run the processor:

```bash
npm run images:process
# or
pnpm images:process
```

What it does:
- Converts banners to `public/images/banners/{name}.webp` at 1600x800.
- Converts each product image into 3 sizes: `public/images/products/{name}-1200.webp`, `-600.webp`, `-300.webp`.

Notes:
- The script uses `sharp` (native binary). On Windows you may need build tools or use the prebuilt binaries.
- After running, update products/categories image references (database or fixtures) to point to the generated files.

Fetch banners from Unsplash (convenience)
---------------------------------------

The repository includes a helper script that will automatically download high-quality, free-to-use photos from Unsplash (randomized by query), process them and place the results into `public/images/banners/`.

Run:

```bash
npm run images:fetch-banners
```

Notes:
- This uses `https://source.unsplash.com/` to obtain search-based images (Unsplash provides free-to-use photography). If you need specific photographer credit or fixed images, provide direct image URLs or place source files into `scripts/images-src/banners/` and run `npm run images:process` instead.
- If `sharp` is not installed, the helper will save the raw JPGs; install dependencies with `npm install` and re-run.
