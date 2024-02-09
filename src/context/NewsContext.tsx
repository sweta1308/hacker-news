import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  FetchedDataType,
  NewsContextProps,
  NewsProviderProps,
  NewsType,
} from './NewsContext.types'
import { fetchData } from 'utils/fetch-data/FetchData'

const NewsContext = createContext<NewsContextProps>(undefined!)

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [idList, setIdList] = useState<number[]>([])
  const [news, setNews] = useState<NewsType[]>([])
  const [fetchedData, setFetchedData] = useState<FetchedDataType>({})
  const [currentPage, setCurrentPage] = useState<number>(1)

  const isMoreBtnDisabled = currentPage === Math.ceil(idList?.length / 30)

  const getIds = async () => {
    const data = await fetchData(
      `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`,
    )
    setIdList(data)
  }

  const fetchObjects = async () => {
    setNews([])
    const startIndex = (currentPage - 1) * 30
    const endIndex = currentPage * 30
    const ids = idList.slice(startIndex, endIndex)

    if (fetchedData[currentPage]) {
      setNews(fetchedData[currentPage])
    } else {
      const newsItems = await Promise.all(
        ids.map(async (id) => {
          const data = await fetchData(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
          )
          return data
        }),
      )
      setFetchedData({ ...fetchedData, [currentPage]: newsItems })
      setNews(newsItems)
    }
  }

  useEffect(() => {
    getIds()
  }, [])

  useEffect(() => {
    if (idList.length > 0) {
      fetchObjects()
    }
  }, [idList, currentPage, fetchedData])

  const handleNewClick = () => setCurrentPage(1)

  const handlePastClick = () => setCurrentPage((prev) => prev - 1)

  const handleMoreClick = () => {
    setCurrentPage((prev) => prev + 1)
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  const value = {
    news,
    currentPage,
    handleNewClick,
    handlePastClick,
    isMoreBtnDisabled,
    handleMoreClick,
  }

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
}

export const useNews = () => useContext(NewsContext)
