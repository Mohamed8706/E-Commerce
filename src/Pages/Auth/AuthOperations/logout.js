// import axios from "axios"
// import { LOGOUT, baseUrl } from "../../../Api/Api"
// import  Cookie  from 'cookie-universal';

// export default function LogOut() {
//     const cookie = Cookie();
//     async function handleLogOut() {
//         try {
//             const res = await axios.get(`${baseUrl}/${LOGOUT}`, {
//                 headers: {
//                     Authorization: "Bearer " + cookie.get('e-commerce'),
//                 }
//             }, [])
//             cookie.remove('e-commerce');
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }
//     return (
//         <button className="bn54" onClick={handleLogOut}><span className="bn54span">Log Out</span></button>
//     )
// }