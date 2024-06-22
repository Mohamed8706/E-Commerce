import axios from "axios"
import { useEffect } from "react"
import Cookie from 'cookie-universal';
import { useState } from "react";
import { baseUrl, USERS } from "../../Api/Api";
import LogOut from "../../Pages/Auth/logout";

export default function Users() {
    // States 
    const [users, setUsers] = useState([]);

    // Cookies 
    const cookie = Cookie();

    useEffect(() => {
        axios.get(`${baseUrl}/${USERS}`, {
            headers: {
                Authorization: "Bearer " + cookie.get('e-commerce'),
            }
        })
        .then(data => setUsers(data.data)).catch(err => console.log(err))
    }, [])

    const showUsers = users.map((user) => {
        return <div style={{textAlign: 'center', border: '4px solid orangered'}}>
            <h2>{user.id}</h2>
            <h3>{user.name}</h3>
        </div>

    })
    return (
        <div className="container">
            {showUsers}
            <LogOut />
        </div>
    )
}