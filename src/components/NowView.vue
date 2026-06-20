<script setup lang="ts">
import { site } from '@/config/site'
import { useNow } from '@/composables/useNow'
import AppIcon from '@/components/AppIcon.vue'

const { dateString } = useNow(site.timezone)

const lastUpdated = '2026-06-20'

const blocks = [
  {
    title: '正在做',
    en: 'Working On',
    items: [
      '打磨 Meliora —— 让音乐播放器更安静、更沉浸。',
      '维护 Ech0 与 Teal Blog 的贡献，偶尔缝补时间的缝隙。',
    ],
  },
  {
    title: '在学',
    en: 'Learning',
    items: [
      'Go 的并发模型与自托管部署的细节。',
      '把设计与代码的边界再收得干净一些。',
    ],
  },
  {
    title: '在读',
    en: 'Reading',
    items: ['一些关于孤独、时间与梦的文字。'],
  },
  {
    title: '在想',
    en: 'Thinking',
    items: ['如何在喧嚣里守住一块安静的自留地。'],
  },
]
</script>

<template>
  <section class="now section">
    <div class="container">
      <header class="now__head">
        <p class="eyebrow reveal" v-reveal>
          <span class="section-num">·</span> Now / 当下
        </p>
        <h1 class="now__title reveal" v-reveal="{ delay: 100 }">
          缝梦的此刻
          <span class="now__title-en">Weaving dreams, right now.</span>
        </h1>
        <p class="now__meta reveal" v-reveal="{ delay: 200 }">
          <AppIcon name="clock" :size="14" />
          <span>更新于 {{ lastUpdated }}</span>
          <span class="now__sep">·</span>
          <span>此刻 {{ dateString }}</span>
        </p>
      </header>

      <div class="now__grid">
        <article
          v-for="(b, i) in blocks"
          :key="b.title"
          class="block reveal"
          v-reveal="{ delay: 120 + i * 100 }"
        >
          <div class="block__head">
            <span class="block__num">0{{ i + 1 }}</span>
            <h2 class="block__title">{{ b.title }}</h2>
            <span class="block__en">{{ b.en }}</span>
          </div>
          <ul class="block__list">
            <li v-for="(item, j) in b.items" :key="j" class="block__item">{{ item }}</li>
          </ul>
        </article>
      </div>

      <p class="now__sig reveal" v-reveal="{ delay: 200 }">
        {{ site.lonely }}
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.now {
  flex: 1;
  padding-block: clamp(4rem, 9vh, 7rem);
}

.now__head {
  max-width: 880px;
  margin-bottom: clamp(3rem, 7vw, 5rem);
}
.now__title {
  font-family: var(--font-cn-serif);
  font-size: clamp(2.4rem, 7vw, 4.4rem);
  font-weight: 500;
  line-height: 1.08;
  margin-block: 1.4rem 1.6rem;
  display: flex;
  flex-direction: column;
}
.now__title-en {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.42em;
  color: var(--muted);
  margin-top: 0.6rem;
  font-weight: 400;
}
.now__meta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--muted);
}
.now__meta :deep(svg) {
  color: var(--vermilion);
}
.now__sep {
  color: var(--line-strong);
}

.now__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(2rem, 5vw, 3.5rem);
  padding-block: clamp(2.5rem, 6vw, 4rem);
  border-block: 1px solid var(--line);
}
.block__head {
  display: flex;
  align-items: baseline;
  gap: 0.7rem;
  margin-bottom: 1.4rem;
}
.block__num {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--vermilion);
}
.block__title {
  font-family: var(--font-cn-serif);
  font-size: 1.3rem;
  font-weight: 600;
}
.block__en {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.85rem;
  color: var(--muted);
}
.block__list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.block__item {
  position: relative;
  padding-left: 1.2rem;
  font-family: var(--font-cn-serif);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--ink-soft);
}
.block__item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7em;
  width: 6px;
  height: 1px;
  background: var(--vermilion);
}

.now__sig {
  margin-top: clamp(3rem, 7vw, 5rem);
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.4rem, 3.5vw, 2.2rem);
  color: var(--vermilion);
  text-align: center;
}

@media (max-width: 760px) {
  .now__grid {
    grid-template-columns: 1fr;
  }
}
</style>
