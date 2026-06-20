import type { SkillCategory, ProjectConfig, SocialLink } from '@/types'

export const site = {
  name: 'Abloom',
  nameCn: '唤青',
  handle: 'abloom25',
  url: 'https://abloom.site',
  tagline: '我在时间的缝隙里缝梦。',
  taglineEn: 'Weaving dreams in the crevices of time.',
  description:
    'Abloom · 唤青的个人主页，记录作品、技艺、开源项目、博客与当下状态。偏好克制的设计、清晰的抽象与有温度的软件细节。',
  lonely: 'You look lonely.',
  location: 'China',
  timezone: 'Asia/Shanghai',
  github: 'https://github.com/abloom25',
  blog: 'https://blog.abloom.site',
  blogLabel: 'blog.abloom.site',
  memo: 'https://memo.abloom.site',
  memoLabel: 'memo.abloom.site',
  music: 'https://music.abloom.site',
  org: 'https://github.com/NightlightAI',
  orgLabel: 'NightlightAI',
  since: 2024,
}

export const github = {
  user: 'abloom25',
  dynamic: true,
  showStats: true,
  useBioAsSlogan: true,
}

export const skills: SkillCategory[] = [
  {
    title: '语言',
    en: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Go', 'C#', 'Python', 'HTML', 'SCSS'],
  },
  {
    title: '框架',
    en: 'Frameworks',
    items: ['Vue', 'Nuxt', 'React', 'Next.js', 'Node.js'],
  },
  {
    title: '工程',
    en: 'Engineering',
    items: ['Vite', 'pnpm', 'Docker', 'Git', 'Cloudflare', 'Vercel'],
  },
]

export const projects: ProjectConfig[] = [
  {
    url: 'https://github.com/abloom25/Meliora',
    role: 'owner',
    tag: '音乐播放器',
    site: 'https://music.abloom.site',
  },
  {
    url: 'https://github.com/makabaka1880/blog',
    role: 'contributor',
    tag: '个人博客',
    site: 'https://blog.abloom.site',
    name: 'Teal Blog',
    desc: '基于 Nuxt 4 与 Nuxt Content 的个人博客，支持 Markdown、Shiki 代码高亮与 KaTeX 数学渲染。',
  },
  {
    url: 'https://github.com/abloom25/PseudocodeEditor',
    role: 'owner',
    tag: '伪代码 IDE',
    name: 'Pseudocode Editor',
    desc: '面向 Cambridge A-Level 9618 与 IGCSE 0478 的伪代码编辑器，支持语法高亮、实时诊断与一键分享。',
  },
  {
    url: 'https://github.com/lin-snow/Ech0',
    role: 'contributor',
    tag: '自托管微博客',
    site: 'https://memo.abloom.site',
  },
  {
    url: 'https://github.com/abloom25/terminal-header',
    role: 'owner',
    tag: '终端工具',
    desc: '用 Go 编写的轻量终端标题栏工具，可自定义终端窗口的标题显示。',
  },
]

export const socials: SocialLink[] = [
  {
    label: 'GitHub',
    en: 'abloom25',
    url: 'https://github.com/abloom25',
    icon: 'github',
    desc: '代码与开源',
  },
  {
    label: '博客',
    en: 'Blog',
    url: 'https://blog.abloom.site',
    icon: 'pen-tool',
    desc: '文字与思绪',
  },
  {
    label: 'Memo',
    en: 'memo',
    url: 'https://memo.abloom.site',
    icon: 'rss',
    desc: '碎念与回响',
  },
  {
    label: '组织',
    en: 'NightlightAI',
    url: 'https://github.com/NightlightAI',
    icon: 'users',
    desc: '夜灯之下',
  },
]

export const languageColors: Record<string, string> = {
  Vue: '#42b883',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Go: '#00ADD8',
  Python: '#3572A5',
  'C#': '#178600',
  SCSS: '#c6538c',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Rust: '#dea584',
  Java: '#b07219',
}
