import { useContext } from "react";
import { Cart } from "../context/addToCartContext";

const useAddToCart = () => {
    const { setCart } = useContext(Cart);

    return (data, qty) => { 
        if (!data) {
            console.error("No product data provided to addToCart");
            return;
        }
        
        let storedItems = JSON.parse(localStorage.getItem("Cart")) || [];
        const existingProduct = storedItems.find(item => item.id === data.id);

        if (existingProduct) {
            existingProduct.count = qty;
        } else {
            data.count = qty;
            storedItems.push(data);
        }

        localStorage.setItem("Cart", JSON.stringify(storedItems));

        setCart(true); 
    };
};

export default useAddToCart;
