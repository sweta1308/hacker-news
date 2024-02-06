import { useEffect, useState } from 'react'
import { FetchedDataType, NewsType } from './Home.types'
import axios from 'axios'

export const useHome = () => {
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

  return { newsData, currentPage, setCurrentPage, idList }
}
