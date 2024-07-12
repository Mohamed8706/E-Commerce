import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Website/homePage";
import LogIn from "./Pages/Auth/login";
import Register from "./Pages/Auth/register";
import GoogleCallBack from './Pages/Auth/GoogleCallBack';
import Dashboard from './Pages/Dashboard/Dashboard';
import Users from './Pages/Dashboard/users';
import RequireAuth from "./Pages/Auth/requireAuth";
import UserUpdate from "./Pages/Dashboard/userUpdate";



export default function App() {
    return (
        <div className="app">
            {/* Public Routes */}
            <Routes>
                <Route path="/login" element={<LogIn />}></Route>
                <Route path="/E-Commerce" element={<HomePage />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/auth/google/callback" element={<GoogleCallBack />}></Route>
                {/* Protected Routes */}
                <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="users" element={<Users />} />
                        <Route path="users/:id" element={<UserUpdate />} />
                </Route>
                </Route>
            </Routes>
        </div>
    );
}
