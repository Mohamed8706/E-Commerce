import { useContext, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { baseUrl, Product } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSubmit from '../../../Components/Loading/loading';
import  Cookie  from 'cookie-universal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../../../context/menucontext";



export default function ProductUpdate() {
// States
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

const [images, setImages] = useState([]);


const [disable, setDisable] = useState(true);
const [loading, setLoading] = useState(false);


const progress = useRef([]);
const imagesId = useRef([]);

const openImage = useRef(null);

function uploadImage () {
    openImage.current.click();
}

const { id }  = useParams();
const nav = useNavigate("");




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
        .then((data) => {setForm({...form, title: data.data[0].title, 
            description: data.data[0].description,
            price: data.data[0].price,
            discount: data.data[0].discount,
            About: data.data[0].About,
            category: data.data[0].category
        
        })
    })
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


let j = useRef(-1)
// Handle images changes
async function HandleImagesChanges(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFiles = e.target.files;

    for (let i = 0; i < imagesAsFiles.length; i++) {
        j.current++;
        const data = new FormData();
        data.append("image", imagesAsFiles[i]);
        data.append("product_id", id);
        try {
            const res = await axios.post(`${baseUrl}/product-img/add`, data, {
                headers:{
                    Authorization: "Bearer " + token
                },
                onUploadProgress: (ProgressEvent) => {
                    const {loaded, total} = ProgressEvent;
                    const result = Math.floor((loaded * 100) / total);
                    if (result % 10 === 0) {
                        progress.current[j.current].style.width = `${result}%`;
                        progress.current[j.current].setAttribute('percent', result + '%');
                    }
                } 
            }).then((data) => imagesId.current[j.current] = data.data.id)
        } catch (error) {
            console.log("Could not send the image", error)
        }
        
    }
}

    // Handle deleting image 
async function HandleDeletingImages(id, name) {
    setImages((prev) => prev.filter((img) => img.name !== name));
    imagesId.current = imagesId.current.filter((i) => i !== id);
    j.current--;
    try {
        const res = await axios.delete(`${baseUrl}/product-img/${id}`, {
            headers:{
                Authorization: "Bearer " + token
            }
        })
    } catch (error) {
        console.log("Could not delete image",error)
    }
}

// Maping 
const imagesShow = images.map((img, key) => 
    <div key={key} className="w-100 relative border p-2">
    <div className="flex flex-row gap-2 ">
    <img src={URL.createObjectURL(img)} alt="product" className="w-[80px]"/>
    <div>
        <p className="mb-1">{img.name}</p>
        <p>{(img.size / 1024 < 900 ? (img.size / 1024).toFixed(2) + "KB" : 
        (img.size / (1024 * 1024)).toFixed(2) + 'MB' )}</p>
    </div>
    </div>
    <div  className="custom-progress">
            <span ref={(e) => [progress.current[key] = e]} className="inner-progress"></span>
    </div>
            <FontAwesomeIcon icon={faTrash} style={{color: "orangered"}} 
            className="w-[30px] h-[30px] cursor-pointer mr-[8px] absolute right-4 top-4"
            onClick={() => HandleDeletingImages(imagesId.current[key], img.name)}
            /> 
        
    </div>
    )


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



        <Form.Group
            className="form-custom relative"
            controlId="image"
        >
            
            <Form.Control
                ref={openImage}
                hidden
                type="file"
                name="image"
                multiple
                onChange={HandleImagesChanges}
                
            />
        
        </Form.Group>
        <div onClick={uploadImage} 
        className="flex items-center justify-center py-3 w-100 flex-col rounded 
            gap-2 "
        style={{border:"2px dashed #0086fe", cursor:"pointer"}}
        >
        <img  src={require("../../../Assets/upload.png")} alt="upload" className="w-[100px]"/>
        <p style={{color: "#0086fe"}} className="font-bold">Upload Images</p>
        </div>
    <div className="flex flex-col p-4 items-start justify-center gap-4">
            {imagesShow} 
    </div>


    
        
        <button className="bn54">
            <span className="bn54span">Update</span>
        </button>

        </Form>
        </div>
        </>
    )

    
}