import { computed, ref } from 'vue'
import { getDocument } from '~/utils/clientStorage'

export const useImageColorExtractor = () => {
  const dominantColor = ref<string>('#000000')
  const isLoading = ref(false)

  const extractDominantColor = async (imageSrc: string): Promise<string> => {
    if (!imageSrc || !import.meta.client) return '#000000'

    isLoading.value = true

    try {
      return new Promise((resolve) => {
        const documentRef = getDocument()
        if (!documentRef) {
          resolve('#000000')
          return
        }

        const img = new Image()
        img.crossOrigin = 'anonymous'

        img.onload = () => {
          const canvas = documentRef.createElement('canvas')
          const ctx = canvas.getContext('2d')

          if (!ctx) {
            resolve('#000000')
            return
          }

          canvas.width = 50
          canvas.height = 50

          ctx.drawImage(img, 0, 0, 50, 50)

          const imageData = ctx.getImageData(0, 0, 50, 50)
          const data = imageData.data

          let r = 0,
            g = 0,
            b = 0
          let pixelCount = 0

          for (let i = 0; i < data.length; i += 4) {
            r += data[i]
            g += data[i + 1]
            b += data[i + 2]
            pixelCount++
          }

          r = Math.floor(r / pixelCount)
          g = Math.floor(g / pixelCount)
          b = Math.floor(b / pixelCount)

          const color = `rgb(${r}, ${g}, ${b})`
          dominantColor.value = color
          resolve(color)
        }

        img.onerror = () => {
          resolve('#000000')
        }

        img.src = imageSrc
      })
    } catch (error) {
      console.error('Error extracting color:', error)
      return '#000000'
    } finally {
      isLoading.value = false
    }
  }

  const getBlurredBackground = computed(() => {
    if (!dominantColor.value) return 'rgba(0, 0, 0, 0.8)'

    const rgb = dominantColor.value.match(/\d+/g)
    if (!rgb) return 'rgba(0, 0, 0, 0.8)'

    const [r, g, b] = rgb.map(Number)
    return `rgba(${r}, ${g}, ${b}, 0.3)`
  })

  return {
    dominantColor,
    isLoading,
    extractDominantColor,
    getBlurredBackground,
  }
}
