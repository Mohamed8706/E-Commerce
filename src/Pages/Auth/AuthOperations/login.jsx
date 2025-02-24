import {  useEffect, useRef, useState } from "react";
import { LOGIN, baseUrl } from "../../../Api/Api";
import axios from "axios";
import LoadingSubmit from "../../../Components/Loading/loading";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import myIcon from "../../../Assets/Login-amico.svg";
import { Form } from "react-bootstrap";
import { Google } from "../../../Components/Website/Utils/Google";


    export default function LogIn() {


    // States
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    // Loading
    const [loading, setLoading] = useState(false);

    // Err
    const [err, setErr] = useState("");

    // Navigation
    const nav = useNavigate();

    // Cookie
    const cookie = Cookie();

    // Ref
    const foc = useRef(null);

    useEffect(() => {
        foc.current.focus();
    }, [])

    // handle form change
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // handle form submit
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
        const res = await axios.post(`${baseUrl}/${LOGIN}`, form);
        setLoading(false);
        setErr("");
        const token = res.data.token;
        const role = res.data.user.role;
        const go = role === '1995' ? "/dashboard/users/" : (role === '1996' ? "/dashboard/writer/" : "/");
        cookie.set("e-commerce", token); 

        nav(`${go}`, { replace: true });

    
        
        } catch (err) {
        setLoading(false);
        if (err.response.status === 401) {
            setErr("Wrong email or password");
        } else {
            setErr("Internal Server Error");
        }
        }
    }

    return (
        <>
        {loading && <LoadingSubmit />}
        <div className="container">
            <div className="row ">
            <Form className="form" onSubmit={handleSubmit}>
                <div className="custom-form">
                    <Google />
                <span className="divider">or</span>

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
                    ref={foc}
                    />
                    <Form.Label>Email</Form.Label>
                </Form.Group>


                <Form.Group
                    className="form-custom"
                    controlId="formBasicPassword"
                >
                    <span className="pass-icon"></span>
                    <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    minLength={6}
                    required
                    />
                    <Form.Label>Password</Form.Label>
                </Form.Group>

                <button className="bn54">
                <span className="bn54span">Login</span>
                </button>
                {err !== "" && (
                    <>
                    <p className="foot-note">
                        <Link to="/register">Don't have an email?</Link>
                    </p>
                    <span className="err">{err}</span>
                    </>
                )}
                {err === "" && (
                    <div className="icon-span">
                    <p className="foot-note">
                        <Link to="/register">Don't have an email?</Link>
                    </p>
                    <img src={myIcon} alt="Ecommerce Illustration" className="my-icon" />
                    </div>
                )}
                </div>
            </Form>
            </div>
        </div>
        </>
    );
    }
