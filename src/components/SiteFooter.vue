<script setup lang="ts">
import { computed } from 'vue'
import { site } from '@/config/site'
import { useNow } from '@/composables/useNow'
import { useGitHub } from '@/composables/useGitHub'
import AppIcon from '@/components/AppIcon.vue'

const { timeString } = useNow(site.timezone)
const { orgs } = useGitHub()
const year = new Date().getFullYear()

const elsewhere = computed(() => {
  const base = [
    { label: 'GitHub', url: site.github },
    { label: 'Blog', url: site.blog },
    { label: 'Memo', url: site.memo },
    { label: 'Music', url: site.music },
  ]
  orgs.value.forEach((o) => base.push({ label: o.login, url: o.url }))
  return base
})
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <a href="#hero" class="footer__word" data-cursor="hover">
          <span class="footer__word-en">Abloom</span>
          <span class="footer__word-cn">{{ site.nameCn }}</span>
        </a>
        <p class="footer__sig">{{ site.tagline }}</p>
      </div>

      <div class="footer__mid">
        <div class="footer__col">
          <span class="footer__cap">Local Time</span>
          <span class="footer__time">{{ timeString }}</span>
          <span class="footer__sub">{{ site.timezone }} · {{ site.location }}</span>
        </div>
        <div class="footer__col">
          <span class="footer__cap">Elsewhere</span>
          <a
            v-for="e in elsewhere"
            :key="e.url"
            :href="e.url"
            target="_blank"
            rel="noopener"
            class="link-underline footer__link"
            data-cursor="hover"
            >{{ e.label }}</a
          >
        </div>
      </div>

      <div class="footer__bottom">
        <span class="footer__note">© {{ year }} Abloom · {{ site.nameCn }} — {{ site.lonely }}</span>
        <a href="#hero" class="footer__top-btn" data-cursor="hover" aria-label="回到顶部">
          <AppIcon name="arrow-up" :size="16" />
          <span>Top</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  position: relative;
  padding-block: clamp(3.5rem, 8vw, 6rem) 2rem;
  border-top: 1px solid var(--line);
  background: var(--paper-2);
  overflow: hidden;
}
.footer__top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  padding-bottom: clamp(2.5rem, 6vw, 4rem);
  border-bottom: 1px solid var(--line);
}
.footer__word {
  display: flex;
  flex-direction: column;
  line-height: 0.9;
}
.footer__word-en {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: clamp(3.5rem, 12vw, 9rem);
  letter-spacing: -0.02em;
  transition: color 0.5s var(--ease);
}
.footer__word:hover .footer__word-en {
  color: var(--vermilion);
}
.footer__word-cn {
  font-family: var(--font-cn-serif);
  font-size: clamp(1.2rem, 3vw, 2rem);
  letter-spacing: 0.4em;
  color: var(--teal);
  margin-top: 0.4rem;
}
.footer__sig {
  font-family: var(--font-cn-serif);
  font-size: clamp(1rem, 2vw, 1.4rem);
  color: var(--muted);
  max-width: 20ch;
  text-align: right;
}

.footer__mid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding-block: clamp(2.5rem, 6vw, 3.5rem);
}
.footer__col {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.footer__cap {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.5rem;
}
.footer__time {
  font-family: var(--font-serif);
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.footer__sub {
  font-size: 0.85rem;
  color: var(--ink-soft);
}
.footer__link {
  font-family: var(--font-cn-serif);
  font-size: 0.98rem;
  width: fit-content;
}

.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
}
.footer__note {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.92rem;
  color: var(--muted);
}
.footer__top-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-soft);
  padding: 0.6rem 1.1rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  transition: background 0.45s var(--ease), color 0.45s var(--ease), border-color 0.45s var(--ease), transform 0.45s var(--ease);
}
.footer__top-btn:hover {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
  transform: translateY(-3px);
}

@media (max-width: 760px) {
  .footer__mid {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }
  .footer__sig {
    text-align: left;
  }
}
</style>
