import { useMemo, useCallback, useState, useEffect, useContext } from "react";
import { XCircleIcon } from "lucide-react";
import { Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";


export default function Cart() {
    // States
    const [cartData, setCartData] = useState([]);
    const [show, setShow] = useState(false);
    

    

    useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("Cart")) || [];
    setCartData((prev) => (JSON.stringify(prev) !== JSON.stringify(storedCart) ? storedCart : prev));
    }, [show]);

    
    const totalPrice = useMemo(() => 
        cartData.reduce((total, product) => total + Number(product.price * product.count), 0),
    [cartData]);

    
    const handleDelete = useCallback((id) => {
        setCartData(prevCart => {
            const updatedCart = prevCart.filter(product => product.id !== id);
            localStorage.setItem("Cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, [setCartData]);

    const handleShow = () => setShow(true);
    const handleClose = useCallback(() => setShow(false), [setShow]);

    
    const renderCartItems = useMemo(() => cartData.map((product, index) => (
        <div key={index} className="flex relative w-full justify-between border-b-2 p-3">
            <div className="w-2/3">
                <p className="fw-bold mb-1 text-2xl">{product.title}</p>
                <p className="text-muted mb-0 text-xl">{product.description}</p>
            </div>
            <div className="flex flex-col justify-between items-end">
                <XCircleIcon className="cursor-pointer" onClick={() => handleDelete(product.id)} size={35} color="red" />
                <p className="text-gray-500 fw-bold">$ {product.price * product.count}</p>
                <span className="bg-primary text-xl rounded-full w-8 h-8 flex justify-center items-center font-semibold text-white">
                    {product.count}
                </span>
            </div>
        </div>
    )), [cartData, handleDelete]);

    return (
        <>
  
        <FontAwesomeIcon  onClick={handleShow} className="cursor-pointer"
        icon={faCartShopping} color="#06c44fcc" fontSize={35}/>
        

                
        <Offcanvas show={show} onHide={handleClose} placement="end" className="items-center md:!w-[550px] f-cairo cart-cart">
            <Offcanvas.Header closeButton className="text-2xl p-4">
                <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="w-full">
                <div className="flex justify-between m-1">
                    <h1 className="font-semibold">Your Cart</h1>
                    <span className="bg-primary w-12 h-12 text-2xl text-white flex items-center justify-center font-bold rounded-3xl">
                        {cartData.length}
                    </span>
                </div>
                <div className="border rounded-lg text-2xl">
                    {cartData.length > 0 ? renderCartItems : <p className="p-3">No items in the cart.</p>}
                    <div className="d-flex justify-content-between border-b-2 p-3">
                        <p>Total (USD)</p>
                        <p className="font-bold text-gray-600">${totalPrice}</p>
                    </div>
                </div>
                <div className="w-full text-center px-2 py-3">
                    <button className="w-full p-3 bg-primary rounded-lg text-3xl transition duration-200 border border-primary hover:!bg-white hover:!text-black text-white">
                        Continue To Checkout
                    </button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
        </>
    );
}
