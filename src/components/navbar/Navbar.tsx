import './Navbar.css'

const Navbar = () => {
  return (
    <nav data-testid="navbar">
      <div className="nav-container">
        <div className="logo">Y</div>
        <div className="header">Hacker News</div>
        <div className="link">new</div>|<div className="link">past</div>
      </div>
      <div className="link">login</div>
    </nav>
  )
}

export default Navbar
