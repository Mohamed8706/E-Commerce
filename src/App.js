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
import AddUser from "./Pages/Dashboard/AddUser";

import Writer from "./Pages/Dashboard/writer";
import Err404 from "./Pages/Auth/404";
import RequireBack from "./Pages/Auth/requireBack";
import Categories from "./Pages/Dashboard/Categories";
import AddCategory from "./Pages/Dashboard/AddCategory";
import CategoryUpdate from "./Pages/Dashboard/CategoryUpdate";
import Test from "./Pages/Website/test";




export default function App() {
    return (
        <div className="app">
            {/* Public Routes */}
            <Routes>
                <Route element={<RequireBack />}>
                <Route path="/login" element={<LogIn />}></Route>
                <Route path="/register" element={<Register />}></Route>
                </Route>
                <Route path="/E-Commerce" element={<HomePage />}></Route>
                <Route path="/auth/google/callback" element={<GoogleCallBack />}></Route>
                <Route path="/*" element={<Err404 />}></Route>
                <Route path="/test" element={<Test />}></Route>
                {/* Protected Routes */}
                <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]}/>}>
                <Route path="/dashboard/" element={<Dashboard />}>
                        <Route element={<RequireAuth allowedRole={["1995"]} />}>
                        <Route path="users" element={<Users />} />
                        <Route path="users/:id" element={<UserUpdate />} />
                            <Route path="user/add" element={<AddUser />} />
                        </Route>
                    <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
                        <Route path="writer" element={<Writer />} />
                    </Route>
                    <Route element={<RequireAuth allowedRole={["1999","1995"]} />}>
                        <Route path="categories" element={<Categories />} />
                            <Route path="category/add" element={<AddCategory />} />
                            <Route path="categories/:id" element={<CategoryUpdate />} />

                    </Route>
                </Route>
                </Route>
            </Routes>
        </div>
    );
}
