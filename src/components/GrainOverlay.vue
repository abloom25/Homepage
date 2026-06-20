<script setup lang="ts">
</script>

<template>
  <div class="grain" aria-hidden="true" />
</template>

<style scoped lang="scss">
.grain {
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  opacity: var(--grain-opacity);
  mix-blend-mode: var(--grain-blend);
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  background-size: 220px 220px;
}
</style>
