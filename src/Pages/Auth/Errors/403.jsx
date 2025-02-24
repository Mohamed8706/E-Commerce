import { NavLink } from "react-router-dom"
import "./403.css"

export default function Err403( {role} ) {
    return (
        <div className="text-wrapper">
            <div className="title">
                403 - ACCESS DENIED
            </div>
            <div className="subtitle">
                Oops, You don't have permission to access this page.
            </div>
            <NavLink to={role === "1996" ? "/dashboard/writer/" : "/"} className="btn btn-primary">
            {
                role === "1996" ? "Go To Writer's Page" : "Go To Home Page"
            }
            
            </NavLink>
        </div>
    )
}