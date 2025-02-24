import { faCartPlus, faCartShopping, faPen, faPlus, faTruckFast, faTruckLoading, faTruckPickup, faUsers } from "@fortawesome/free-solid-svg-icons";

export const links = [
    {
        name: "Users",
        path: "/dashboard/users",
        icon: faUsers,
        role: "1995"
    },
    {
        name: "Add User",
        path: "/dashboard/user/add",
        icon: faPlus,
        role: "1995"
    },
    {
        name: "Categories",
        path: "/dashboard/categories",
        icon: faCartShopping,
        role: ['1995', '1999']

    }, {
        name: "Add Category",
        path: "/dashboard/category/add",
        icon: faCartPlus,
        role: ['1995', '1999']
    }, 
    {
        name: "Products",
        path: "products",
        icon: faTruckFast,
        role: ['1995', '1999']
    },
    {
        name: "AddProduct",
        path: "product/add",
        icon: faTruckLoading,
        role: ['1995', '1999']
    }
]