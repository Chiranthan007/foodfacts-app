import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import useFoodSearch from '../hooks/useFoodSearch'

function HomePage() {
  const [hasSearched, setHasSearched] = useState(false)

  const { results, loading, error, searchFood } = useFoodSearch()

  const handleSearch = (query) => {
    setHasSearched(true)
    searchFood(query)
  }

  return (
    <div>
      <h1>🥗 FoodFacts</h1>

      <SearchBar onSearch={handleSearch} />

      {!hasSearched && <p>Search for a food to begin.</p>}

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && results.length > 0 && (
        <FoodList products={results} />
      )}

      {!loading && hasSearched && results.length === 0 && !error && (
        <p>No results found.</p>
      )}
    </div>
  )
}

export default HomePage