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
        data?.map((id: number) => id && getData(id))
        setIdList(data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async (id: number) => {
    try {
      const response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
      )
      setNewsData((prev) => [...prev, response?.data])
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getIds()
  }, [])
  return (
    <div className="home">
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <NewsList
        newsData={newsData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        idList={idList}
      />
    </div>
  )
}
