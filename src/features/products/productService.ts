import api from "@/lib/axios"

export const productService = {
  getAll: () => api.get("/product"),
  getById: (id: string) => api.get(`/product/${id}`),
  getByCategory: (category: string) => api.get(`/product/category/${category}`),
}