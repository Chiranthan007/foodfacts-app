function FoodCard({ product }) {
  const { product_name, brands, nutriments, image_small_url } = product

  return (
    <div className="food-card">
      <img
        src={image_small_url || "https://via.placeholder.com/100"}
        alt={product_name || "No image"}
      />

      <h2>{product_name || "Unknown Product"}</h2>

      <p>Brand: {brands || "Unknown"}</p>

      <p>Calories: {nutriments?.['energy-kcal_100g'] || "N/A"}</p>
      <p>Protein: {nutriments?.proteins_100g || "N/A"}</p>
      <p>Carbs: {nutriments?.carbohydrates_100g || "N/A"}</p>
    </div>
  )
}

export default FoodCard