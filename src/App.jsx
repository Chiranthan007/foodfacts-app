import { useState } from 'react'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query) => {
    setLoading(true)
    setHasSearched(true)

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=10`

      const response = await fetch(url)
      const data = await response.json()

      const filtered = data.products.filter(
        (p) => p.product_name && p.product_name.trim() !== ''
      )

      setResults(filtered)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>🥗 FoodFacts</h1>

      <SearchBar onSearch={handleSearch} />

      {!hasSearched && <p>Search for a food to begin.</p>}

      {loading && <p>Loading...</p>}

      {!loading && results.length > 0 && (
        <FoodList products={results} />
      )}

      {!loading && hasSearched && results.length === 0 && (
        <p>No results found.</p>
      )}
    </div>
  )
}

export default App