import api from "@/lib/axios"

export const productService = {
  getAll: (page = 1) => api.get(`/product?page=${page}`),
  getById: (id: string) => api.get(`/product/${id}`),
  getByCategory: (slug: string, page = 1) => api.get(`/product/category/${slug}?page=${page}`),
  addRating: async (productId: string, rating: number, comment: string) => {
    return api.post(`/product/${productId}/rating`, { rating, comment })
  },

  getReviews: async (productId: string) => {
    return api.get(`/product/${productId}`)
  }
}
