import React, { useContext, useEffect,useState } from 'react'
import { useParams,Link, Route, useLocation } from 'react-router-dom'
import { GetChapter_By_Act } from '../../../../api/user/get_apis'
import convertToRoman from '../../../utils/number_to_roman'
import jwt_decode from 'jwt-decode'
import toast from 'react-hot-toast'
const Chapters = () => {

    const {act,token} = useParams()
    const decodedToken = jwt_decode(token,'act_token');
    const [chapters,setchapters] = useState([])
    const [req,setreq] = useState({
        act_id:decodedToken.id,
        search:''
    })

    const Chapters = async()=>{
        const data = await GetChapter_By_Act(req)
        if(data!==undefined && data.data.status == true){
            setchapters(data.data.data)
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
            Chapters()
        })
    },[])

  return (
    <section className='container-fluid mt-4 position-relative'>
        <img src={process.env.PUBLIC_URL+'/images/back.png'} onClick={()=>{window.history.back()}} className='icons cursor-pointer position-absolute top-0 start-0 ms-5'/>
        <main className="container d-flex justify-content-center position-sticky top-0">
            <div className="col-8 position-relative">
            <input className='form-control' placeholder='search chapters...' value={req.search?req.search:""} onBlur={()=>{if(req.search.length==0){Chapters()}}}  onChange={(e)=>setreq(prevState=>({...prevState,search:e.target.value}))}/>
            <img className='position-absolute top-0 end-0 mt-1 me-2 icons img-fluid' src={process.env.PUBLIC_URL+'/images/search.png'} onClick={()=>{if(req.search.length>0){Chapters()}}} alt="" />
            </div>
        </main>

        <section className="container mt-5">
        <h4 className='text-center my-4 text-gray1'>{act} <img className='img-fluid icons cursor-pointer ms-2 p-1' src={process.env.PUBLIC_URL+'/images/link.png'} alt='' onClick={()=>Get_link()}/></h4>
        <div className="row p-0 m-0 justify-content-center">
                {
                chapters!=undefined && chapters.length>0?(
                    chapters.map((Data,i)=>(
               
                        <div key={i} className="col-10 py-3 p-0">
                        <Link to={`../Solutions/services/acts_and_rules/acts/${act}/${Data.chapter}/${Data.token}`} className='text-decoration-none text-blue1 py-3'><span className='me-2'>Chapter{" "}{convertToRoman(Data.chapter_number)}</span><span className='me-2'>{Data.chapter_part==0?'':isNaN(Data.chapter_part)?'Part '+ Data.chapter_part:'Part '+convertToRoman(Data.chapter_part)}</span><span>{Data.chapter}</span></Link>
                        </div>
                    
                    ))
                ):(<h5 className='mt-5 text-center'>No chapters found</h5>)
                }
           
        </div>
        </section>
    </section>  
  )
}

export default Chapters