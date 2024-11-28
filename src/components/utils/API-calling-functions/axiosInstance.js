import axios from "axios";

const baseURL = import.meta.env.PROD ? '/api': 'http://localhost:3000/api'

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'

    }
})

export default axiosInstance