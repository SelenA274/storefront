"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store"
import { clearCart } from "@/features/cart/cartSlice";
import api from "@/lib/axios";
import { cartService } from "../../../features/cart/cartService"
import { toast } from "react-toastify";

interface PaymentForm {
    cardHolder: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
}

interface FormErrors {
    cardHolder?: string;
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
}

export default function PaymentPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.cart.items);

    const [form, setForm] = useState<PaymentForm>({
        cardHolder: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [processing, setProcessing] = useState(false);

    const validate = (): boolean => {
        const e: FormErrors = {};
        if (!form.cardHolder.trim()) e.cardHolder = "Card holder name is required";
        if (!/^\d{13,19}$/.test(form.cardNumber.replace(/\s/g, "")))
            e.cardNumber = "Enter a valid card number (13–19 digits)";
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) {
            e.expiry = "Expiry must be MM/YY";
        } else {
            const [month, year] = form.expiry.split("/");
            const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
            const today = new Date();
            today.setDate(1);
            today.setHours(0, 0, 0, 0);
            if (expiry < today) e.expiry = "Card has expired";
        }
        if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = "CVV must be 3 or 4 digits";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "cardNumber") {
            const digits = value.replace(/\D/g, "").slice(0, 19);
            const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
            setForm((p) => ({ ...p, cardNumber: formatted }));
            return;
        }
        if (name === "expiry") {
            const digits = value.replace(/\D/g, "").slice(0, 4);
            const formatted =
                digits.length > 2 ? digits.slice(0, 2) + "/" + digits.slice(2) : digits;
            setForm((p) => ({ ...p, expiry: formatted }));
            return;
        }
        if (name === "cvv") {
            setForm((p) => ({ ...p, cvv: value.replace(/\D/g, "").slice(0, 4) }));
            return;
        }

        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setProcessing(true);

        // Mock payment delay
        await new Promise((res) => setTimeout(res, 2500));

        const shipping = JSON.parse(
            sessionStorage.getItem("shippingDetails") || "{}"
        );

        if (!shipping.fullName) {
            toast.error("Shipping details missing. Please go back.");
            setProcessing(false);
            return;
        }

        try {
            await api.post("/order", {
                items: items
                    .filter((i: any) => i.product)
                    .map((i: any) => ({
                        product: i.product._id,
                        quantity: i.quantity,
                    })),
                shippingAddress: shipping,
                paymentMethod: "simulated",
                paymentResult: "success",
            });

            await cartService.clearCart();
            dispatch(clearCart());
            sessionStorage.removeItem("shippingDetails");
            router.push("/orders");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Something went wrong");
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Blush header — matches checkout/cart pages */}
            <div className="bg-[#fde8ed] py-10 text-center">
                <h1 className="font-serif text-3xl text-gray-800 tracking-wide">
                    Payment
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Step 2 of 2 — Secure checkout
                </p>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* LEFT — Payment form */}
                <div>
                    <h2 className="font-serif text-xl text-gray-800 mb-6">
                        Card Details
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Card Holder */}
                        <div>
                            <input
                                name="cardHolder"
                                placeholder="Card Holder Name"
                                value={form.cardHolder}
                                onChange={handleChange}
                                className="border border-gray-200 p-3 rounded-xl w-full focus:outline-none focus:border-[#c97a8f] transition"
                            />
                            {errors.cardHolder && (
                                <p className="text-red-400 text-xs mt-1">{errors.cardHolder}</p>
                            )}
                        </div>

                        {/* Card Number */}
                        <div>
                            <input
                                name="cardNumber"
                                placeholder="Card Number"
                                value={form.cardNumber}
                                onChange={handleChange}
                                maxLength={23}
                                className="border border-gray-200 p-3 rounded-xl w-full focus:outline-none focus:border-[#c97a8f] transition tracking-widest"
                            />
                            {errors.cardNumber && (
                                <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>
                            )}
                        </div>

                        {/* Expiry + CVV */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <input
                                    name="expiry"
                                    placeholder="MM/YY"
                                    value={form.expiry}
                                    onChange={handleChange}
                                    maxLength={5}
                                    className="border border-gray-200 p-3 rounded-xl w-full focus:outline-none focus:border-[#c97a8f] transition"
                                />
                                {errors.expiry && (
                                    <p className="text-red-400 text-xs mt-1">{errors.expiry}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    name="cvv"
                                    placeholder="CVV"
                                    value={form.cvv}
                                    onChange={handleChange}
                                    maxLength={4}
                                    type="password"
                                    className="border border-gray-200 p-3 rounded-xl w-full focus:outline-none focus:border-[#c97a8f] transition"
                                />
                                {errors.cvv && (
                                    <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-gray-900 text-white py-4 rounded-full hover:bg-[#c97a8f] transition text-sm uppercase tracking-widest mt-4 disabled:opacity-50"
                        >
                            {processing ? "Processing Payment..." : "Pay Now"}
                        </button>

                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="text-sm text-gray-400 hover:text-gray-600 transition text-center"
                        >
                            ← Back to Shipping
                        </button>
                    </form>
                </div>

                {/* RIGHT — Order summary */}
                <div>
                    <h2 className="font-serif text-xl text-gray-800 mb-6">
                        Order Summary
                    </h2>
                    <div className="flex flex-col gap-4">
                        {items.map((item: any) => (
                            <div
                                key={item.product?._id}
                                className="flex justify-between text-sm text-gray-700"
                            >
                                <div>
                                    <p className="font-medium">{item.product?.name}</p>
                                    <p className="text-gray-400">Qty: {item.quantity}</p>
                                </div>
                                <p>${(item.product?.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <div className="border-t pt-4 flex justify-between text-sm font-medium">
                            <span>Total</span>
                            <span className="text-[#c9a96e]">
                                $
                                {items
                                    .reduce(
                                        (sum: number, i: any) =>
                                            sum + i.product?.price * i.quantity,
                                        0
                                    )
                                    .toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}