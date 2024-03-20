import axios from "axios";

export const api = axios

api.interceptors.response.use(
    (response) => {
        // console.log(response.data)
        return response.data
    },
    (error) => {
        console.warn(error)
        return Promise.reject(error)
    }
)

