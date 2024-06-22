import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Website/homePage";
import LogIn from "./Pages/Auth/login";
import Register from "./Pages/Auth/register";
import Users from "./Components/Dashboard/users";

export default function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/login" element={<LogIn />}></Route>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/users" element={<Users />}></Route>
            </Routes>
        </div>
    );
}
