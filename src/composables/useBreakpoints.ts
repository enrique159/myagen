import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

const { width } = useWindowSize()

export const useBreakpoints = () => {
  const isDesktop = computed(() => {
    return width.value >= 1024
  })

  const isTablet = computed(() => {
    return width.value >= 768 && width.value < 1024
  })

  const isMobile = computed(() => {
    return width.value < 768
  })

  return {
    isDesktop,
    isTablet,
    isMobile,
  }
}
