const AddToCart = (product, qty) => {
        const storedItems = JSON.parse(localStorage.getItem('Cart')) || [];
        const existingProduct = storedItems.find(item => item.id === product.id);
        if (existingProduct) {
            // Update the count if the product already exists in the cart
            existingProduct.count = qty;
            localStorage.setItem('Cart', JSON.stringify(storedItems));
            alert('Product count updated in the cart!');
        
        } else {
            product.count = qty;
            storedItems.push(product)
            localStorage.setItem('Cart', JSON.stringify(storedItems));
            alert('Product added to the cart!');

        }
}
export default AddToCart;