import { ref, computed, onMounted } from 'vue'
import type {
  GithubUser,
  GithubOrg,
  OrgLink,
  GithubStats,
  Project,
  ProjectConfig,
} from '@/types'
import { site, github as ghConfig, projects as projectConfigs } from '@/config/site'

const API = 'https://api.github.com'

interface RepoInfo {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
  html_url: string
  homepage: string | null
}

const user = ref<GithubUser | null>(null)
const orgs = ref<GithubOrg[]>([])
const loading = ref(true)
const error = ref(false)

const repos = ref<Project[]>(projectConfigs.map(fallbackProject))
const reposLoading = ref(true)
let started = false

function parseUrl(url: string): { owner: string; repo: string } | null {
  const m = url.match(/github\.com\/([^/]+)\/([^/#?]+)/)
  if (!m) return null
  return { owner: m[1], repo: m[2].replace(/\.git$/, '') }
}

function lastPath(url: string): string {
  const parts = url.replace(/\/$/, '').split('/')
  return parts[parts.length - 1] || 'Project'
}

function normalizeHome(home: string | null): string | undefined {
  if (!home || !home.trim()) return undefined
  if (/^https?:\/\//i.test(home)) return home
  return `https://${home}`
}

function fallbackProject(p: ProjectConfig): Project {
  return {
    url: p.url,
    name: p.name ?? lastPath(p.url),
    tag: p.tag ?? '项目',
    desc: p.desc ?? '一个安静生长的项目。',
    site: p.site,
    language: '—',
    stars: 0,
    role: p.role,
    updated: '',
  }
}

function mergeProject(p: ProjectConfig, repo: RepoInfo): Project {
  return {
    url: repo.html_url || p.url,
    name: p.name ?? repo.name,
    tag: p.tag ?? '项目',
    desc: p.desc ?? repo.description ?? '一个安静生长的项目。',
    site: p.site ?? normalizeHome(repo.homepage),
    language: repo.language ?? '—',
    stars: repo.stargazers_count ?? 0,
    role: p.role,
    updated: repo.updated_at ?? '',
  }
}

async function loadUserOrgs() {
  if (!ghConfig.dynamic) {
    loading.value = false
    return
  }
  loading.value = true
  error.value = false
  try {
    const u = ghConfig.user
    const [userRes, orgsRes] = await Promise.all([
      fetch(`${API}/users/${u}`),
      fetch(`${API}/users/${u}/orgs`),
    ])
    if (!userRes.ok) throw new Error('GitHub user request failed')
    user.value = (await userRes.json()) as GithubUser
    orgs.value = orgsRes.ok ? ((await orgsRes.json()) as GithubOrg[]) : []
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

async function loadRepos() {
  reposLoading.value = true
  const results = await Promise.allSettled(
    projectConfigs.map(async (p) => {
      const parsed = parseUrl(p.url)
      if (!parsed) throw new Error('invalid url')
      const res = await fetch(`${API}/repos/${parsed.owner}/${parsed.repo}`)
      if (!res.ok) throw new Error('repo fetch failed')
      return { config: p, repo: (await res.json()) as RepoInfo }
    }),
  )
  repos.value = results.map((r, i) => {
    const config = projectConfigs[i]
    if (r.status === 'fulfilled') return mergeProject(r.value.config, r.value.repo)
    return fallbackProject(config)
  })
  reposLoading.value = false
}

async function load() {
  await Promise.all([loadUserOrgs(), loadRepos()])
}

export function useGitHub() {
  onMounted(() => {
    if (!started) {
      started = true
      void load()
    }
  })

  const slogan = computed(() => {
    if (ghConfig.useBioAsSlogan && user.value?.bio) return user.value.bio
    return site.tagline
  })

  const stats = computed<GithubStats | null>(() => {
    if (!ghConfig.showStats || !user.value) return null
    return {
      repos: user.value.public_repos,
      followers: user.value.followers,
      following: user.value.following,
    }
  })

  const orgList = computed<OrgLink[]>(() => {
    if (ghConfig.dynamic && orgs.value.length) {
      return orgs.value.map((o) => ({
        login: o.login,
        url: `https://github.com/${o.login}`,
        avatar: o.avatar_url,
      }))
    }
    return [{ login: site.orgLabel, url: site.org, avatar: '' }]
  })

  return {
    user,
    orgs: orgList,
    loading,
    error,
    slogan,
    stats,
    repos,
    reposLoading,
    reload: load,
  }
}
