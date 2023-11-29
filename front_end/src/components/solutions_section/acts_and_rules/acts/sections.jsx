import React, { useEffect, useState } from 'react'
import { GetSections_By_Chapter } from '../../../../api/user/get_apis'
import { useLocation, useParams ,Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import toast from 'react-hot-toast'

const Sections = () => {
    const {act,chapter,token} = useParams()
    const decodedToken = jwt_decode(token,'chapter_token');
    const [sections,setsections] = useState([])
    const [req,setreq] = useState({
        act_id:decodedToken.act_id,
        chapter_id:decodedToken.id,
        search:''
    })
    const Sections = async()=>{
    const data = await GetSections_By_Chapter(req)
    if(data!==undefined && data.data.status == true){
        setsections(data.data.data)
    }else{
        toast.error('please refresh and try again')
    }
    }
    const Get_link = ()=>{
        const link = window.location.href
        navigator.clipboard.writeText(link)
        toast.success('link copied')
    }
    useEffect(()=>{
        return(()=>{
            Sections()
        })
    },[])
  return (
    <section className='container-fluid mt-4 position-relative'>
    <img src={process.env.PUBLIC_URL+'/images/back.png'} onClick={()=>{window.history.back()}} className='icons cursor-pointer position-absolute top-0 start-0 ms-5'/>
    <main className="container d-flex justify-content-center position-sticky top-0">
        <div className="col-8 position-relative">
        <input className='form-control' placeholder='search sections...' value={req.search?req.search:""} onBlur={()=>{if(req.search.length==0){Sections()}}}  onChange={(e)=>setreq(prevState=>({...prevState,search:e.target.value}))}/>
        <img className='position-absolute top-0 end-0 mt-1 me-2 icons img-fluid' src={process.env.PUBLIC_URL+'/images/search.png'} onClick={()=>{if(req.search.length>0){Sections()}}} alt="" />
        </div>
    </main>

    <section className="container mt-4">
     <h4 className='text-center text-gray1 p-0 m-0'>{act}</h4>   
    <h5 className='text-center mt-2 mb-4 text-gray1 fw-normal p-0 m-0'>{chapter} <img className='img-fluid icons cursor-pointer ms-2 p-1' src={process.env.PUBLIC_URL+'/images/link.png'} alt='' onClick={()=>Get_link()}/></h5>
    <div className="row p-0 m-0 justify-content-center">
            {
            sections!=undefined && sections.length>0?(
                sections.map((Data,i)=>(
                    <div key={i} className="col-10 py-3 p-0">
                    <Link to={`../Solutions/services/acts_and_rules/acts/${act}/${chapter}/${Data.section}/${Data.token}`} className='text-decoration-none text-blue1 py-3'><span className='me-2'>Section{" "}{Data.section_number}</span><span>{Data.section}</span></Link>
                    </div>
                
                ))
            ):(<h5 className='mt-5 text-center'>No sections found</h5>)
            }
    </div>
    </section>
</section>  
  )
}

export default Sections