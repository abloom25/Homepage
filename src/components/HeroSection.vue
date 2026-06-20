<script setup lang="ts">
import { computed } from 'vue'
import { site } from '@/config/site'
import { useMousePosition } from '@/composables/useMousePosition'
import { useNow } from '@/composables/useNow'
import { useGitHub } from '@/composables/useGitHub'
import AppIcon from '@/components/AppIcon.vue'

const { x, y } = useMousePosition()
const { timeString, dateString, greeting } = useNow(site.timezone)
const { slogan, stats } = useGitHub()

const letters = computed(() => site.name.split(''))

const particles = [
  { size: 8, top: '18%', left: '12%', depth: 26, delay: '0s', dur: '9s' },
  { size: 4, top: '32%', left: '78%', depth: 40, delay: '1.2s', dur: '11s' },
  { size: 12, top: '70%', left: '20%', depth: 18, delay: '0.6s', dur: '13s' },
  { size: 5, top: '58%', left: '88%', depth: 50, delay: '2s', dur: '10s' },
  { size: 6, top: '82%', left: '62%', depth: 30, delay: '1.6s', dur: '12s' },
  { size: 3, top: '24%', left: '44%', depth: 60, delay: '0.3s', dur: '8s' },
]
</script>

<template>
  <section id="hero" class="hero" :style="{ '--mx': x, '--my': y }">
    <div class="hero__bg" aria-hidden="true">
      <div class="hero__grid" />
      <div class="hero__glow hero__glow--teal" />
      <div class="hero__glow hero__glow--vermilion" />
      <div class="hero__particles">
        <span
          v-for="(p, i) in particles"
          :key="i"
          class="particle"
          :style="{
            top: p.top,
            left: p.left,
            width: p.size + 'px',
            height: p.size + 'px',
            '--depth': p.depth,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }"
        />
      </div>
      <div class="hero__watermark">ABLOOM</div>
    </div>

    <div class="hero__rail vertical-text" aria-hidden="true">
      Personal Site · 個人主頁 · est. {{ site.since }}
    </div>

    <div class="hero__inner container">
      <p class="hero__eyebrow anim-fadeup" style="animation-delay: 0.1s">
        <span class="hero__dot" /> {{ greeting }}，欢迎来到 {{ site.nameCn }} 的角落
      </p>

      <h1 class="hero__name">
        <span class="hero__letters">
          <span
            v-for="(ch, i) in letters"
            :key="i"
            class="hero__letter"
            :style="{ animationDelay: 0.35 + i * 0.08 + 's' }"
            >{{ ch }}</span
          >
        </span>
        <span class="hero__cn" :style="{ animationDelay: 0.35 + letters.length * 0.08 + 0.1 + 's' }">
          {{ site.nameCn }}
        </span>
      </h1>

      <p class="hero__tagline reveal reveal--mask" v-reveal="{ delay: 600 }">
        <span class="mask-inner">{{ slogan }}</span>
      </p>
      <p class="hero__sub reveal" v-reveal="{ delay: 820 }">
        {{ site.taglineEn }}
        <span class="hero__sep">/</span>
        <span class="hero__lonely">{{ site.lonely }}</span>
        <span class="hero__caret" />
      </p>

      <div class="hero__stats reveal" v-if="stats" v-reveal="{ delay: 920 }">
        <a :href="site.github + '?tab=repositories'" target="_blank" rel="noopener" class="stat" data-cursor="hover">
          <span class="stat__num">{{ stats.repos }}</span>
          <span class="stat__label">Repos</span>
        </a>
        <span class="hero__stats-sep" />
        <a :href="site.github + '?tab=followers'" target="_blank" rel="noopener" class="stat" data-cursor="hover">
          <span class="stat__num">{{ stats.followers }}</span>
          <span class="stat__label">Followers</span>
        </a>
        <span class="hero__stats-sep" />
        <a :href="site.github + '?tab=following'" target="_blank" rel="noopener" class="stat" data-cursor="hover">
          <span class="stat__num">{{ stats.following }}</span>
          <span class="stat__label">Following</span>
        </a>
      </div>

      <div class="hero__footer">
        <div class="hero__clock reveal" v-reveal="{ delay: 1000 }">
          <AppIcon name="clock" :size="15" />
          <span class="hero__time">{{ timeString }}</span>
          <span class="hero__tz">{{ site.timezone }}</span>
          <span class="hero__loc">
            <AppIcon name="map-pin" :size="13" /> {{ site.location }}
          </span>
          <span class="hero__date">{{ dateString }}</span>
        </div>

        <a href="#craft" class="hero__scroll" data-cursor="hover">
          <span class="hero__scroll-text">向下滚动 · scroll</span>
          <span class="hero__scroll-line">
            <span class="hero__scroll-bead" />
          </span>
          <AppIcon name="arrow-down" :size="15" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-block: calc(var(--header-h) + 3rem) 4rem;
}

