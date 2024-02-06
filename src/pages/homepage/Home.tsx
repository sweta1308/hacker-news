import { Navbar, NewsList } from '../../components/index'
import './Home.css'
import { useHome } from './useHome'

export const Home = () => {
  const { newsData, currentPage, setCurrentPage, idList } = useHome()

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
