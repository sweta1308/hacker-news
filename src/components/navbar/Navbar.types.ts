import { NewsType } from 'pages/homepage/Home.types'
import { Dispatch, SetStateAction } from 'react'

export type NavbarProps = {
  setCurrentPage: Dispatch<SetStateAction<number>>
  currentPage: number
  newsData: NewsType[]
}
