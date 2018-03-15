import axios from 'axios'

const axiosInstance = axios.create({
    timeout:10000
})

axiosInstance.interceptors.request.use(config => {
    //console.log(config)
    return config
},err => {
    return Promise.reject(err)
})

axiosInstance.interceptors.response.use(response => {
    //console.log(response.data)
    return response
},err => {
    return Promise.reject(err)
})

export default axiosInstance