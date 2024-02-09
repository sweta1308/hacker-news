import { useNews } from 'context/NewsContext'
import './Navbar.css'

const Navbar = () => {
  const { currentPage, news, handleNewClick, handlePastClick } = useNews()
  const isPastBtnDisabled =
    currentPage === 1 || news?.length === 0 ? true : false
  return (
    <nav data-testid="navbar">
      <div className="nav-container">
        <div className="logo">Y</div>
        <div className="header">Hacker News</div>
        <button onClick={handleNewClick} className="link button">
          new
        </button>
        |
        <button
          disabled={isPastBtnDisabled}
          onClick={handlePastClick}
          className="link button"
        >
          past
        </button>
        |<div>Page No. {currentPage}</div>
      </div>
      <div className="link">login</div>
    </nav>
  )
}

export default Navbar
