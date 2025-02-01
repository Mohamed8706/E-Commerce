const AddToCart = (product) => {
        const storedItems = JSON.parse(localStorage.getItem('Cart')) || [];
        console.log(storedItems)
        const productExists = storedItems.some(item => item.id === product.id);
        if (!productExists) {
            storedItems.push(product)
            localStorage.setItem('Cart', JSON.stringify(storedItems));
            alert('Product added to the cart!');
        } else {
            alert('Product already in the cart!');
        }
}
export default AddToCart;