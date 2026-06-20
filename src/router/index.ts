import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import NowPage from '@/pages/NowPage.vue'
import { site } from '@/config/site'

const defaultTitle = `${site.name} · ${site.nameCn} - ${site.tagline}`
const defaultDescription = site.description
const ogImage = `${site.url}/og-image.svg`

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector)
  if (el) el.setAttribute(attr, value)
}

function setPageSeo(title: string, description: string, canonicalPath: string) {
  const url = new URL(canonicalPath, site.url).toString()

  document.title = title
  setMeta('meta[name="description"]', 'content', description)
  setMeta('meta[property="og:title"]', 'content', title)
  setMeta('meta[property="og:description"]', 'content', description)
  setMeta('meta[property="og:url"]', 'content', url)
  setMeta('meta[property="og:image"]', 'content', ogImage)
  setMeta('meta[name="twitter:title"]', 'content', title)
  setMeta('meta[name="twitter:description"]', 'content', description)
  setMeta('meta[name="twitter:image"]', 'content', ogImage)
  setMeta('link[rel="canonical"]', 'href', url)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: defaultTitle,
        description: defaultDescription,
        canonicalPath: '/',
      },
    },
    {
      path: '/now',
      name: 'now',
      component: NowPage,
      meta: {
        title: `Now · ${site.nameCn} - ${site.name}`,
        description: `${site.nameCn}的当下状态：正在做的项目、正在学习的内容、阅读与思考。`,
        canonicalPath: '/now',
      },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (_to.hash) {
      return { el: _to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  setPageSeo(
    to.meta.title ?? defaultTitle,
    to.meta.description ?? defaultDescription,
    to.meta.canonicalPath ?? to.path,
  )
})

export default router
