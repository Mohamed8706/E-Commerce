import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { baseUrl, Product } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSubmit from '../../../Components/Loading/loading';
import  Cookie  from 'cookie-universal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../../../context/menucontext";



export default function ProductUpdate() {
const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    discount: '',
    About: '',
    category: ''
});

const menuOpen = useContext(Menu);
const isOpen = menuOpen.isOpen;
const [image, setImage] = useState("");


    const { id }  = useParams();
    const nav = useNavigate("");

    const [disable, setDisable] = useState(true);

    const [loading, setLoading] = useState(false);


        // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce")


    
    // Get user details to fill up inputs
    useEffect(() => {
        setLoading(true)
        axios.get(`${baseUrl}/${Product}/${id}`, {
            headers:{
            Authorization: "Bearer " + token,
            }
        })
        .then((data) => setForm({...form, title: data.data[0].title, 
            description: data.data[0].description,
            price: data.data[0].price,
            discount: data.data[0].discount,
            About: data.data[0].About,
            category: data.data[0].category
        
        }))
        .then(() => setLoading(false))
        .then(() => setDisable(false))
        .catch((err) => console.log(err))
    }, [])

    function handleChange (e) {
        setForm({...form, [e.target.name] : e.target.value})
    }



    async function handleUpdate(e) {
        setLoading(true)
        e.preventDefault();
        try {
        const res = await axios.post(`${baseUrl}/${Product}/edit/${id}`, form, {
        headers: {
            Authorization: "Bearer " + token,
            },
        });
        nav("/dashboard/products")
        setLoading(false)
        
        } catch (err){
            console.log(err);
        }      
    }

            


    return( 
        <>
        {loading && <LoadingSubmit />}
        <div className="row p-2 " style={{margin:"12px"}}  >
        <Form className="border bg-white rounded-xl ml-1 p-4 shadow-2xl h-100"  
        onSubmit={handleUpdate}>
        <Form.Group
            className="form-custom"
            controlId="formBasicName"
        >
            <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-100"
            />
            <Form.Label>Title</Form.Label>

        </Form.Group>

        <Form.Group
            className="form-custom"
            controlId="formBasicDescription"
            
        >
            <Form.Control
                type="text"
                placeholder="Description..."
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-100"
            />
            <Form.Label>Description</Form.Label>

        </Form.Group>



        <Form.Group
            className="form-custom"
            controlId="formBasicPrice"
            
        >
            <Form.Control
                type="text"
                placeholder="Price..."
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="w-100"
            />
            <Form.Label>Price</Form.Label>

        </Form.Group>


        <Form.Group
            className="form-custom"
            controlId="formBasicDiscount"
            
        >
            <Form.Control
                type="text"
                placeholder="Discount..."
                name="Discount"
                value={form.discount}
                onChange={handleChange}
                required
                className="w-100"
            />
            <Form.Label>Dicsount</Form.Label>

        </Form.Group>


        <Form.Group
            className="form-custom"
            controlId="formBasicAbout"
            
        >
            <Form.Control
                type="text"
                placeholder="About..."
                name="About"
                value={form.About}
                onChange={handleChange}
                required
                className="w-100"
            />
            <Form.Label>About</Form.Label>

        </Form.Group>

                <Form.Group
            className="form-custom"
            controlId="formBasicCategory"
            
        >
        <Form.Control
                type="text"
                placeholder="Category..."
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-100"
            />
            <Form.Label>Category</Form.Label>

        </Form.Group>



        {/* <Form.Group
            className="form-custom relative"
            controlId="image"
            
        >
            
        <FontAwesomeIcon icon={faImage} color="#06c44fcc" 
        className="absolute w-[30px] h-[30px] top-[50%] left-[93%] sm:left-[94%] md:left-[71%]
        lg:left-[75%] transform translate-y-[-50%] translate-x-[-50%]" /> 
            <Form.Control
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files.item(0))}
                required
            />
            <Form.Label>Image</Form.Label>
        </Form.Group> */}



    
        
        <button className="bn54">
            <span className="bn54span">Update</span>
        </button>

        </Form>
        </div>
        </>
    )

    
}
