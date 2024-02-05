import { NewsType } from 'pages/homepage/Home.types'
import { Dispatch, SetStateAction } from 'react'

export type NewsListProps = {
  newsData: NewsType[]
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  idList: number[]
}
