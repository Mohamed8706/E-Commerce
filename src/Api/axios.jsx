import axios from "axios";
import { baseUrl } from './Api';
import Cookie  from 'cookie-universal';


const cookie = Cookie();
const token =  cookie.get("e-commerce");
export const AXIOS = axios.create({
    baseURL: baseUrl,
            headers: {
                Authorization: "Bearer " + token,
            }
})