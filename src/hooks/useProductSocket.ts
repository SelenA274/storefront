import { useEffect } from "react"
import { io } from "socket.io-client"

export const useProductSocket = (
    productId: string,
    onStockUpdate: (newStock: number) => void,
    onOutOfStock: () => void
) => {
    useEffect(() => {
        if (!productId) return

        const socket = io(process.env.NEXT_PUBLIC_API_URL!)

        socket.emit("join-product", productId)

        socket.on("stock-updated", ({ productId: pid, newStock }: { productId: string; newStock: number }) => {
            if (pid === productId) onStockUpdate(newStock)
        })

        socket.on("product-out-of-stock", ({ productId: pid }: { productId: string }) => {
            if (pid === productId) onOutOfStock()
        })

        return () => {
            socket.emit("leave-product", productId)
            socket.disconnect()
        }
    }, [productId])
}