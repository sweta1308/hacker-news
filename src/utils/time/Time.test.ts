import { timeAgo } from './Time'

describe('time ago function', () => {
  test('returns seconds ago', () => {
    const now = Math.floor(Date.now() / 1000)
    const result = timeAgo(now - 30)
    expect(result).toBe('30 seconds ago')
  })

  test('returns minute ago', () => {
    const now = Math.floor(Date.now() / 1000)
    const result = timeAgo(now - 120)
    expect(result).toBe('2 minutes ago')
  })

  test('returns hour ago', () => {
    const now = Math.floor(Date.now() / 1000)
    const result = timeAgo(now - 3600)
    expect(result).toBe('1 hour ago')
  })

  test('returns days ago', () => {
    const now = Math.floor(Date.now() / 1000)
    const result = timeAgo(now - 172800)
    expect(result).toBe('2 days ago')
  })
})
