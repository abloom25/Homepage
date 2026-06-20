<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollProgress } from '@/composables/useScrollProgress'
import { useTheme } from '@/composables/useTheme'
import { site } from '@/config/site'
import AppIcon from '@/components/AppIcon.vue'

const { scrolled } = useScrollProgress()
const router = useRouter()
const { theme, toggle } = useTheme()

const nav = [
  { num: '01', label: '序章', en: 'Intro', href: '#hero' },
  { num: '02', label: '技艺', en: 'Craft', href: '#craft' },
  { num: '03', label: '作品', en: 'Works', href: '#works' },
  { num: '04', label: '联系', en: 'Contact', href: '#contact' },
]

const headerClass = computed(() => ({
  'is-scrolled': scrolled.value,
}))

function goSection(hash: string) {
  if (router.currentRoute.value.path === '/') {
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push({ path: '/', hash })
  }
}
</script>

<template>
  <header class="header" :class="headerClass">
    <div class="header__inner container">
      <router-link to="/" class="wordmark" data-cursor="hover">
        <span class="wordmark__mark">A</span>
        <span class="wordmark__text">
          <span class="wordmark__en">Abloom</span>
          <span class="wordmark__cn">{{ site.nameCn }}</span>
        </span>
      </router-link>

      <nav class="nav" aria-label="主导航">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          class="nav__item"
          data-cursor="hover"
          @click.prevent="goSection(item.href)"
        >
          <span class="nav__num">{{ item.num }}</span>
          <span class="nav__label">{{ item.label }}</span>
          <span class="nav__en">{{ item.en }}</span>
        </a>
        <router-link to="/now" class="nav__item nav__item--now" data-cursor="hover">
          <span class="nav__num">·</span>
          <span class="nav__label">当下</span>
          <span class="nav__en">Now</span>
        </router-link>
      </nav>

      <div class="header__actions">
        <button
          class="header__theme"
          :aria-label="theme === 'dark' ? '切换到亮色' : '切换到暗色'"
          data-cursor="hover"
          @click="toggle"
        >
          <svg v-if="theme === 'dark'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <a
          :href="site.github"
          target="_blank"
          rel="noopener"
          class="header__gh"
          data-cursor="hover"
          aria-label="GitHub"
        >
          <AppIcon name="github" :size="19" />
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: background 0.5s var(--ease), border-color 0.5s var(--ease);
  border-bottom: 1px solid transparent;
}
.header.is-scrolled {
  background: color-mix(in srgb, var(--paper) 82%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--line);
}
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-h);
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
}
.wordmark__mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--ink);
  border-radius: 50%;
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  transition: transform 0.6s var(--ease), background 0.5s var(--ease), color 0.5s var(--ease);
}
.wordmark:hover .wordmark__mark {
  transform: rotate(360deg);
  background: var(--ink);
  color: var(--paper);
}
.wordmark__text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}
.wordmark__en {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.wordmark__cn {
  font-family: var(--font-cn-serif);
  font-size: 0.7rem;
  color: var(--muted);
  margin-top: 2px;
}

.nav {
  display: flex;
  align-items: center;
  gap: clamp(1.2rem, 3vw, 2.6rem);
}
.nav__item {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  padding-block: 0.4rem;
  transition: color 0.4s var(--ease);
}
.nav__item::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: var(--ink);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s var(--ease);
}
.nav__item:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
.nav__num {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--vermilion);
}
.nav__label {
  font-family: var(--font-cn-serif);
  font-size: 0.98rem;
}
.nav__en {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.78rem;
  color: var(--muted);
}
.nav__item--now {
  margin-left: 0.6rem;
  padding-left: 1.2rem;
  border-left: 1px solid var(--line);
}
.nav__item--now .nav__num {
  color: var(--vermilion);
}
.router-link-active.nav__item::after {
  transform: scaleX(1);
  transform-origin: left;
  background: var(--vermilion);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.header__theme {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  color: var(--ink);
  transition:
    background 0.45s var(--ease),
    color 0.45s var(--ease),
    border-color 0.45s var(--ease),
    transform 0.5s var(--ease);
}
.header__theme:hover {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
  transform: translateY(-2px) rotate(20deg);
}
.header__theme svg {
  transition: transform 0.6s var(--ease);
}

.header__gh {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  transition:
    background 0.45s var(--ease),
    color 0.45s var(--ease),
    border-color 0.45s var(--ease),
    transform 0.45s var(--ease);
}
.header__gh:hover {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
  transform: translateY(-2px);
}

@media (max-width: 860px) {
  .nav__en,
  .nav__label {
    display: none;
  }
  .nav {
    gap: 1.1rem;
  }
  .nav__item {
    gap: 0;
  }
}
@media (max-width: 520px) {
  .nav {
    display: none;
  }
}
</style>
