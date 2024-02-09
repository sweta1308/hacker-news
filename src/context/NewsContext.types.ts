import { ReactNode } from 'react'

export type NewsProviderProps = {
  children: ReactNode
}

export type NewsContextProps = {
  news: NewsType[]
  currentPage: number
  isMoreBtnDisabled: boolean
  handleNewClick: () => void
  handlePastClick: () => void
  handleMoreClick: () => void
}

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
