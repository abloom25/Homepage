export interface SkillCategory {
  title: string
  en: string
  items: string[]
}

export interface ProjectConfig {
  url: string
  role: 'owner' | 'contributor'
  tag?: string
  site?: string
  desc?: string
  name?: string
}

export interface Project {
  name: string
  tag: string
  desc: string
  url: string
  site?: string
  language: string
  stars: number
  role: 'owner' | 'contributor'
  updated: string
}

export interface SocialLink {
  label: string
  en: string
  url: string
  icon: string
  desc: string
}

export interface GithubUser {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  followers: number
  following: number
  public_repos: number
  blog: string | null
  location: string | null
  company: string | null
}

export interface GithubOrg {
  login: string
  url: string
  avatar_url: string
}

export interface OrgLink {
  login: string
  url: string
  avatar: string
}

export interface GithubStats {
  repos: number
  followers: number
  following: number
}
