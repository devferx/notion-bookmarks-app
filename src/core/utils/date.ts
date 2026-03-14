function parseDateInput(value: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  return new Date(value)
}

export function toLocalDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function formatBookmarkDate(value?: string | null): string {
  if (!value) return '-'

  const date = parseDateInput(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  const now = new Date()
  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    date,
  )

  if (date.getFullYear() === now.getFullYear()) {
    return `${day} ${month}`
  }

  return `${day} ${month}, ${date.getFullYear()}`
}
