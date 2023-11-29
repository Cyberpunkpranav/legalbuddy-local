import axios from "../axios";
import toast from "react-hot-toast"
import Notiflix from 'notiflix'
// http://localhost:8080/api/user/blogs/allblogs?limit=12&offset=0&search=&topic_id=1&category_id=2&industry_id=3

export const get_blogs = async(req)=>{
    let res
    try {
    await axios.get(`/api/user/blogs/allblogs?limit=${req.limit}&offset=${req.offset}&topic_id=${req.topic_id}&category_id=${req.category_id}&industry_id=${req.industry_id}`).then((response)=>{
        res = response
    }).catch((e)=>{
        toast.error(e.message)
    })
    } catch (error) {
        toast.error(error.message)
    }
    return res
}
export const get_blogs_by_search = async(req)=>{
    let res
    try {
    await axios.get(`/api/user/blogs/allblogs/search?limit=${req.limit}&offset=${req.offset}&search=${req.search}`).then((response)=>{
        res = response
    }).catch((e)=>{
        toast.error(e.message)
    })
    } catch (error) {
        toast.error(error.message)
    }
    return res
}
export const get_blog_by_id = async(id)=>{
    let res
    try {
    await axios.get(`/api/user/blogs/view/${id}`).then((response)=>{
        res = response
    }).catch((e)=>{
        toast.error(e.message)
    })
    } catch (error) {
        toast.error(error.message)
    }
    return res
}

export const GetClauses = async(req)=>{
let res;
try {
  const response= await axios.get(`/api/user/services/libraries/clauses/allclauses?limit=${req.limit}&offset=${req.offset}&search=${req.search}`)
  res=response
} catch (error) {
    toast.error(error.message)
}
return res
}

export const GetClausesById = async(id)=>{
    let res;
    try {
      const response= await axios.get(`/api/user/services/libraries/clauses/view/${id}`)
      res=response
    } catch (error) {
        toast.error(error.message)
    }
    return res
    }

export const GetActs = async(req)=>{
    let res;
    try {
        await axios.get(`/api/user/acts_and_rules/acts/list?search=${req.search}`).then((response)=>{
            res = response
        }).catch((e)=>{
         toast.error(e.message)
        }).finally(()=>{
            return res
        })
    } catch (error) {
        toast.error(error)
    }
    return res
}
export const GetChapter_By_Act = async(req)=>{
    let res;
    try {
        await axios.get(`/api/user/acts_and_rules/act/chapters/list?act_id=${req.act_id}&search=${req.search}`).then((response)=>{
            res = response
        }).catch((e)=>{
         toast.error(e.message)
        }).finally(()=>{
            return res
        })
    } catch (error) {
        toast.error(error)
    }
    return res
}
export const GetSections_By_Chapter = async(req)=>{
    let res;
    try {
        await axios.get(`/api/user/acts_and_rules/act/chapter/sections/list?act_id=${req.act_id}&chapter_id=${req.chapter_id}&search=${req.search}`).then((response)=>{
            res = response
        }).catch((e)=>{
         toast.error(e.message)
        }).finally(()=>{
            return res
        })
    } catch (error) {
        toast.error(error)
    }
    return res
}

export const GetSubSections_By_Section = async(req)=>{
    let res;
    try {
        await axios.get(`/api/user/acts_and_rules/act/chapter/section/subsections/list?act_id=${req.act_id}&chapter_id=${req.chapter_id}&section_id=${req.section_id}`).then((response)=>{
            res = response
        }).catch((e)=>{
         toast.error(e.message)
        }).finally(()=>{
            return res
        })
    } catch (error) {
        toast.error(error)
    }
    return res
}
export const GetClauses_By_Section = async(req)=>{
    let res;
    try {
        await axios.get(`/api/user/acts_and_rules/act/chapter/section/subsections/clauses/list?act_id=${req.act_id}&chapter_id=${req.chapter_id}&section_id=${req.section_id}`).then((response)=>{
            res = response
        }).catch((e)=>{
         toast.error(e.message)
        }).finally(()=>{
            return res
        })
    } catch (error) {
        toast.error(error)
    }
    return res
}

export const GetSubClauses_By_Section = async(req)=>{
    let res;
    try {
        await axios.get(`/api/user/acts_and_rules/act/chapter/section/subsections/clauses/subclauses/list?act_id=${req.act_id}&chapter_id=${req.chapter_id}&section_id=${req.section_id}`).then((response)=>{
            res = response
        }).catch((e)=>{
         toast.error(e.message)
        }).finally(()=>{
            return res
        })
    } catch (error) {
        toast.error(error)
    }
    return res
}