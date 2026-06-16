const fs = require('fs').promises
const path = require('path')
const sharp = require('sharp')

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch (e) {}
}

async function processBanners(inputDir, outputDir) {
  await ensureDir(outputDir)
  const entries = await fs.readdir(inputDir).catch(() => [])
  for (const file of entries) {
    const inPath = path.join(inputDir, file)
    const name = path.parse(file).name
    const outPath = path.join(outputDir, `${name}.webp`)
    try {
      await sharp(inPath)
        .resize(1600, 800, { fit: 'cover' })
        .webp({ quality: 88 })
        .toFile(outPath)
      console.log('BANNER ->', outPath)
    } catch (err) {
      console.error('skip banner', file, err.message)
    }
  }
}

async function processProducts(inputDir, outputDir) {
  await ensureDir(outputDir)
  const entries = await fs.readdir(inputDir).catch(() => [])
  for (const file of entries) {
    const inPath = path.join(inputDir, file)
    const name = path.parse(file).name
    // create full, medium, thumb
    const sizes = [1200, 600, 300]
    for (const w of sizes) {
      const outPath = path.join(outputDir, `${name}-${w}.webp`)
      try {
        await sharp(inPath)
          .resize(w)
          .webp({ quality: w >= 1000 ? 86 : 78 })
          .toFile(outPath)
        console.log('PRODUCT ->', outPath)
      } catch (err) {
        console.error('skip product', file, err.message)
        break
      }
    }
  }
}

async function main() {
  const repoRoot = path.resolve(__dirname, '..', '..')
  const src = path.join(repoRoot, 'scripts', 'images-src')
  const bannersSrc = path.join(src, 'banners')
  const productsSrc = path.join(src, 'products')

  const publicDir = path.join(repoRoot, 'public', 'images')
  const bannersOut = path.join(publicDir, 'banners')
  const productsOut = path.join(publicDir, 'products')

  await processBanners(bannersSrc, bannersOut)
  await processProducts(productsSrc, productsOut)

  console.log('Done. Check public/images/{banners,products}')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
