import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollProgress() {
  const progress = ref(0)
  const scrolled = ref(false)

  function update() {
    const doc = document.documentElement
    const body = document.body
    const top = doc.scrollTop || body.scrollTop
    const max = (doc.scrollHeight || body.scrollHeight) - (doc.clientHeight || body.clientHeight)
    progress.value = max > 0 ? Math.min(1, top / max) : 0
    scrolled.value = top > 24
  }

  onMounted(() => {
    update()
    const target = document.scrollingElement || document.body
    target.addEventListener('scroll', update, { passive: true })
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
  })

  onUnmounted(() => {
    const target = document.scrollingElement || document.body
    target.removeEventListener('scroll', update)
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  })

  return { progress, scrolled }
}
