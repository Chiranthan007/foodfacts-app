import { createSlice } from '@reduxjs/toolkit'

// 🔹 Load from localStorage
const loadFromStorage = () => {
  try {
    const data = localStorage.getItem('savedItems')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

// 🔹 Save to localStorage
const saveToStorage = (items) => {
  try {
    localStorage.setItem('savedItems', JSON.stringify(items))
  } catch {
    // ignore errors
  }
}

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    items: loadFromStorage()
  },
  reducers: {
    addItem: (state, action) => {
      const exists = state.items.find(
        (item) => item.code === action.payload.code
      )

      if (!exists) {
        state.items.push(action.payload)
        saveToStorage(state.items)
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.code !== action.payload
      )
      saveToStorage(state.items)
    }
  }
})

export const { addItem, removeItem } = savedSlice.actions
export default savedSlice.reducer