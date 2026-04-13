'use client'
import { useState, useEffect } from 'react'

interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

export function useCountdown(deadlineAt: string): Countdown {
  function calc(): Countdown {
    const diff = new Date(deadlineAt).getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
    const s = Math.floor(diff / 1000)
    return {
      days:    Math.floor(s / 86400),
      hours:   Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
      expired: false,
    }
  }

  const [countdown, setCountdown] = useState<Countdown>(calc)

  useEffect(() => {
    const interval = setInterval(() => setCountdown(calc()), 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadlineAt])

  return countdown
}
