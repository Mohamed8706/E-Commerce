const AddToCart = (product, qty) => {
        const storedItems = JSON.parse(localStorage.getItem('Cart')) || [];
        const productExists = storedItems.some(item => item.id === product.id);
        product.count = qty;
        if (!productExists) {
            storedItems.push(product)
            localStorage.setItem('Cart', JSON.stringify(storedItems));
            alert('Product added to the cart!');
        } else {
            alert('Product already in the cart!');
        }
}
export default AddToCart;