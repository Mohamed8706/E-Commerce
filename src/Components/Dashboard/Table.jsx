import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl, USER } from "../../Api/Api";
import  Cookie  from 'cookie-universal';
import TableLoading from './../Loading/tableLoading';

export default function TableShow(props) {
    const currentUser = props.currentUser || {
        'name': "",
    };

    // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce")
    
        // Handle Delete Button
    async function handleDelete(id){
    
            try {
                axios.delete(`${baseUrl}/${props.delete}/${id}`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }).then(() => props.mutate());
                
            

            } catch (err) {
                console.log(err)
            }
        

    }


    const paginateData = [];

    if (props.data.length !== 0){
        for (let i = (props.page - 1) * props.limit ; i <  props.page * props.limit; i++) {
            paginateData.push(props.data[i])
            
        }
    }

    const headerShow = props.header.map((item, key) => <th key={key}>{item.name}</th>)
    const dataShow = paginateData.map((item, ind) => 

    <tr key={ind}>
        <td key={ind} style={{height:"100px"}}><div className="flex flex-row w-full h-full items-center
        justify-center"> {item.id}</div></td>
        {props.header.map((item2, ind2) => 
        <td key={ind2} className="h-[100px]">
            <div className="flex flex-row h-full gap-2 items-center justify-center flex-wrap text-xl">
            {
            item[item2.value] === '1995' ? 'Admin' :
            item[item2.value] === '2001' ? 'User' : 
            item[item2.value] === '1996' ? 'Writer' : 
            item[item2.value] === '1999' ? 'Product Manager' :
            item2.value === "image" ? <img className="object-contain h-full w-full max-w-24" 
            src={item[item2.value]} alt="image"/> : 
            item2.value === "images" ? item[item2.value].map((i) => 
            <img src={i.image} alt="in" className="w-32 h-32"/>) : 
            <>{item[item2.value]} {currentUser && item[item2.value] === props.currentUser.name && " (You)"}</>
            }
            </div>
            
            
        </td>)}
            
        <td style={{textAlign: "center", height:"100px"}}>
            <div className="flex flex-row w-full h-full items-center
        justify-center">
            { item.name !== currentUser.name  && 
            <FontAwesomeIcon icon={faTrash} style={{ marginRight: "8px", color: "orangered", cursor: "pointer",
                width:"30px",height:"30px"}} 
            onClick={() => handleDelete(item.id)}
            /> 
            }
        

                
                
                <Link to={`${item.id}`}>
                <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer", 
                    width:"30px",height:"30px" }}/>
                </Link>
                

            </div>
                </td>
    </tr> 
)
    return (
        <div className="rounded-[12px] overflow-x-auto ">
                <Table striped hover >
                <thead >
                    <tr >
                    <th >ID</th>
                    {headerShow}
                    <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    
                    {props.data.length === 0 ?
                        <tr><TableLoading /><TableLoading />{props.header.map((item, key) => <TableLoading key={key}/>)}</tr> :
                        dataShow } 
                    {/* {users.length === 0 && nocat && <tr><td colSpan={12} className="text-center">No Catogries Found</td></tr>} */} 
                </tbody>
            </Table>
            </div>
        

        
    )
}