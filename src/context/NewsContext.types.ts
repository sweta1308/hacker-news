import { ReactNode } from 'react'

export type NewsProviderProps = {
  children: ReactNode
}

export type NewsContextProps = {
  newsData: NewsType[]
  currentPage: number
  handleNewClick: () => void
  handlePastClick: () => void
  isMoreBtnDisabled: () => boolean
  paginate: () => void
  getNewsListClass: () => string | false
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
