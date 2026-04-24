import { useEffect, useState } from 'react'

export const useDebouncedValue = <T>(value: T, delayInMs: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delayInMs)

    return () => clearTimeout(timeoutId)
  }, [value, delayInMs])

  return debouncedValue
}