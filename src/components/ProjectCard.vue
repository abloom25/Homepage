<script setup lang="ts">
import type { Project } from '@/types'
import { languageColors } from '@/config/site'
import { formatDate } from '@/lib/utils'
import AppIcon from '@/components/AppIcon.vue'

defineProps<{ project: Project; index: number }>()
</script>

<template>
  <article
    class="card"
    :style="{ transitionDelay: index * 70 + 'ms' }"
    data-cursor="hover"
  >
    <a
      :href="project.url"
      target="_blank"
      rel="noopener"
      class="card__main-link"
      :aria-label="`打开 ${project.name} 仓库`"
    />

    <div class="card__top">
      <span class="card__tag">{{ project.tag }}</span>
      <span
        class="card__role"
        :class="{ 'card__role--owner': project.role === 'owner' }"
      >
        {{ project.role === 'owner' ? '作者' : '贡献者' }}
      </span>
    </div>

    <h3 class="card__name">{{ project.name }}</h3>
    <p class="card__desc">{{ project.desc }}</p>

    <div class="card__meta">
      <span class="card__lang">
        <span
          class="card__dot"
          :style="{ background: languageColors[project.language] || '#8a8275' }"
        />
        {{ project.language }}
      </span>
      <span class="card__meta-right">
        <span v-if="project.stars > 0" class="card__stat">
          <AppIcon name="star" :size="13" /> {{ project.stars }}
        </span>
        <span v-if="project.updated" class="card__updated">更新于 {{ formatDate(project.updated) }}</span>
      </span>
    </div>

    <a
      v-if="project.site"
      :href="project.site"
      target="_blank"
      rel="noopener"
      class="card__site"
      data-cursor="hover"
    >
      <AppIcon name="external-link" :size="13" />
      <span>{{ project.site.replace('https://', '') }}</span>
    </a>

    <span class="card__line" />
  </article>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.7rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--cream);
  overflow: hidden;
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.8s var(--ease),
    transform 0.8s var(--ease),
    border-color 0.45s var(--ease),
    box-shadow 0.45s var(--ease);
}
.reveal.is-visible .card {
  opacity: 1;
  transform: none;
}
.card:hover {
  border-color: var(--ink);
  box-shadow: 0 24px 50px -32px rgba(26, 26, 26, 0.4);
  transform: translateY(-6px);
}
.card__main-link {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
}
.card__main-link:focus-visible {
  outline: 2px solid var(--vermilion);
  outline-offset: -4px;
}

.card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.3rem;
}
.card__tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: var(--muted);
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--line);
  border-radius: 999px;
}
.card__role {
  font-family: var(--font-cn-serif);
  font-size: 0.72rem;
  color: var(--teal);
  letter-spacing: 0.04em;
}
.card__role--owner {
  color: var(--vermilion);
}

.card__name {
  font-family: var(--font-serif);
  font-size: 1.7rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 0.6rem;
  padding-right: 1.5rem;
}
.card__desc {
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--ink-soft);
  margin-bottom: 1.5rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.9rem;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: var(--muted);
  margin-bottom: 1rem;
}
.card__lang {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--ink-soft);
}
.card__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.card__stat {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
.card__meta-right {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  margin-left: auto;
}
.card__updated {
  font-size: 0.72rem;
}

.card__site {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: var(--teal);
  padding-bottom: 0.2rem;
  border-bottom: 1px solid transparent;
  transition: border-color 0.4s var(--ease), color 0.4s var(--ease);
}
.card__site:hover {
  border-bottom-color: var(--teal);
  color: var(--ink);
}

.card__line {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 100%;
  background: var(--vermilion);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s var(--ease);
}
.card:hover .card__line {
  transform: scaleX(1);
}
</style>
