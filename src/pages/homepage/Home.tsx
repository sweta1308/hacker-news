import axios from 'axios'
import { Navbar, NewsList } from '../../components/index'
import './Home.css'
import { useEffect, useState } from 'react'
import { NewsType } from './Home.types'

export const Home = () => {
  const [newsData, setNewsData] = useState<NewsType[]>([])
  const getIds = async () => {
    try {
      const { status, data } = await axios.get(
        'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
      )
      if (status === 200) {
        data?.map((id: number) => id && getData(id))
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
  console.log(newsData)
  return (
    <div className="home">
      <Navbar />
      <NewsList newsData={newsData} />
    </div>
  )
}
