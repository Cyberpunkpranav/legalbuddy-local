import toast from "react-hot-toast"
import axios from '../axios'
//blogs
export const Get_blogs = async(limit,offset,search)=>{
    let data;
    try{
        await axios.get(`/api/admin/blogs/allblogs?limit=${limit}&offset=${offset}&search=${search?search:''}`).then((response)=>{
            data = response
        })
    }catch(e){
        toast.error(e.message)
    }
    return data
}
export const Get_Blog_by_Id = async(id)=>{
    let data;
    try{
        await axios.get(`/api/admin/blogs/blogbyId?id=${id}`).then((response)=>{
            data = response
        }).catch((e)=>{
            toast.error(e.message)
        })
    }catch(e){
        toast.error(e.message)
    }
    return data
}
export const Get_blog_count = async()=>{
    let data;
    try {
        await axios.get('/api/admin/blogs/blog_count').then((response)=>{
            data = response
        })  
    } catch (error) {
        toast.error(error.message)
    }
    return data
}
//clauses
export const Get_Clauses = async(req)=>{
    let res;
    try {
        await axios.get(`/api/admin/services/libraries/clauses?limit=${req.limit}&offset=${req.offset}&search=${req.search}`).then((response)=>{
            res =response
        })
    } catch (error) {
       toast.error(error.message) 
    }
    return res
}    

export const Get_Clause_by_id = async(id)=>{
    let res;

    try {
        await axios.get(`/api/admin/services/libraries/clause/view?id=${id}`).then((response)=>{
            res = response
            console.log(response);
        })
    } catch (error) {
            toast.error(error.message) 
    }
    return res
}

export const Get_Acts = async(req)=>{
    let res;
    try {
        await axios.get(`/api/admin/acts_and_rules/acts/list?limit=${req.limit}&offset=${req.offset}&search=${req.search}`).then((response)=>{
            res=response
        }).catch((e)=>{
            toast.error(e.message)
    }).finally(()=>{
        return res
    })
    } catch (error) {
     toast.error(error.message)
    }
    return res
}
export const Get_Act_by_Id = async(id)=>{
    let data;
    try{
        await axios.get(`api/admin/acts_and_rules/act/view?id=${id}`).then((response)=>{
            data = response
        }).catch((e)=>{
            toast.error(e.message)
        })
    }catch(e){
        toast.error(e.message)
    }
    return data
}

export const Get_Chapter_by_Act = async(req)=>{
    let res;
    if(req.act_id !=undefined){
    try {
        await axios.get(`/api/admin/acts_and_rules/acts/chapters/list?act_id=${req.act_id}&search=${req.search}`).then((response)=>{
            res=response
        }).catch((e)=>{
            toast.error(e)
        }).finally(()=>{
            return res
        })
    } catch (error) {
        toast.error(error.message)
    }
    return res
}else{
    toast.error('Choose act and try again')
}
return 0
}
export const Get_Sections_by_Chapter = async(req)=>{
    let res;
    try {
        await axios.get(`/api/admin/acts_and_rules/acts/sections/list/?chapter_id=${req.chapter_id}&act_id=${req.act_id}`).then((response)=>{
            res=response
        }).catch((e)=>{
            toast.error(e)
        }).finally(()=>{
            return res
        })
    } catch (error) {
        toast.error(error.message)
    }
    return res

return 0
}

export const Get_SubSections_by_Section = async(req)=>{
    let res;

    try {
        await axios.get(`/api/admin/acts_and_rules/acts/section/subsections/list/?chapter_id=${req.chapter_id}&act_id=${req.act_id}&section_id=${req.section_id}`).then((response)=>{
            res=response
        }).catch((e)=>{
            toast.error(e)
        }).finally(()=>{
            return res
        })
    } catch (error) {
        toast.error(error.message)
    }
    return res
}
export const Get_Clause_by_Subsection = async(req)=>{
    let res;
    try {
        await axios.get(`/api/admin/acts_and_rules/acts/section/subsection/clauses/list?act_id=${req.act_id}&chapter_id=${req.chapter_id}&section_id=${req.section_id}&subsection_id=${req.subsection_id}`).then((response)=>{
            res=response
        }).catch((e)=>{
            toast.error(e.message)
        })
    } catch (error) {
        toast.error(error.message)
    }
    return res
}
export const Get_SubClause_by_Clause = async(req)=>{
    
    let res;
    try {
        await axios.get(`/api/admin/acts_and_rules/acts/section/subsection/clause/subclauses/list?act_id=${req.act_id}&chapter_id=${req.chapter_id}&section_id=${req.section_id}&subsection_id=${req.subsection_id}&clause_id=${req.clause_id}`).then((response)=>{
            res=response
        }).catch((e)=>{
            toast.error(e.message)
        })
    } catch (error) {
        toast.error(error.message)
    }
    return res
}
