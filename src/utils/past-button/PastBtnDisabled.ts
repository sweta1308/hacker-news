import { NewsType } from 'context/NewsContext.types'

export const isPastBtnDisabled = (currentPage: number, news: NewsType[]) =>
  currentPage === 1 || news?.length === 0 ? true : false
