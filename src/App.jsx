import { useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import SavedPage from './pages/SavedPage'

// reducer
function savedReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      // avoid duplicates using product code
      if (state.find((item) => item.code === action.payload.code)) {
        return state
      }
      return [...state, action.payload]

    case 'REMOVE':
      return state.filter((item) => item.code !== action.payload)

    default:
      return state
  }
}

function App() {
  const [savedItems, dispatch] = useReducer(savedReducer, [])

  return (
    <div>
      <NavBar savedCount={savedItems.length} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/product/:barcode"
            element={<DetailPage savedItems={savedItems} dispatch={dispatch} />}
          />
          <Route
            path="/saved"
            element={<SavedPage savedItems={savedItems} dispatch={dispatch} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App