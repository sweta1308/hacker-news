export type NewsType = {
  by: string
  descendants: number
  id: number
  kids: number[]
  score: number
  time: number
  title: string
  type: string
  url: string
  text?: string
}

export type FetchedDataType = {
  [key: number]: NewsType[]
}
