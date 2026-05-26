import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Product {
  _id: string
  name: string
  price: number
  description: string
  images: string[]
  category: string
  stock: number
  ratings: number[]
}

interface ProductState {
  products: Product[]
  selectedProduct: Product | null
  loading: boolean
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload
    },
    setSelectedProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
  },
})

export const { setProducts, setSelectedProduct, setLoading } = productSlice.actions
export default productSlice.reducer