// downloads banner images from Unsplash (random by query) and processes them to WebP
// Usage: node scripts/images/fetch-banners.js

const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const { URL } = require('url')

let sharp
try {
  sharp = require('sharp')
} catch (err) {
  sharp = null
}

const outDir = path.join(__dirname, '../../public/images/banners')
fs.mkdirSync(outDir, { recursive: true })

// Queries to fetch from Unsplash source (trusted, free-to-use photography)
const queries = [
  'barber',
  'barbershop',
  'haircut',
  'barber tools',
  'grooming',
  'hair clippers'
]

const urls = queries.map(q => `https://source.unsplash.com/1600x800/?${encodeURIComponent(q)}`)

function downloadToBuffer(url) {
  return new Promise((resolve, reject) => {
    try {
      const u = new URL(url)
      const lib = u.protocol === 'https:' ? https : http
      const req = lib.get(u, { headers: { 'User-Agent': 'node' } }, (res) => {
        // follow redirects
        if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
          const loc = res.headers.location
          if (!loc) return reject(new Error('Redirect with no location'))
          return resolve(downloadToBuffer(loc))
        }

        if (res.statusCode !== 200) return reject(new Error(`Failed to download ${url} - status ${res.statusCode}`))

        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => resolve(Buffer.concat(chunks)))
      })
      req.on('error', reject)
    } catch (err) {
      reject(err)
    }
  })
}

async function run() {
  console.log('Starting banner fetch + process...')
  for (let i = 0; i < urls.length; i++) {
    const src = urls[i]
    const name = `banner-${i + 1}`
    try {
      console.log(`Downloading: ${src}`)
      const buf = await downloadToBuffer(src)
      if (sharp) {
        const outPath = path.join(outDir, `${name}.webp`)
        await sharp(buf).resize(1600, 800, { fit: 'cover' }).webp({ quality: 85 }).toFile(outPath)
        console.log(`Saved processed: ${outPath}`)
      } else {
        const outPath = path.join(outDir, `${name}.jpg`)
        await fs.promises.writeFile(outPath, buf)
        console.log(`Saved raw image (sharp not installed): ${outPath}`)
      }
    } catch (err) {
      console.error(`Error processing ${src}: ${err.message || err}`)
    }
  }
  console.log('Done.')
}

run().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
