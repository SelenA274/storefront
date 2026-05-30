import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Address {
  _id: string
  city: string
  street: string
  zipCode: string
  country: string
}
interface User {
  _id: string
  name: string
  email: string
  role: string
  createdAt?: string
  addresses?: Address[]
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.isAuthenticated = true
    },
    clearUser(state) {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer