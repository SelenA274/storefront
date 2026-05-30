import api from "@/lib/axios"

export const productService = {
  getAll: () => api.get("/product"),
  getById: (id: string) => api.get(`/product/${id}`),
  getByCategory: (slug: string) => api.get(`/product/category/${slug}`),
  addRating: async (productId: string, rating: number, comment: string) => {
    return api.post(`/product/${productId}/rating`, { rating, comment })
  },
  
  getReviews: async (productId: string) => {
    return api.get(`/product/${productId}`)
  }
}
