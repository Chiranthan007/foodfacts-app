import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from '../store/savedSlice'
import axios from 'axios'

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box
} from '@mui/material'

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
      } catch {
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

  const handleToggle = () => {
    if (isSaved) {
      dispatch(removeItem(product.code))
    } else {
      dispatch(addItem(product))
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image_small_url || "https://via.placeholder.com/150"}
          alt={name}
        />

        <CardContent>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>

          <Typography variant="body2">
            <strong>Brand:</strong> {product.brands || "N/A"}
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Nutrition (per 100g)
          </Typography>

          <Typography variant="body2">Calories: {calories}</Typography>
          <Typography variant="body2">
            Protein: {product.nutriments?.proteins_100g ?? "N/A"}
          </Typography>
          <Typography variant="body2">
            Carbs: {product.nutriments?.carbohydrates_100g ?? "N/A"}
          </Typography>
          <Typography variant="body2">
            Fat: {product.nutriments?.fat_100g ?? "N/A"}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleToggle}
          >
            {isSaved ? "Remove from Saved" : "Save Product"}
          </Button>

          <Button
            variant="text"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default DetailPage