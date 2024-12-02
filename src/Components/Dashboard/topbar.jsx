import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "../../context/menucontext";
import { useContext, useEffect, useState } from "react";
import Cookie  from 'cookie-universal';
import axios from "axios";
import { baseUrl, LOGOUT, USER } from "../../Api/Api";
import { DropdownButton } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingSubmit from '../Loading/loading';


export default function TopBar( {bar} ) {
    // States
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("");


    // Navigation
    const nav = useNavigate(); 
    
    // Cookies and token
    const cookie = Cookie();
    const token = cookie.get("e-commerce");

    // Context
    const menuOpen = useContext(Menu);

    // Get User Details
    useEffect(() => {
        axios.get(`${baseUrl}/${USER}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then(data =>[setName(data.data.name), setRole(data.data.role)])        
        .catch(err => console.log(err))

    }, [])

        // Function to handle logout
        async function handleLogOut() {
            setLoading(true)
        try {
            const res = await axios.get(`${baseUrl}/${LOGOUT}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            }, [])
            nav("/e-commerce", {replace : true});
            cookie.remove("e-commerce");
            setLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <>
        {loading && <LoadingSubmit />}
        <div className="top-bar d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-5"> 
            <h5>E-Commerce</h5>
            <FontAwesomeIcon onClick={() => menuOpen.setIsOpen(prev => !prev)} 
            icon={faBars} style={{transform:"translateY(-20%)", fontSize:"1.1rem", cursor:"pointer", display: bar ? "block" : "none"}}/>
            </div>
            <div>

            {token ? <DropdownButton id="dropdown-basic-button" title={name} >   
                    
                        <NavLink to="/e-commerce"  className={"d-flex align-items-center gap-2 m-2"}>
                                Home
                        </NavLink>
                    
                    
            {["1999", "1995", "1996"].includes(role) && <NavLink to="/dashboard"  className={"d-flex align-items-center gap-2 m-2"}>
                        Dashboard  
                    </NavLink>}
                
                    <div onClick={handleLogOut} className="logout m-2">
                        Logout
                    </div>

                </DropdownButton> : <div className="d-flex align-items-center justfiy-content-around gap-2 p-2"> <NavLink to="/login" 
                className={"btn btn-primary"}>Login</NavLink> 
                <NavLink to="/register" 
                className={"btn btn-primary"}>SignUp</NavLink> 
                
                </div>}
            </div>
        </div>
        </>
    )
}