import { ref, onMounted, onUnmounted } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'abloom-theme'
const theme = ref<Theme>('light')
let initialized = false

function resolveInitial(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (saved === 'light' || saved === 'dark') return saved
  return 'dark'
}

function apply(t: Theme) {
  theme.value = t
  document.documentElement.setAttribute('data-theme', t)
}

export function useTheme() {
  onMounted(() => {
    if (!initialized) {
      initialized = true
      apply(resolveInitial())
    }
  })

  onUnmounted(() => {
    // keep singleton alive across components
  })

  function toggle() {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem(STORAGE_KEY, next)
    apply(next)
  }

  return { theme, toggle }
}
