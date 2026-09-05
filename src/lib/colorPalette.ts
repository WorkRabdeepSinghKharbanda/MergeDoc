import { loadImage } from './image'
import { rgbToHex } from './color'

/** Samples pixels on a grid and buckets them into coarse color bins to approximate dominant colors — no k-means, cheap and good enough for a quick palette. */
export async function extractPalette(file: File, colorCount = 6): Promise<string[]> {
  const img = await loadImage(file)
  const canvas = document.createElement('canvas')
  const maxDim = 200
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
  canvas.width = Math.max(1, Math.round(img.width * scale))
  canvas.height = Math.max(1, Math.round(img.height * scale))
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)

  const buckets = new Map<string, { r: number; g: number; b: number; count: number }>()
  const bucketSize = 32
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const alpha = data[i + 3]
    if (alpha < 128) continue
    const key = [r, g, b].map((c) => Math.floor(c / bucketSize)).join(',')
    const bucket = buckets.get(key) ?? { r: 0, g: 0, b: 0, count: 0 }
    bucket.r += r
    bucket.g += g
    bucket.b += b
    bucket.count += 1
    buckets.set(key, bucket)
  }

  return [...buckets.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, colorCount)
    .map((bucket) => rgbToHex({ r: bucket.r / bucket.count, g: bucket.g / bucket.count, b: bucket.b / bucket.count }))
}
