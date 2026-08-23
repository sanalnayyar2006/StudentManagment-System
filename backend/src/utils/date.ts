export function parseDate(dateStr: string | undefined | null): Date {
  if (!dateStr) return new Date()

  const cleaned = dateStr.trim()

  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
    return new Date(cleaned + 'T00:00:00.000Z')
  }

  const parts = cleaned.split('-')
  if (parts.length === 3) {
    const [day, month, year] = parts
    const d = Number(day)
    const m = Number(month)
    const y = Number(year)
    if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1000 && y <= 9999) {
      return new Date(Date.UTC(y, m - 1, d))
    }
  }

  const parsed = new Date(cleaned)
  if (!isNaN(parsed.getTime())) {
    return parsed
  }

  return new Date()
}
