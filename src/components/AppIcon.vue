<script setup lang="ts">
import { computed } from 'vue'
import {
  Github,
  PenTool,
  Users,
  GitPullRequest,
  Code,
  Sparkles,
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  ArrowRight,
  Star,
  GitFork,
  Clock,
  MapPin,
  Mail,
  Rss,
  Globe,
  ExternalLink,
  BookOpen,
  type LucideIcon,
} from 'lucide-vue-next'

const props = defineProps<{
  name: string
  size?: number
  strokeWidth?: number
}>()

const map: Record<string, LucideIcon> = {
  github: Github,
  'pen-tool': PenTool,
  users: Users,
  'git-pull-request': GitPullRequest,
  code: Code,
  sparkles: Sparkles,
  'arrow-up-right': ArrowUpRight,
  'arrow-down': ArrowDown,
  'arrow-up': ArrowUp,
  'arrow-right': ArrowRight,
  star: Star,
  'git-fork': GitFork,
  clock: Clock,
  'map-pin': MapPin,
  mail: Mail,
  rss: Rss,
  globe: Globe,
  'external-link': ExternalLink,
  'book-open': BookOpen,
}

const Comp = computed(() => map[props.name] ?? Code)
</script>

<template>
  <component :is="Comp" :size="size ?? 18" :stroke-width="strokeWidth ?? 1.5" />
</template>
