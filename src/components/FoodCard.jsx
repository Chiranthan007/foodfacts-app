import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material'
import { Link } from 'react-router-dom'

function FoodCard({ product }) {
  const name =
    (product.product_name || product.generic_name || "Unknown Product")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())

  const calories =
    product.nutriments?.['energy-kcal_100g'] !== undefined
      ? Math.round(product.nutriments['energy-kcal_100g'])
      : "N/A"

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image_small_url || "https://via.placeholder.com/150"}
        alt={name}
      />

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>

        <Typography variant="body2">
          Brand: {product.brands || "N/A"}
        </Typography>

        <Typography variant="body2">
          Calories: {calories}
        </Typography>

        <Typography variant="body2">
          Protein: {product.nutriments?.proteins_100g ?? "N/A"}
        </Typography>
      </CardContent>

      <CardActions>
        <Link to={`/product/${product.code}`} style={{ textDecoration: 'none' }}>
          <Button size="small">View</Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default FoodCard