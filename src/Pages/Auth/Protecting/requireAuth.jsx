import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie  from 'cookie-universal';
import { useEffect, useState } from "react";
import { baseUrl, USER } from '../../../Api/Api';
import LoadingSubmit from '../../../Components/Loading/loading';
import axios from "axios";
import Err403 from "../Errors/403";


export default function RequireAuth( {allowedRole} ) {
    // User
    const [user, setUser] = useState("");
    const nav = useNavigate(); 
    const cookie = Cookie();
    const token = cookie.get("e-commerce");
    
    useEffect(() => {
        axios.get(`${baseUrl}/${USER}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then(data => setUser(data.data))        
        .catch(() => nav("/login", {replace : true}))

    }, [])


    return token ? (user === "" ? (<LoadingSubmit />) : allowedRole.includes(user.role) ? (<Outlet />) : (<Err403 role={user.role}/>) ) : (<Navigate to={"/login"}  replace={true}/>);
}