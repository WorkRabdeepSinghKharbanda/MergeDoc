import { loadImage } from './image'

/** Brettel/Vienot-style approximation matrices for simulating color vision deficiencies. */
const MATRICES: Record<string, number[]> = {
  protanopia: [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758],
  deuteranopia: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7],
  tritanopia: [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525],
}

export type ColorBlindType = keyof typeof MATRICES

export async function simulateColorBlindness(file: File, type: ColorBlindType): Promise<string> {
  const img = await loadImage(file)
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const m = MATRICES[type]
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    data[i] = r * m[0] + g * m[1] + b * m[2]
    data[i + 1] = r * m[3] + g * m[4] + b * m[5]
    data[i + 2] = r * m[6] + g * m[7] + b * m[8]
  }
  ctx.putImageData(imageData, 0, 0)
  return canvas.toDataURL('image/png')
}
