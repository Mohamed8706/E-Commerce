import { CheckCircle } from "lucide-react";
import { motion } from 'framer-motion';
import { useContext, useEffect } from "react";
import { Cart } from "../context/addToCartContext";


export default function AddToCartPopup() {
    const { cart, setCart } = useContext(Cart);

    useEffect(() => {
        if (cart) { 
            const timer = setTimeout(() => setCart(false), 3000); // Hide after 3 sec
            return () => clearTimeout(timer);
        }
    }, [cart]);

    if (!cart) return null; // Hide the popup when cart is false

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-5 right-5 bg-white shadow-lg p-4 z-[1000]
            rounded-2xl flex items-center gap-3 border border-gray-200">
            <CheckCircle className="text-green-500" size={24} />
            <p className="text-sm font-medium">Added to Cart</p>
        </motion.div>
    );
}
