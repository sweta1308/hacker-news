type TimeType = (unixTimeStamp: number) => string

export const timeAgo: TimeType = (unixTimestamp) => {
  const now = Math.floor(Date.now() / 1000)
  const secondsAgo = now - unixTimestamp

  if (secondsAgo < 60) {
    return secondsAgo + ' seconds ago'
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60)
    return minutesAgo + (minutesAgo === 1 ? ' minute ago' : ' minutes ago')
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600)
    return hoursAgo + (hoursAgo === 1 ? ' hour ago' : ' hours ago')
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400)
    return daysAgo + (daysAgo === 1 ? ' day ago' : ' days ago')
  }
}
