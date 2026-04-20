import { useNavigate } from 'react-router-dom'

function FoodCard({ product }) {
  const navigate = useNavigate()

  const { product_name, generic_name, brands, nutriments, image_small_url, code } = product

  const name =
    (product_name || generic_name || "Unknown Product")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())

  const calories =
    nutriments?.['energy-kcal_100g'] !== undefined
      ? Math.round(nutriments['energy-kcal_100g'])
      : "N/A"

  const handleClick = () => {
    if (code) {
      navigate(`/product/${code}`)
    }
  }

  return (
    <div className="food-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img
        src={image_small_url || "https://via.placeholder.com/100"}
        alt={name}
      />

      <h2>{name}</h2>

      <p>Brand: {brands || "Not available"}</p>

      <p>Calories: {calories}</p>
      <p>Protein: {nutriments?.proteins_100g ?? "N/A"}</p>
      <p>Carbs: {nutriments?.carbohydrates_100g ?? "N/A"}</p>
    </div>
  )
}

export default FoodCard