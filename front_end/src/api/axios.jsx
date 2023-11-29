import axios from 'axios'
import Cookies from 'js-cookie' 

const accessToken = Cookies.get('accessToken')
export default axios.create({
    baseURL:'http://localhost:8080',
    headers:{
        Authorization:`Bearer ${accessToken}`
    }
}) 