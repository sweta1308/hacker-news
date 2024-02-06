import './Navbar.css'
import { NavbarProps } from './Navbar.types'

const Navbar = (props: NavbarProps) => {
  const { setCurrentPage, currentPage, newsData } = props
  return (
    <nav data-testid="navbar">
      <div className="nav-container">
        <div className="logo">Y</div>
        <div className="header">Hacker News</div>
        <button onClick={() => setCurrentPage(1)} className="link button">
          new
        </button>
        |
        <button
          disabled={currentPage === 1 || newsData.length === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
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
