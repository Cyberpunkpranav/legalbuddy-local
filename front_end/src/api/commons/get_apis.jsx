import toast from "react-hot-toast"
import axios from '../axios'

export const Get_filters = async()=>{
    let data;
try {
    await axios.get(`/api/admin/blogs/types`).then((response)=>{
        data = response
       })
} catch (error) {
    toast.error(error.message)
}
return data
}