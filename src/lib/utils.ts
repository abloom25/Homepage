export function formatDate(iso: string, tz = 'Asia/Shanghai') {
  try {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: tz,
    }).format(new Date(iso))
  } catch {
    return iso
  }
}
