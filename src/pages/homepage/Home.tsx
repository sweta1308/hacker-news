import axios from 'axios'
import { Navbar, NewsList } from '../../components/index'
import './Home.css'
import { useEffect, useState } from 'react'
import { NewsType } from './Home.types'

export const Home = () => {
  const [idList, setIdList] = useState<number[]>([])
  const [newsData, setNewsData] = useState<NewsType[]>([])
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

  useEffect(() => {
    getIds()
  }, [])

  useEffect(() => {
    const fetchObjects = async () => {
      setNewsData([])
      const startIndex = (currentPage - 1) * 30
      const endIndex = currentPage * 30
      const ids = idList.slice(startIndex, endIndex)

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
      setNewsData(newsItems)
    }

    if (idList.length > 0) {
      fetchObjects()
    }
  }, [idList, currentPage])
  return (
    <div className="home">
      <Navbar
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        newsData={newsData}
      />
      <NewsList
        newsData={newsData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        idList={idList}
      />
    </div>
  )
}
