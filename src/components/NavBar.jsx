import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function NavBar() {
  const savedCount = useSelector((state) => state.saved.items.length)

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
        <Typography variant="h6">
          🥗 FoodFacts
        </Typography>

        <Box>
          <NavLink to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
            Search
          </NavLink>

          <NavLink to="/saved" style={{ color: 'white', textDecoration: 'none' }}>
            Saved ({savedCount})
          </NavLink>
        </Box>

      </Toolbar>
    </AppBar>
  )
}

export default NavBar