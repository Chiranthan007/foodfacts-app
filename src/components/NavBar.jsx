import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function NavBar() {
  const savedCount = useSelector((state) => state.saved.items.length)

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