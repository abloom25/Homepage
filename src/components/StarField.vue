<script setup lang="ts">
import { computed } from 'vue'

const layers = [
  { count: 60, size: 1, opacity: 0.5, dur: '4s', area: 1200 },
  { count: 40, size: 2, opacity: 0.7, dur: '6s', area: 1000 },
  { count: 20, size: 1, opacity: 0.35, dur: '8s', area: 800 },
]

function genStars(count: number, area: number) {
  const stars: string[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * area)
    const y = Math.floor(Math.random() * area)
    stars.push(`${x}px ${y}px #fff`)
  }
  return stars.join(',')
}

const starLayers = computed(() =>
  layers.map((l) => ({
    ...l,
    shadow: genStars(l.count, l.area),
  })),
)
</script>

<template>
  <div class="starfield" aria-hidden="true">
    <div
      v-for="(layer, i) in starLayers"
      :key="i"
      class="starfield__layer"
      :style="{
        width: layer.size + 'px',
        height: layer.size + 'px',
        boxShadow: layer.shadow,
        animationDuration: layer.dur,
        opacity: layer.opacity,
        animationDelay: i * 1.3 + 's',
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.starfield {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.8s var(--ease);
  background: radial-gradient(ellipse at 50% 40%, rgba(26, 34, 56, 0.4), transparent 70%);
}
.starfield__layer {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  animation: twinkle ease-in-out infinite alternate;
}
@keyframes twinkle {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
<style>
[data-theme='dark'] .starfield {
  opacity: 1;
}
</style>
