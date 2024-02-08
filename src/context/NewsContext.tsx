import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  FetchedDataType,
  NewsContextProps,
  NewsProviderProps,
  NewsType,
} from './NewsContext.types'

const NewsContext = createContext<NewsContextProps>(undefined!)

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [idList, setIdList] = useState<number[]>([])
  const [newsData, setNewsData] = useState<NewsType[]>([])
  const [fetchedData, setFetchedData] = useState<FetchedDataType>({})
  const [currentPage, setCurrentPage] = useState<number>(1)
  const getIds = async () => {
    try {
      const { status, data } = await axios.get(
        'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
      )
      if (status === 200) {
        setIdList(data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const fetchObjects = async () => {
    setNewsData([])
    const startIndex = (currentPage - 1) * 30
    const endIndex = currentPage * 30
    const ids = idList.slice(startIndex, endIndex)

    if (fetchedData[currentPage]) {
      setNewsData(fetchedData[currentPage])
    } else {
      const newsItems = await Promise.all(
        ids.map(async (id) => {
          const { status, data } = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
          )
          if (status === 200) {
            return data
          } else {
            console.log('Failed to fetch data!')
          }
        }),
      )
      setFetchedData({ ...fetchedData, [currentPage]: newsItems })
      setNewsData(newsItems)
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

  const isMoreBtnDisabled = () => currentPage === Math.ceil(idList?.length / 30)

  const paginate = () => {
    setCurrentPage((prev) => prev + 1)
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  const getNewsListClass = () => newsData?.length > 0 && 'news-list'

  const value = {
    newsData,
    currentPage,
    handleNewClick,
    handlePastClick,
    isMoreBtnDisabled,
    paginate,
    getNewsListClass,
  }

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
}

export const useNews = () => useContext(NewsContext)
