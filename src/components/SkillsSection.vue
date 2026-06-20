<script setup lang="ts">
import { skills } from '@/config/site'
</script>

<template>
  <section id="craft" class="craft section">
    <div class="container">
      <header class="craft__head">
        <p class="eyebrow reveal" v-reveal>
          <span class="section-num">02</span> Craft / 技艺
        </p>
        <h2 class="headline craft__title reveal" v-reveal="{ delay: 100 }">
          以代码为笔，<br />在缝隙里缝梦。
        </h2>
        <p class="craft__lede reveal" v-reveal="{ delay: 200 }">
          A maker who turns quiet ideas into running software —
          偏好克制的设计、清晰的抽象与有温度的细节。
        </p>
      </header>

      <div class="craft__grid">
        <div
          v-for="(cat, ci) in skills"
          :key="cat.title"
          class="craft__col reveal"
          v-reveal="{ delay: 120 + ci * 120 }"
        >
          <div class="craft__colhead">
            <span class="craft__colnum">0{{ ci + 1 }}</span>
            <span class="craft__coltitle">{{ cat.title }}</span>
            <span class="craft__colen">{{ cat.en }}</span>
          </div>
          <ul class="tags">
            <li
              v-for="(item, i) in cat.items"
              :key="item"
              class="tag"
              :style="{ transitionDelay: i * 40 + 'ms' }"
              data-cursor="hover"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.craft__head {
  max-width: 880px;
  margin-bottom: clamp(3rem, 7vw, 5rem);
}
.craft__title {
  font-size: clamp(2.2rem, 6vw, 4rem);
  margin-block: 1.4rem 1.6rem;
}
.craft__lede {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  color: var(--muted);
  line-height: 1.7;
}

.craft__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(2rem, 5vw, 4rem);
  padding-block: clamp(2.5rem, 6vw, 4rem);
  border-block: 1px solid var(--line);
}
.craft__colhead {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 1.6rem;
}
.craft__colnum {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--vermilion);
}
.craft__coltitle {
  font-family: var(--font-cn-serif);
  font-size: 1.2rem;
  font-weight: 600;
}
.craft__colen {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.85rem;
  color: var(--muted);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.tag {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  padding: 0.45rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink-soft);
  background: var(--cream);
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.6s var(--ease),
    transform 0.6s var(--ease),
    color 0.4s var(--ease),
    border-color 0.4s var(--ease),
    background 0.4s var(--ease);
}
.reveal.is-visible .tag {
  opacity: 1;
  transform: none;
}
.tag:hover {
  color: var(--paper);
  background: var(--teal);
  border-color: var(--teal);
  transform: translateY(-3px);
}

@media (max-width: 900px) {
  .craft__grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 560px) {
  .craft__grid {
    grid-template-columns: 1fr;
  }
}
</style>
