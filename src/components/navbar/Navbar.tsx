import { Dispatch, SetStateAction } from 'react'
import './Navbar.css'

const Navbar = ({
  setCurrentPage,
  currentPage,
}: {
  setCurrentPage: Dispatch<SetStateAction<number>>
  currentPage: number
}) => {
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
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="link button"
        >
          past
        </button>
      </div>
      <div className="link">login</div>
    </nav>
  )
}

export default Navbar
