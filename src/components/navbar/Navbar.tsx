import { useNews } from 'context/NewsContext'
import './Navbar.css'
import { isPastBtnDisabled } from 'utils/past-button/PastBtnDisabled'

const Navbar = () => {
  const { currentPage, newsData, handleNewClick, handlePastClick } = useNews()
  const isBtnDisabled = isPastBtnDisabled(currentPage, newsData)
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
          disabled={isBtnDisabled}
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
