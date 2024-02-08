import { Navbar, NewsList } from '../../components/index'
import './Home.css'

export const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <NewsList />
    </div>
  )
}
