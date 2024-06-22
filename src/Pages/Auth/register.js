import { useState } from "react";
import { REGISTER, baseUrl } from "../../Api/Api";
import axios from "axios";
import LoadingSubmit from './../../Components/Loading/loading';
import { useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal';

export default function Register() {
    // States
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });


    // Loading
    const [loading, setLoading] = useState(false);


    // Err
    const [err, setErr] = useState("");


    // Navigate
    const nav = useNavigate();


    // Cookie
    const cookie = Cookie();
    // handle form change
    function handleChange(e) {

        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // handle form submit
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post(`${baseUrl}/${REGISTER}`, form);
            setLoading(false);
            setErr("")
            const token = res.data.token
            cookie.set('e-commerce', token)
            nav("/users")
        }
        catch (err) {
            setLoading(false)
            if (err.response.status === 422) {
                setErr("The email has already been taken")
            }
            else {
                setErr("Internal Server Error");
            }
        }
    }


    return (
        <>
            {loading && <LoadingSubmit />}
            <div className="container">
                <div className="row h-100vh">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="custom-form">
                            <h1>Register Now</h1>
                            <div className="form-control">
                                <span className="user-icon"></span>
                                <input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    type="text"
                                    placeholder="Enter Your Name..."
                                    onChange={handleChange}
                                    required
                                ></input>
                                <label htmlFor="name">Name</label>
                            </div>

                            <div className="form-control">
                                <span className="email-icon"></span>
                                <input
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    type="email"
                                    placeholder="Enter Your Email..."
                                    onChange={handleChange}
                                    required
                                ></input>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="form-control">
                                <span className="pass-icon"></span>
                                <input
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    type="password"
                                    placeholder="Enter Your Password..."
                                    minLength="6"
                                    onChange={handleChange}
                                    required
                                ></input>
                                <label htmlFor="password">Password</label>
                            </div>

                            <button class="bn54">
                                <span class="bn54span">Sign Up</span>
                            </button>
                            {err !== "" && <span className="err">{err}</span>}
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    );
}