.hero__bg {
  position: absolute;
  inset: -6%;
  z-index: 0;
  transform: translate3d(calc(var(--mx) * -14px), calc(var(--my) * -14px), 0);
  transition: transform 0.3s var(--ease-out);
}
.hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, var(--line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--line) 1px, transparent 1px);
  background-size: 84px 84px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 80%);
  opacity: var(--grid-opacity);
}
.hero__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
}
.hero__glow--teal {
  width: 46vw;
  height: 46vw;
  top: 8%;
  left: -8%;
  background: radial-gradient(circle, var(--glow-teal), transparent 70%);
  transform: translate3d(calc(var(--mx) * 30px), calc(var(--my) * 30px), 0);
}
.hero__glow--vermilion {
  width: 38vw;
  height: 38vw;
  bottom: 2%;
  right: -6%;
  background: radial-gradient(circle, var(--glow-vermilion), transparent 70%);
  transform: translate3d(calc(var(--mx) * -40px), calc(var(--my) * -24px), 0);
}
.hero__particles {
  position: absolute;
  inset: 0;
}
.particle {
  position: absolute;
  border-radius: 50%;
  background: var(--teal);
  opacity: 0.5;
  transform: translate3d(calc(var(--mx) * var(--depth) * 1px), calc(var(--my) * var(--depth) * 1px), 0);
  animation: floaty 9s ease-in-out infinite;
}
.hero__watermark {
  position: absolute;
  bottom: -3%;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-serif);
  font-size: clamp(8rem, 24vw, 22rem);
  font-weight: 600;
  letter-spacing: 0.05em;
  color: transparent;
  -webkit-text-stroke: 1px var(--watermark-stroke);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
}

.hero__rail {
  position: absolute;
  top: 50%;
  right: 1.6rem;
  transform: translateY(-50%);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: var(--muted);
  z-index: 2;
}

.hero__inner {
  position: relative;
  z-index: 2;
  width: 100%;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  color: var(--muted);
  margin-bottom: 1.8rem;
}
.hero__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vermilion);
  box-shadow: 0 0 0 0 rgba(194, 86, 62, 0.5);
  animation: pulseGlow 2.4s ease-in-out infinite;
}

.hero__name {
  display: flex;
  flex-direction: column;
  line-height: 0.92;
  margin-bottom: 1.6rem;
}
.hero__letters {
  display: inline-flex;
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: clamp(4.5rem, 17vw, 15rem);
  letter-spacing: -0.02em;
  overflow: hidden;
  padding-bottom: 0.06em;
}
.hero__letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(110%) rotate(6deg);
  animation: letterIn 1s var(--ease) forwards;
}
.hero__cn {
  font-family: var(--font-cn-serif);
  font-weight: 500;
  font-size: clamp(1.6rem, 5vw, 3.4rem);
  letter-spacing: 0.4em;
  color: var(--teal);
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 1s var(--ease) forwards;
  margin-left: 0.2em;
}

.hero__tagline {
  font-family: var(--font-cn-serif);
  font-size: clamp(1.5rem, 4vw, 2.6rem);
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 0.7rem;
  overflow: hidden;
}
.hero__sub {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1rem, 2.2vw, 1.35rem);
  color: var(--muted);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 3rem;
}
.hero__sep {
  color: var(--line-strong);
}
.hero__lonely {
  color: var(--vermilion);
}
.hero__caret {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  background: var(--vermilion);
  animation: blink 1.1s step-end infinite;
}

.hero__stats {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  margin-bottom: 2.6rem;
  flex-wrap: wrap;
}
.hero__stats .stat {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  transition: opacity 0.4s var(--ease);
}
.hero__stats .stat:hover {
  opacity: 0.6;
}
.stat__num {
  font-family: var(--font-serif);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--ink);
}
.stat__label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.hero__stats-sep {
  width: 1px;
  height: 22px;
  background: var(--line-strong);
}

.hero__footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}
.hero__clock {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--ink-soft);
}
.hero__clock :deep(svg) {
  color: var(--muted);
}
.hero__time {
  font-size: 1rem;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}
.hero__tz {
  color: var(--muted);
}
.hero__loc {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--teal);
}
.hero__date {
  width: 100%;
  color: var(--muted);
  font-size: 0.78rem;
  margin-top: 0.2rem;
}

.hero__scroll {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  transition: color 0.4s var(--ease);
}
.hero__scroll:hover {
  color: var(--ink);
}
.hero__scroll-line {
  position: relative;
  width: 56px;
  height: 1px;
  background: var(--line-strong);
  overflow: hidden;
}
.hero__scroll-bead {
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  height: 100%;
  background: var(--vermilion);
  animation: scrollHint 1.8s var(--ease) infinite;
}

@media (max-width: 768px) {
  .hero__rail {
    display: none;
  }
  .hero__footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
