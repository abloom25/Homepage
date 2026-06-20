<script setup lang="ts">
import { useScrollProgress } from '@/composables/useScrollProgress'

const { progress } = useScrollProgress()
</script>

<template>
  <div class="progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />
</template>

<style scoped lang="scss">
.progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  transform-origin: left center;
  background: linear-gradient(90deg, var(--vermilion), var(--teal));
  z-index: 9999;
  transition: transform 0.1s linear;
}
</style>
