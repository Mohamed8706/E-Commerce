import { createContext, useMemo, useState } from "react";


export const Cart = createContext("");

export default function CartContext({ children }) {
    const [cart, setCart] = useState("");
    // Memoize the context value to prevent unnecessary re-renders
    const value = useMemo(() => ({ cart, setCart }), [cart]);
    return <Cart.Provider value={value}>{children}</Cart.Provider>;
}