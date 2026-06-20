<script setup lang="ts">
import NowView from '@/components/NowView.vue'
import AppIcon from '@/components/AppIcon.vue'
</script>

<template>
  <main class="now-page">
    <NowView />
    <div class="now-page__back container">
      <router-link to="/" class="now-page__link" data-cursor="hover">
        <AppIcon name="arrow-up" :size="15" />
        <span>回到首页 · Back Home</span>
      </router-link>
    </div>
  </main>
</template>

<style scoped lang="scss">
.now-page {
  min-height: 100vh;
  padding-top: var(--header-h);
  display: flex;
  flex-direction: column;
}
.now-page__back {
  margin-top: auto;
  padding-block: 3rem 4rem;
}
.now-page__link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  transition: color 0.4s var(--ease);
}
.now-page__link:hover {
  color: var(--ink);
}
</style>
