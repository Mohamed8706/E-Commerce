import { useContext, useEffect } from "react"
import { useState } from "react";
import {baseUrl, USER, USERS } from "../../Api/Api";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../../context/menucontext";
import { WindowSize } from "../../context/windowresize";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie  from 'cookie-universal';

export default function Users() {
    // States 
    const [users, setUsers] = useState([]);
    const menuOpen = useContext(Menu);
    const isOpen = menuOpen.isOpen;
    const resizeWidth = useContext(WindowSize);
    const [deleteUser, setDelete] = useState(false);


    const cookie = Cookie();
    const token = cookie.get("e-commerce")

    useEffect(() => {
            axios.get(`${baseUrl}/${USERS}`, {
                headers:{
                    Authorization: "Bearer " + token,
                }
            })
        .then(data => setUsers(data.data)).catch(err => console.log(err))
    }, [deleteUser])


    async function handleDelete(id){
        try {
            axios.delete(`${baseUrl}/${USER}/${id}`, {
                headers:{
                    Authorization: "Bearer " + token,
                }
            });
            setDelete(prev => !prev);

        } catch(err) {
            console.log(err)
        }


    }

    const showUsers = users.map((user, ind) => {
        return (<tr key={ind}>
            <td>{ind + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td style={{textAlign: "center"}}>
                
                <FontAwesomeIcon
                icon={faTrash} style={{ marginRight: "8px", color: "orangered", cursor: "pointer"}} onClick={() =>
                handleDelete(user.id)}/>
                
                <Link to={`${user.id}`}>
                <FontAwesomeIcon icon={faEdit} style={{ color: "#038edc", cursor: "pointer" }}/>
                </Link>
            </td>
            </tr>) 


    })
    return (
        <div className="bg-white p-2" style={{ overflowX: "auto", 
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
            <h1>Users Page</h1>
            <Table striped bordered hover style={{}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>E-Mail</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {showUsers}
                </tbody>
            </Table>
        </div>
    )
}