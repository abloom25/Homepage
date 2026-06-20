<script setup lang="ts">
import { socials, site } from '@/config/site'
import { useGitHub } from '@/composables/useGitHub'
import AppIcon from '@/components/AppIcon.vue'

const { orgs } = useGitHub()
</script>

<template>
  <section id="contact" class="contact section">
    <div class="container">
      <p class="eyebrow reveal" v-reveal>
        <span class="section-num">04</span> Contact / 联系
      </p>

      <h2 class="contact__title reveal" v-reveal="{ delay: 100 }">
        <span class="contact__lonely">{{ site.lonely }}</span>
        <span class="contact__cn">— 不如，写封信给时间。</span>
      </h2>
      <p class="contact__lede reveal" v-reveal="{ delay: 200 }">
        若你想聊聊代码、合作一个项目，或只是在某个深夜想找人说句话 ——
        门一直开着。
      </p>

      <div class="links">
        <a
          v-for="(s, i) in socials"
          :key="s.label"
          :href="s.url"
          target="_blank"
          rel="noopener"
          class="link"
          :style="{ transitionDelay: i * 90 + 'ms' }"
          data-cursor="hover"
        >
          <span class="link__icon">
            <AppIcon :name="s.icon" :size="24" />
          </span>
          <span class="link__body">
            <span class="link__label">{{ s.label }}</span>
            <span class="link__en">{{ s.en }}</span>
            <span class="link__desc">{{ s.desc }}</span>
          </span>
          <span class="link__arrow">
            <AppIcon name="arrow-up-right" :size="20" />
          </span>
          <span class="link__bg" />
        </a>
      </div>

      <div class="orgs reveal" v-if="orgs.length" v-reveal="{ delay: 120 }">
        <span class="orgs__cap">所属组织 / Affiliations</span>
        <div class="orgs__list">
          <a
            v-for="o in orgs"
            :key="o.url"
            :href="o.url"
            target="_blank"
            rel="noopener"
            class="org"
            data-cursor="hover"
          >
            <img v-if="o.avatar" :src="o.avatar" :alt="o.login" class="org__avatar" />
            <span v-else class="org__fallback">
              <AppIcon name="users" :size="16" />
            </span>
            <span class="org__name">{{ o.login }}</span>
            <AppIcon name="arrow-up-right" :size="14" class="org__arrow" />
          </a>
        </div>
      </div>

      <div class="contact__cta reveal" v-reveal="{ delay: 200 }">
        <a :href="site.github" target="_blank" rel="noopener" class="btn-ghost" data-cursor="hover">
          <AppIcon name="github" :size="17" /> 在 GitHub 找到我
        </a>
        <a :href="site.blog" target="_blank" rel="noopener" class="btn-ghost" data-cursor="hover">
          <AppIcon name="pen-tool" :size="17" /> 读我的博客
        </a>
        <router-link to="/now" class="btn-ghost" data-cursor="hover">
          <AppIcon name="clock" :size="17" /> 我此刻在做什么
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact__title {
  font-family: var(--font-serif);
  font-size: clamp(2.4rem, 7vw, 5.2rem);
  font-weight: 600;
  line-height: 1.08;
  margin-block: 1.6rem 1.4rem;
  display: flex;
  flex-direction: column;
}
.contact__lonely {
  font-style: italic;
  color: var(--vermilion);
}
.contact__cn {
  font-family: var(--font-cn-serif);
  font-style: normal;
  font-weight: 500;
  font-size: 0.5em;
  color: var(--ink-soft);
  margin-top: 0.6rem;
}
.contact__lede {
  font-family: var(--font-cn-serif);
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  color: var(--muted);
  line-height: 1.8;
  max-width: 52ch;
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
}

.links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
}
.link {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.1rem;
  padding: 1.8rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--cream);
  overflow: hidden;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.8s var(--ease),
    transform 0.8s var(--ease),
    border-color 0.5s var(--ease);
}
.reveal.is-visible .link,
.links .link {
  opacity: 1;
  transform: none;
}
.link:hover {
  border-color: var(--ink);
}

.link__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  color: var(--teal);
  transition: background 0.5s var(--ease), color 0.5s var(--ease), transform 0.5s var(--ease);
}
.link:hover .link__icon {
  background: var(--ink);
  color: var(--paper);
  transform: rotate(-8deg);
}
.link__body {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.link__label {
  font-family: var(--font-cn-serif);
  font-size: 1.2rem;
  font-weight: 600;
}
.link__en {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.9rem;
  color: var(--vermilion);
}
.link__desc {
  font-size: 0.8rem;
  color: var(--muted);
  margin-top: 0.2rem;
}
.link__arrow {
  color: var(--muted);
  transition: transform 0.5s var(--ease), color 0.5s var(--ease);
}
.link:hover .link__arrow {
  transform: translate(5px, -5px);
  color: var(--vermilion);
}
.link__bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(58, 90, 90, 0.08), transparent 60%);
  opacity: 0;
  transition: opacity 0.5s var(--ease);
  pointer-events: none;
}
.link:hover .link__bg {
  opacity: 1;
}

.orgs {
  margin-top: clamp(2.5rem, 6vw, 4rem);
}
.orgs__cap {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1rem;
}
.orgs__list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.org {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 1.1rem 0.6rem 0.6rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--cream);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--ink-soft);
  transition: border-color 0.45s var(--ease), color 0.45s var(--ease), transform 0.45s var(--ease);
}
.org:hover {
  border-color: var(--ink);
  color: var(--ink);
  transform: translateY(-2px);
}
.org__avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  filter: grayscale(0.4) sepia(0.18) contrast(0.95) brightness(1.02);
  mix-blend-mode: multiply;
  transition: filter 0.5s var(--ease), mix-blend-mode 0.5s var(--ease);
}
.org:hover .org__avatar {
  filter: grayscale(0) sepia(0) contrast(1) brightness(1);
  mix-blend-mode: normal;
}
.org__fallback {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--paper-2);
  color: var(--muted);
}
.org__arrow {
  color: var(--muted);
  transition: transform 0.45s var(--ease), color 0.45s var(--ease);
}
.org:hover .org__arrow {
  transform: translate(3px, -3px);
  color: var(--vermilion);
}

.contact__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: clamp(2.5rem, 6vw, 4rem);
}

@media (max-width: 620px) {
  .links {
    grid-template-columns: 1fr;
  }
}
</style>
