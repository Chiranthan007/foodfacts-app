import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import useFoodSearch from '../hooks/useFoodSearch'
import ErrorMessage from '../components/ErrorMessage'

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

      {/* Error UI */}
      <ErrorMessage message={error} />

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