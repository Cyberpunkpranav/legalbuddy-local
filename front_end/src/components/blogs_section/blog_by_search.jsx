import React, { useState,useEffect,useTransition,startTransition, Fragment } from 'react'
import { get_blogs_by_search } from '../../api/user/get_apis'
import { image_path } from '../../env'
import {Get_industry,Get_category,Get_topic} from './common_functions'
import { Link } from 'react-router-dom'
import { formatted_date } from '../utils/formatter'
import Blog_Loader from './blog_loader'
import toast from 'react-hot-toast'
import Default_blogs from './default_blogs'

const Blog_by_search = (props) => {
    const [blog_data_by_search,setblog_data_by_search] = useState()
    const [limit,setlimit] = useState(12)
    const [offset,setoffset] = useState(0)
    const [loading, setloading] = useState(false)
    const [loadnext,setloadnext] = useState(true)
    const [blog_id,setblog_id]=useState('')
    const [ page,setpage]= useState(1)  
    const [datalen,setdatalen]=useState('')


    async function Fetch_By_search(){
      props.setall(1)
        setloading(false)
        let req = {
          search:props.search,
          limit:limit,
          offset:offset,
        }
          const data  = await get_blogs_by_search(req)
          setdatalen( data!=undefined && data.data!=undefined?data.data.length:"")
          if(page ==1){
            setblog_data_by_search(data.data.data)
          }else{
            setblog_data_by_search(prevState=>[...prevState,...data.data.data])
          }
        
                setloading(false)
                if(loading==false){
                setloadnext(false)
                } 
        }

      const handle_infinite_scroll = async()=>{
        try {
         if(Math.round(window.innerHeight + document.documentElement.scrollTop) == document.documentElement.scrollHeight){
          setoffset(offset+12)
          setpage(page+1)     
         }    
        } catch (error) {
          toast.error(error.message)
        }
      }

      useEffect(()=>{
      if(datalen !== 0){
        window.addEventListener('scroll',handle_infinite_scroll)
      }
      },[])
        useEffect(()=>{
            Fetch_By_search()
        },[props.searchparam,offset])

        if(blog_data_by_search ==undefined || loading){
          return(<Blog_Loader/>) 
        }
      return (
    <Fragment>
     <div className="container search_section bg-transparent mt-4 justify-content-center">
          {
            blog_data_by_search !=undefined && blog_data_by_search.length>0 ?(
              blog_data_by_search && blog_data_by_search.length > 0 && blog_data_by_search.map((data, i) => (
                <Link to={`view/${data.id}`} className=" text-decoration-none">
                <div key={i} className={`card bg-transparent position-relative blogs mt-5 border-0`} >
                    <button className="btn position-absolute top-0 start-0 btn-sm btn-blue7 mt-2 ms-2 text-white p-0 m-0 px-2 rounded-pill">{Get_topic(data.topic_id)}</button >
                    <div className="row" style={{minHeight:'100%'}}>
                      <div className="col-5">
                      <div className="overflow-hidden image_holder">
                    {
                      data.image ? (
                        <img src={process.env.REACT_APP_IMAGE_PATH + data.image} className="card-img-top card_image" alt="..."/>
    
                      ):(
                        <img src={process.env.PUBLIC_URL + '/images/no_image.png'} className="card-img-top card_image" alt="..."/>
                      )
                    }
                    </div>
                    </div>
                    <div className="col-7">
                    <div className="card-body position-relative">
                    <div className="row">
                    <div className="col-11">
                    <h5 className="card-title text-dark text-truncate">{data.title}</h5>
                    <h6 className="card-text text-gray2 text-truncate">{data.description}</h6> 
                    
                  <div className="col-auto">
                    <div className="d-flex">
                      <small className="d-inline-block text-wrap-none text-blue2 text-truncate p-0 m-0 pe-2">#{Get_category(data.category_id)}</small >
                      <small className="d-inline-block text-blue2 p-0 m-0 px-2 text-truncate">#{Get_industry(data.industry_id)}</small >
                    </div>
                  </div>
                  <div className="col-auto mt-2">
                  <small className='text-gray2'> {formatted_date(data.updated_on)}</small>
                  </div>
                    </div>
                    <div className="col-1">
                    <div class="dropdown">
                  <button class="btn p-0 m-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={process.env.PUBLIC_URL +'/images/more.png'} className='img-fluid blog_more'/>
                  </button>
                  <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="javascript:void(0)">Save to watch later</a></li>
                  <li><a class="dropdown-item" href="javascript:void(0)">Share</a></li>
                  <li><a class="dropdown-item" href="javascript:void(0)">Not interested</a></li>
                  </ul>
                  </div>
                    </div>
                    </div>
          
                  </div>
                    </div>
              
                    </div>
                </div>
                </Link>
          
              ))
            ):(<div className='text-center text-gray2'>No Blogs Found</div>)
         
          }
     </div>
     {
          loadnext?(
              <Blog_Loader/>
          ):(<div className='text-center text-gray2 py-4'></div>)
        }
        <div className="container default_section">
          <h6 className='text-gray1 '>Other Blogs</h6>
          <Default_blogs searchview={props.searchview} limit={props.limit} offset ={props.offset} setoffset={props.setoffset} setpage = {props.setpage}/>
        </div>
    </Fragment>
  )
}

export default Blog_by_search