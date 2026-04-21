import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from '../store/savedSlice'
import axios from 'axios'

function DetailPage() {
  const { barcode } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const savedItems = useSelector((state) => state.saved.items)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        const response = await axios.get(url)

        if (response.data.status === 1) {
          setProduct(response.data.product)
        } else {
          setError("Product not found.")
        }
      } catch (err) {
        setError("Failed to fetch product details.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [barcode])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!product) return null

  const name =
    (product.product_name || product.generic_name || "Unknown Product")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())

  const calories =
    product.nutriments?.['energy-kcal_100g'] !== undefined
      ? Math.round(product.nutriments['energy-kcal_100g'])
      : "N/A"

  const isSaved = savedItems.some((item) => item.code === product.code)

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch(removeItem(product.code))
    } else {
      dispatch(addItem(product))
    }
  }

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1>{name}</h1>

      <img
        src={product.image_small_url || "https://via.placeholder.com/150"}
        alt={name}
      />

      <p><strong>Brand:</strong> {product.brands || "Not available"}</p>

      <h3>Nutrition (per 100g)</h3>
      <p>Calories: {calories}</p>
      <p>Protein: {product.nutriments?.proteins_100g ?? "N/A"}</p>
      <p>Carbs: {product.nutriments?.carbohydrates_100g ?? "N/A"}</p>
      <p>Fat: {product.nutriments?.fat_100g ?? "N/A"}</p>

      <button onClick={handleSaveToggle}>
        {isSaved ? "Remove from Saved" : "Save Product"}
      </button>
    </div>
  )
}

export default DetailPage