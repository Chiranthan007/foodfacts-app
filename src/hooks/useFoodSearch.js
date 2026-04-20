import { useState } from 'react'
import axios from 'axios'

function useFoodSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchFood = async (query) => {
    if (!query || query.trim().length < 2) {
      setError("Please enter at least 2 characters.")
      setResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=10`

      const response = await axios.get(url)
      const data = response.data

      const filtered = data.products.filter(
        (p) =>
          (p.product_name && p.product_name.trim() !== '') ||
          (p.generic_name && p.generic_name.trim() !== '')
      )

      setResults(filtered)
    } catch (err) {
      setError("Failed to fetch data. Please try again.")
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return {
    results,
    loading,
    error,
    searchFood,
  }
}

export default useFoodSearch