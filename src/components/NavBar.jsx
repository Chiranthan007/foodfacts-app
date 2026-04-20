import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav>
      <NavLink to="/">Search</NavLink> |{" "}
      <NavLink to="/saved">Saved</NavLink>
    </nav>
  )
}

export default NavBar