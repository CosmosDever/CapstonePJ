import axios from "axios";

export const axiosinstant = axios.create({
    baseURL:'http://localhost:3605',
    withCredentials:true,
})