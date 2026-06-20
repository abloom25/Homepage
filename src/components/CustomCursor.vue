<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
const x = ref(0)
const y = ref(0)
const hovering = ref(false)
const fine = ref(false)
let raf = 0
let tx = 0
let ty = 0

function onMove(e: MouseEvent) {
  tx = e.clientX
  ty = e.clientY
  if (!visible.value) visible.value = true
  const target = e.target as HTMLElement
  hovering.value = !!target.closest('a, button, [data-cursor="hover"]')
}

function loop() {
  x.value += (tx - x.value) * 0.2
  y.value += (ty - y.value) * 0.2
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  fine.value = window.matchMedia('(pointer: fine)').matches
  if (!fine.value) return
  window.addEventListener('mousemove', onMove, { passive: true })
  raf = requestAnimationFrame(loop)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div
    v-if="fine"
    class="cursor"
    :class="{ 'is-hover': hovering, 'is-out': !visible }"
    :style="{ transform: `translate(${x}px, ${y}px)` }"
    aria-hidden="true"
  >
    <span class="cursor__ring" />
    <span class="cursor__dot" />
  </div>
</template>

<style scoped lang="scss">
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  pointer-events: none;
  margin: -18px 0 0 -18px;
  transition: opacity 0.4s var(--ease);
}
.cursor.is-out {
  opacity: 0;
}
.cursor__ring {
  position: absolute;
  inset: 0;
  width: 36px;
  height: 36px;
  border: 1px solid var(--ink);
  border-radius: 50%;
  opacity: 0.5;
  transition:
    width 0.4s var(--ease),
    height 0.4s var(--ease),
    opacity 0.4s var(--ease),
    background 0.4s var(--ease),
    margin 0.4s var(--ease);
}
.cursor__dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: var(--vermilion);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s var(--ease);
}
.cursor.is-hover .cursor__ring {
  width: 64px;
  height: 64px;
  margin: -14px 0 0 -14px;
  background: rgba(194, 86, 62, 0.08);
  border-color: var(--vermilion);
  opacity: 0.9;
}
.cursor.is-hover .cursor__dot {
  opacity: 0;
}
</style>
