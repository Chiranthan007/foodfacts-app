import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    onSearch(query)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        marginTop: 3
      }}
    >
      <TextField
        label="Search food"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Button type="submit" variant="contained">
        Search
      </Button>
    </Box>
  )
}

export default SearchBar