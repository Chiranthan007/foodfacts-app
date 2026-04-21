import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../store/savedSlice'
import { Link } from 'react-router-dom'

function SavedPage() {
  const dispatch = useDispatch()
  const savedItems = useSelector((state) => state.saved.items)

  if (savedItems.length === 0) {
    return (
      <div className="page">
        <h2>Saved Items</h2>
        <p>No saved items yet.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>Saved Items</h2>

      <div className="food-list">
        {savedItems.map((item) => {
          const name =
            (item.product_name || item.generic_name || "Unknown Product")
              .toLowerCase()
              .replace(/\b\w/g, (c) => c.toUpperCase())

          return (
            <div key={item.code} className="food-card">
              <img
                src={item.image_small_url || "https://via.placeholder.com/100"}
                alt={name}
              />

              <h3>{name}</h3>

              <p><strong>Brand:</strong> {item.brands || "N/A"}</p>

              <div style={{ marginTop: "10px" }}>
                <Link to={`/product/${item.code}`}>
                  <button style={{ marginRight: "10px" }}>
                    View
                  </button>
                </Link>

                <button onClick={() => dispatch(removeItem(item.code))}>
                  Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SavedPage