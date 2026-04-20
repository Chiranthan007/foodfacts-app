import { NavLink } from 'react-router-dom'

function NavBar({ savedCount }) {
  return (
    <nav className="navbar">
      <h2 className="logo">🥗 FoodFacts</h2>

      <div className="nav-links">
        <NavLink to="/">Search</NavLink>
        <NavLink to="/saved">Saved ({savedCount})</NavLink>
      </div>
    </nav>
  )
}

export default NavBar