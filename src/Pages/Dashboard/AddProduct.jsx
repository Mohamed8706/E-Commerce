import { useEffect, useRef, useState } from "react";
import { ADD, CAT, Cat, baseUrl } from "../../Api/Api";
import axios from "axios";
import LoadingSubmit from './../../Components/Loading/loading';
import { useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal';
import { Form } from "react-bootstrap";
import useSWR from "swr";


export default function AddProduct() {
// States
const  [form, setForm] = useState({
    category: 'Select Category',
    title: '',
    description: '',
    rating: '',
    price: '',
    discount: '',
    About: ''

})

const [images, setImages] = useState('');

const [cat, setCat] = useState([]);

console.log(form)

// Loading
const [loading, setLoading] = useState(false);


// Err
const [err, setErr] = useState("");

// Ref
const focus = useRef("");

// Handle focus 
useEffect(() => {
    focus.current.focus();
}, [])

// Navigate
const nav = useNavigate();


// Cookie
const cookie = Cookie();
const token = cookie.get("e-commerce");

    // Get All Categories
    const getCategories = (Categories) => {
            axios.get(`${baseUrl}/${Categories}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then(data => setCat(data.data))
        .catch(err => console.log(err))
    }

    const { mutate } = useSWR(`${CAT}`, getCategories)    

// handle form change
function handleChange(e) {
    setForm({...form, [e.target.name] : e.target.value})
}



// handle form submit
async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    try {
        const res = await axios.post(`${baseUrl}/${Cat}/${ADD}`, form, {
        headers: {
            Authorization: "Bearer " + token,
        },
        });
        setLoading(false);
        setErr("")
        
        nav("/dashboard/products/", { replace: true });

    }
    catch (err) {
        setLoading(false)
        if (err.response.status === 422) {
            setErr("The product already exists")
        }
        else {
            setErr("Internal Server Error");
        }
    }
}



return (
    <>
        {loading && <LoadingSubmit />}
            <div className="row bg-gray-100" style={{margin:"2px", height:"100vh"}}>
                <Form onSubmit={handleSubmit} className="h-[95%] ">
                    <div className="h-100 bg-white p-5 rounded-xl shadow-2xl">



                        <Form.Group className="form-custom "controlId="formCategory">
                            <Form.Select
                                className="w-100"
                                name="category"
                                value={form.category}
                                onChange={(e) => handleChange(e)}
                                ref={focus}
                                
                            >
                                <option disabled>Select Category</option>
                                {cat.map((cat, ind) => (
                                    <option key={ind} value={cat.id}>{cat.title}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        

                        <Form.Group
                            className="form-custom "
                            controlId="formBasicName"
                        >
                            
                            <Form.Control
                                className="w-100"
                                type="text"
                                placeholder="Title..."
                                name="title"
                                value={form.title}
                                onChange={(e) => handleChange(e)}
                                required
                            
                            />
                            <Form.Label>Title</Form.Label>
                        </Form.Group>

                        <Form.Group
                            className="form-custom"
                            controlId="formdescription"
                        >
                            
                            <Form.Control
                                className="w-100"
                                type="text"
                                placeholder="Description..."
                                name="description"
                                value={form.description}
                                onChange={(e) => handleChange(e)}
                                required
                                
                            />
                            <Form.Label>Description</Form.Label>
                        </Form.Group>


                        <Form.Group
                            className="form-custom"
                            controlId="formdrating"
                        >
                            
                            <Form.Control
                                className="w-100"
                                type="text"
                                placeholder="Rating..."
                                name="rating"
                                value={form.rating}
                                onChange={(e) => handleChange(e)}
                                required
                                
                            />
                            <Form.Label>Rating</Form.Label>
                        </Form.Group>


                        <Form.Group
                            className="form-custom"
                            controlId="formdabout"
                        >
                            
                            <Form.Control
                                className="w-100"
                                type="text"
                                placeholder="Discount..."
                                name="discount"
                                value={form.discount}
                                onChange={(e) => handleChange(e)}
                                required
                                
                            />
                            <Form.Label>Discount</Form.Label>
                        </Form.Group>

                        <Form.Group
                            className="form-custom"
                            controlId="formdabout"
                        >
                            
                            <Form.Control
                                className="w-100"
                                type="text"
                                placeholder="About..."
                                name="About"
                                value={form.About}
                                onChange={(e) => handleChange(e)}
                                required
                                
                            />
                            <Form.Label>About</Form.Label>
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
                                required
                                onChange={(e) =>  setImages(e.target.files.item(0))}
                            />
                            <Form.Label>Image</Form.Label>
                        </Form.Group> */}




                        <button disabled={form.title.length > 1 ? false : true} className="bn54">
                            <span className="bn54span">Add Porduct</span>
                        </button>
                        {err !== "" && (<span className="err">{err}</span>)}

                    </div>
                </Form>
            </div>
    </>
);
}
