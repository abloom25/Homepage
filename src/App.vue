<script setup lang="ts">
import GrainOverlay from '@/components/GrainOverlay.vue'
import StarField from '@/components/StarField.vue'
import CustomCursor from '@/components/CustomCursor.vue'
import ScrollProgress from '@/components/ScrollProgress.vue'
import SiteHeader from '@/components/SiteHeader.vue'
</script>

<template>
  <StarField />
  <GrainOverlay />
  <CustomCursor />
  <ScrollProgress />
  <SiteHeader />
  <main>
    <router-view />
  </main>
</template>
