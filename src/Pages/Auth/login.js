import { useState } from "react";
import { LOGIN, baseUrl } from "../../Api/Api";
import axios from "axios";
import LoadingSubmit from './../../Components/Loading/loading';
import { Link, useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal';
import {ReactComponent as MyICon} from "../../Assets/Login-amico.svg";
import { lineSpinner } from 'ldrs'
lineSpinner.register()

export default function LogIn() {
    // States
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    // Loading
    const [loading, setLoading] = useState(false);


    // Err
    const [err, setErr] = useState("");


    // Navigation
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
        setLoading(true);
        try {
        const res =  await axios.post(`${baseUrl}/${LOGIN}`, form);
            setLoading(false);
            setErr("");
            const token = res.data.token;
            cookie.set('e-commerce', token)
            nav("/users")
        }
        catch (err) {
            setLoading(false);
            if (err.response.status === 401) {
                setErr("Wrong email or password");
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
            <div className="row h-100">
            <form className="form" onSubmit={handleSubmit}>
                <div className="custom-form">
                    <h1>Login</h1>
                <div className="form-control">
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
                    <input
                        id="password"
                        name="password"
                        value={form.password}
                        type="password"
                        placeholder="Enter Your Password..."
                        onChange={handleChange}
                        minLength={6}
                        required
                    ></input>
                    <label htmlFor="password">Password</label>

                </div>


                            <button class="bn54">
                                <span class="bn54span">Login</span>
                            </button>
                {err !== "" &&<>
                                <p className="foot-note"><Link to="/register">Don't have an email?</Link></p>
                <span className="err">{err}</span>
                </> 
                }
                {err === "" && <div className="icon-span">
                <p className="foot-note"><Link to="/register">Don't have an email?</Link></p>
                <MyICon className="my-icon" /></div>}

                </div>
            </form>
            </div>
        </div>
        </>
    );
}
