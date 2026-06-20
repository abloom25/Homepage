import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)
  const px = ref(window.innerWidth / 2)
  const py = ref(window.innerHeight / 2)

  let targetX = 0
  let targetY = 0
  let targetPx = px.value
  let targetPy = py.value
  let raf = 0

  function onMove(e: MouseEvent) {
    targetX = (e.clientX / window.innerWidth) * 2 - 1
    targetY = (e.clientY / window.innerHeight) * 2 - 1
    targetPx = e.clientX
    targetPy = e.clientY
  }

  function loop() {
    x.value += (targetX - x.value) * 0.07
    y.value += (targetY - y.value) * 0.07
    px.value += (targetPx - px.value) * 0.18
    py.value += (targetPy - py.value) * 0.18
    raf = requestAnimationFrame(loop)
  }

  onMounted(() => {
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMove)
    cancelAnimationFrame(raf)
  })

  return { x, y, px, py }
}
