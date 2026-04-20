import { useNavigate } from 'react-router-dom'

function SavedPage({ savedItems, dispatch }) {
  const navigate = useNavigate()

  if (savedItems.length === 0) {
    return <p>No saved items yet.</p>
  }

  return (
    <div>
      <h2>Saved Items</h2>

      {savedItems.map((product) => {
        const name =
          (product.product_name || product.generic_name || "Unknown Product")
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase())

        return (
          <div key={product.code} className="food-card">
            <h3>{name}</h3>

            <button onClick={() => navigate(`/product/${product.code}`)}>
              View Details
            </button>

            <button
              onClick={() =>
                dispatch({ type: 'REMOVE', payload: product.code })
              }
            >
              Remove
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default SavedPage