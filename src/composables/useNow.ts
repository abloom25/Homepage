import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useNow(tz = 'Asia/Shanghai') {
  const now = ref(new Date())
  let timer = 0

  onMounted(() => {
    timer = window.setInterval(() => {
      now.value = new Date()
    }, 1000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  const timeString = computed(() =>
    new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: tz,
    }).format(now.value),
  )

  const dateString = computed(() =>
    new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      timeZone: tz,
    }).format(now.value),
  )

  const greeting = computed(() => {
    const hour = parseInt(timeString.value.slice(0, 2), 10)
    if (hour < 5) return '夜深了'
    if (hour < 11) return '早安'
    if (hour < 14) return '午安'
    if (hour < 18) return '下午好'
    if (hour < 22) return '晚上好'
    return '夜安'
  })

  return { now, timeString, dateString, greeting }
}
