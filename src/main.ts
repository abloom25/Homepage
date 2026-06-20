import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vReveal } from './directives/reveal'
import './styles/main.scss'

void (() => {
  const saved = localStorage.getItem('abloom-theme')
  const t = saved === 'light' || saved === 'dark' ? saved : 'dark'
  document.documentElement.setAttribute('data-theme', t)
})()

const app = createApp(App)
app.directive('reveal', vReveal)
app.use(router)
app.mount('#app')
