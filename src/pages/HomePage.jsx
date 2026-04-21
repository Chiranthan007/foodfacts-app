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

      <SearchBar onSearch={handleSearch} />

      <div style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
        <h3>Start exploring food</h3>
        <p>Search for a product to see nutrition details</p>
      </div>

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