import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { CartProduct } from "@/features/products/types"

interface CartItem {
  _id: string
  product: CartProduct
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { setCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
