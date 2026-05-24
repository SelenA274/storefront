import api from "@/lib/axios"

export const cartService = {
  getCart: () => api.get("/cart"),
  addToCart: (productId: string, quantity: number) =>
    api.post("/cart", { productId, quantity }),
  updateQty: (productId: string, quantity: number) =>
    api.put(`/cart/${productId}`, { quantity }),
  removeItem: (productId: string) => api.delete(`/cart/${productId}`),
  clearCart: () => api.delete("/cart"),
  syncCart: (items: { productId: string; quantity: number }[]) =>
    api.post("/cart/sync", { items }),
}