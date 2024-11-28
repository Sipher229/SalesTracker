import axios from "axios";

const baseURL = import.meta.env.PROD ? '/api': 'http://localhost:3000/api'
console.log(baseURL)

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'

    }
})

export default axiosInstance