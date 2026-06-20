<script setup lang="ts">
import { site } from '@/config/site'
import { useGitHub } from '@/composables/useGitHub'
import AppIcon from '@/components/AppIcon.vue'
import ProjectCard from '@/components/ProjectCard.vue'

const { repos, reposLoading } = useGitHub()
</script>

<template>
  <section id="works" class="works section">
    <div class="container">
      <header class="works__head">
        <div>
          <p class="eyebrow reveal" v-reveal>
            <span class="section-num">03</span> Works / 作品
          </p>
          <h2 class="headline works__title reveal" v-reveal="{ delay: 100 }">
            缝出来的，<br />都是梦的形状。
          </h2>
        </div>
        <a
          :href="site.github + '?tab=repositories'"
          target="_blank"
          rel="noopener"
          class="works__all link-underline reveal"
          v-reveal="{ delay: 200 }"
          data-cursor="hover"
        >
          全部仓库 <AppIcon name="arrow-up-right" :size="15" />
        </a>
      </header>

      <div class="works__grid reveal" v-reveal="{ delay: 100 }">
        <template v-if="reposLoading">
          <div v-for="n in repos.length || 5" :key="'sk' + n" class="skel">
            <div class="skel__row">
              <div class="skel__bar skeleton" style="width: 30%" />
              <div class="skel__bar skeleton skel__dot" />
            </div>
            <div class="skel__bar skeleton" style="width: 65%; height: 26px" />
            <div class="skel__bar skeleton" style="width: 92%" />
            <div class="skel__bar skeleton" style="width: 70%" />
            <div class="skel__bar skeleton" style="width: 45%; margin-top: auto" />
          </div>
        </template>

        <template v-else>
          <ProjectCard
            v-for="(project, i) in repos"
            :key="project.url"
            :project="project"
            :index="i"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.works__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
}
.works__title {
  font-size: clamp(2.2rem, 6vw, 4rem);
  margin-top: 1.4rem;
}
.works__all {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.works__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.4rem;
}

.skel {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1.7rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--cream);
  min-height: 240px;
}
.skel__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.7rem;
}
.skel__bar {
  height: 12px;
  border-radius: 2px;
}
.skel__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

@media (max-width: 760px) {
  .works__grid {
    grid-template-columns: 1fr;
  }
}
</style>
