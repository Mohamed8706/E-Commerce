import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../../Api/Api";
import  Cookie  from 'cookie-universal';
import TableLoading from './../Loading/tableLoading';
import { useState } from "react";
import ReactPaginate from "react-paginate";



export default function TableShow(props) {
    const currentUser = props.currentUser || {
        'name': "",
    };
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(3);
    const { data, mutate } = props;

    const start = page * limit;
    const end = start + limit;
    const paginateData = data.slice(start, end);

    console.log(limit, start, end)
    // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce");

    
        // Handle Delete Button
    async function handleDelete(id){
    
            try {
                axios.delete(`${baseUrl}/${props.delete}/${id}`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }).then(() => mutate());
                
            

            } catch (err) {
                console.log(err)
            }
        

    }

    const headerShow = props.header.map((item, key) => <th key={key}>{item.name}</th>)

    const dataShow = paginateData.map((item, ind) => 
    <tr key={ind}>
        <td key={ind}><div className="flex flex-row w-full h-full items-center
        justify-center"> {item.id}</div></td>
        {props.header.map((item2, ind2) => 
        <td key={ind2} >
            <div className="flex flex-row h-full gap-2 items-center justify-center flex-wrap text-xl">
            {
            item[item2.value] === '1995' ? 'Admin' :
            item[item2.value] === '2001' ? 'User' : 
            item[item2.value] === '1996' ? 'Writer' : 
            item[item2.value] === '1999' ? 'Product Manager' :
            item2.value === "image" ? <img className="object-contain w-12" 
            src={item[item2.value]} alt="image" /> : 
            item2.value === "images" ? item[item2.value].map((i) => 
            <img src={i.image} alt="in" className="w-12"/>) : 
            <>{item[item2.value]} {currentUser && item[item2.value] === props.currentUser.name && " (You)"}</>
            }
            </div>
            
            
        </td>)}
            
        <td style={{textAlign: "center"}}>
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
                </tbody>
            </Table>
            <div className="flex w-full justify-end gap-3 items-center ">
            <select id="number-select" value={limit} onChange={(e) => setLimit(+e.target.value)} className="border w- text-center py-2 rounded-lg">
                <option value="" disabled>--Choose a number</option>
                {data.map((num, ind) => (
                    <option key={ind} value={++ind}>{ind}</option>
                ))}
            </select>
            <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={(e) => setPage(e.selected)}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(data.length / limit)}
            previousLabel="<<"
            renderOnZeroPageCount={null}
            activeLinkClassName="text-white bg-primary"
            containerClassName="flex justify-end align-center mb-0"
            pageLinkClassName=" mx-2 text-center leading-[30px] text-secondary transition duration-200
            rounded-full text-decoration-none block w-[30px] h-[30px] hover:bg-gray-200"
            />


            </div>
            </div>
        
    )
}