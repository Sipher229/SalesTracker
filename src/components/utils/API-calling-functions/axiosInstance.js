import axios from "axios";

const baseURL = import.meta.env.PROD ? '': 'http://localhost:3000'

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'

    }
})

export default axiosInstance