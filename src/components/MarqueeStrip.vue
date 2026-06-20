<script setup lang="ts">
import { site } from '@/config/site'

const items = [
  site.tagline,
  site.lonely,
  site.taglineEn,
  `Abloom · ${site.nameCn}`,
  'est. ' + site.since,
]
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <span class="marquee__group" v-for="n in 2" :key="n">
        <span v-for="(t, i) in items" :key="i" class="marquee__item">
          {{ t }}
          <span class="marquee__sep">◆</span>
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.marquee {
  position: relative;
  overflow: hidden;
  border-block: 1px solid var(--line);
  padding-block: 1.1rem;
  background: var(--paper);
}
.marquee__track {
  display: inline-flex;
  white-space: nowrap;
  animation: marquee 32s linear infinite;
  will-change: transform;
}
.marquee:hover .marquee__track {
  animation-play-state: paused;
}
.marquee__group {
  display: inline-flex;
  align-items: center;
}
.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  padding-inline: 1.5rem;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.3rem, 3vw, 2.1rem);
  color: var(--ink);
  letter-spacing: 0.01em;
}
.marquee__item:nth-child(even) {
  font-family: var(--font-cn-serif);
  font-style: normal;
  color: var(--muted);
  font-size: clamp(1rem, 2.4vw, 1.5rem);
}
.marquee__sep {
  color: var(--vermilion);
  font-size: 0.6em;
  font-style: normal;
}
</style>
