export const isColorDark = (color: string) => {
  const rgb = color.replace('#', '')
  const r = parseInt(rgb.substring(0, 2), 16)
  const g = parseInt(rgb.substring(2, 4), 16)
  const b = parseInt(rgb.substring(4, 6), 16)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return yiq >= 128
}