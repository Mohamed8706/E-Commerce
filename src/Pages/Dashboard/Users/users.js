import { useContext, useEffect } from "react"
import { useState } from "react";
import { baseUrl, USER, USERS } from "../../../Api/Api";

import { Menu } from "../../../context/menucontext";
import { WindowSize } from "../../../context/windowresize";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from 'cookie-universal';
import TableShow from "../../../Components/Dashboard/Table";
import useSWR from "swr";


export default function Users() {
    // States 
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const menuOpen = useContext(Menu);
    const isOpen = menuOpen.isOpen;
    const resizeWidth = useContext(WindowSize);



    // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce")


    // Get Current User
    useEffect(() => {
        axios.get(`${baseUrl}/${USER}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then(res => setCurrentUser(res.data))
    }, [])

    // Get All Users
    const fetchUsers = (Users) => {
        axios.get(`${baseUrl}/${Users}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then(data => setUsers(data.data))
            .catch(err => console.log(err))
    }

    const { mutate } = useSWR(`${USERS}`, fetchUsers);

    // Passing Headers 
    const header = [
        {
            value: 'name',
            name: 'Username'
        }, {
            value: 'email',
            name: 'Email'
        },
        {
            value: 'role',
            name: 'Role'
        }
    ]



    return (
        <div className="bg-white p-2" style={{
            overflowX: "auto",
            width:
                resizeWidth.windowResizeWidth < "768"
                    ? isOpen
                        ? "80%"
                        : "100%"
                    : "100%",
            marginLeft:
                resizeWidth.windowResizeWidth < "768"
                    ? isOpen
                        ? "10%"
                        : "0"
                    : "",


        }}>
            <div className="d-flex align-items-center justify-content-between">
                <h1>Users Page</h1>
                <Link className="btn btn-primary" to="/dashboard/user/add" style={{ color: "black" }}>Add User</Link>
            </div>
            <TableShow header={header}
                data={users}
                mutate={mutate}
                delete={USER}
                currentUser={currentUser} />
        </div>
    )
}