import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AXIOS } from "../../Api/axios";
import { USER } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import LoadingSubmit from './../../Components/Loading/loading';


export default function UserUpdate() {
    const [form, setForm] = useState({
        name: "",
        email: ""
    })
    
    const id = Number(window.location.pathname.replace("/dashboard/users/", ""));
    const nav = useNavigate("");

    const [disable, setDisable] = useState(true);

    const [loading, setLoading] = useState(false);
    
    function handleChange(e) {

        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        AXIOS.get(`${USER}/${id}`)
        .then((data) => setForm({ ...form, name : data.data.name, email : data.data.email})).then(() => setDisable(false))
    }, [])

    async function handleUpdate(e) {
        setLoading(true)
        e.preventDefault();
        try {
        const res = await AXIOS.post(`${USER}/edit/${id}`, form);
        nav("/dashboard/users")
        setLoading(false)
        
        } catch (err){
            console.log(err)
        }      
    }

    return( 
        <>
        {loading && <LoadingSubmit />}
        <div className="row " style={{margin:"25px", height:"70vh"}}>
        <Form className="form" style={{height:"100%"}} onSubmit={handleUpdate}>
        <Form.Group
            className="form-custom"
            controlId="formBasicName"
        >
            <span className="user-icon"></span>
            <Form.Control
                type="text"
                placeholder="Enter your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
            />
            <Form.Label>Name</Form.Label>
        </Form.Group>

        <Form.Group
            className="form-custom"
            controlId="formBasicEmail"
        >
            <span className="email-icon"></span>
            <Form.Control
                type="email"
                placeholder="Enter your e-mail"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
            />
            <Form.Label>Email</Form.Label>
        </Form.Group>
        
        <button disabled={disable} className="bn54">
            <span className="bn54span">Update</span>
        </button>

        </Form>
        </div>
        </>
    )
    
}