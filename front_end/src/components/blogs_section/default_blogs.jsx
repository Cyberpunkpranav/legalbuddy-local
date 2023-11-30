import React, { useState,useEffect, Fragment } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import Sharing from '../utils/share'
import { image_path } from '../../env'
import {Get_industry,Get_category,Get_topic} from './common_functions'
import { formatted_date } from '../utils/formatter'
import { get_blogs } from '../../api/user/get_apis'
import Blog_Loader from './blog_loader'
import toast from 'react-hot-toast'
import '../../css/user/blogs/blogs.css'
import Notiflix from 'notiflix'


const Default_blogs = (props) => {
  const navigate =  useNavigate()
  const [blog_data,setblog_data] = useState([])
  const [loading,setloading]=useState(false)
  const [loadnext,setloadnext] = useState(true)
  const [datalen,setdatalen]=useState('')
  const [shareindex,setshareindex] = useState()

    useEffect(()=>{
      document.documentElement.scrollTop = 0
    },[])

    let req = {
      topic_id:props.topic_id,
      category_id:props.category_id,
      industry_id:props.industry_id,
      limit:props.limit,
      offset:props.offset,
    }

    async function Fetch(){
        setloadnext(true)
          const data = await get_blogs(req)
          if(data==undefined){
            return toast.error('something went wrong please logout and try again')
          }
          if(data.data.status ==403){
            Notiflix.Confirm.show(
              `Sign in`,
              `Please Sign in to access to legal buddy `,
              "sign in",
              "cancel",
              () => {
               navigate('/Login')
              },
              () => {
                return 0;
              },
              {}
            );
          }
          if( data.data.status==true){
            setdatalen(data!=undefined && data.data!=undefined?data.data.length:"")
            if(props.page==1|| props.offset==0){  
              setblog_data(data.data.data)
            }else{
              setblog_data(prevState=>[...prevState,...data.data.data])
            }
          }else{
            toast.error(data.data.message)
          }
      
          setloading(false)
          if(loading==false){
          setloadnext(false)
          }
        }
      useEffect(()=>{
        return(()=>{
          Fetch()
        })
      },[])
    useEffect(()=>{
        Fetch()
    },[props.all,props.topic_id,props.category_id,props.industry_id,props.offset,props.page])

      const handle_infinite_scroll = async()=>{
        try {
         if(Math.round(window.innerHeight + document.documentElement.scrollTop) == document.documentElement.scrollHeight){
          props.setoffset(props.offset+12)
          props.setpage(props.page+1)     
         }    
        } catch (error) {
          toast.error(error.message)
        }
      }

      useEffect(()=>{
      if(datalen !== 0){
        return(()=>{
          window.addEventListener('scroll',handle_infinite_scroll)
        })
      }
      },[])
 
    if(loading) return (        
      <Blog_Loader/>
    )
      return (
    <Fragment>
    <div className='container-fluid mt-4'>
    
    {/* */}
        <div className='row justify-content-start g-4'>
        { 
          props.searchview ? (
           blog_data!=undefined && blog_data.map((data, i) => (
                <Link to={`view/${data.id}`} key={i} className="text-decoration-none">
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
                    <div className="dropdown">
                  <button className="btn p-0 m-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={process.env.PUBLIC_URL +'/images/more.png'} className='img-fluid blog_more'/>
                  </button>
                  <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="javascript:void(0)" onClick={(e)=>{e.preventDefault()}}>Save to watch later</a></li>
                  <li><a className="dropdown-item" href="javascript:void(0)" onClick={(e)=>{e.preventDefault()}}>Share</a></li>
                  <li><a className="dropdown-item" href="javascript:void(0)" onClick={(e)=>{e.preventDefault()}}>Not interested</a></li>
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
              ):(
                blog_data!=undefined && blog_data.map((data, i) => (
                  <Fragment key={i}>
                <Link to={`view/${data.id}`} className="col-xxl-2 col-xl-3 col-lg-4 col-md-5 col-sm-6 col-10  text-decoration-none">
                <div key={i} className={`card blogs position-relative  border-0`} >
                    <button className="btn position-absolute top-0 start-0 btn-sm btn-blue7 mt-2 ms-2 text-white p-0 m-0 px-2 rounded-pill">{Get_topic(data.topic_id)}</button >
                    <div className="overflow-hidden bg-white image_holder">
                    {
                      data.image ? (
                        <img src={process.env.REACT_APP_IMAGE_PATH + data.image} className="card-img-top card_image" alt="..."/>
    
                      ):(
                        <img src={process.env.PUBLIC_URL + '/images/no_image.png'} className="card-img-top card_image" alt="..."/>
                      )
                    }
                    </div>
     
                  <div className="card-body position-relative">
                    <div className="row">
                    <div className="col-10">
                    <h5 className="card-title text-dark text-truncate">{data.title}</h5>
                    <h6 className="card-text text-gray2 text-truncate">{data.description}</h6> 
                    
                  <div className="col-auto">
                    <div className="d-flex">
                      <small className="d-inline-block text-wrap-none text-blue2 text-truncate p-0 m-0 pe-2">#{Get_category(data.category_id)}</small >
                      <small className="d-inline-block text-blue2 p-0 m-0 px-2 text-truncate">#{Get_industry(data.industry_id)}</small >
                    </div>
                  </div>
                  <div className="col-auto mt-2">
                  <small className='text-gray2'>{formatted_date(data.created_on)}</small>
                  </div>
                    </div>
                    <div className="col-2 d-flex justify-content-end">
                    <div className="dropdown">
                  <button className="btn p-0 m-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={process.env.PUBLIC_URL +'/images/more.png'} className='img-fluid blog_more'/>
                  </button>
                  <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="javascript:void(0)" onClick={(e)=>{e.preventDefault()}}>Save to watch later</a></li>
                  <li><a className="dropdown-item" href="javascript:void(0)" onClick={(e)=>{e.preventDefault();setshareindex(i)}}>Share</a></li>
                  <li><a className="dropdown-item" href="javascript:void(0)" onClick={(e)=>{e.preventDefault()}}>Not interested</a></li>
                  </ul>
                  </div>
                    </div>
                    </div>
                  </div>    
                </div>
                </Link>
                {
                  shareindex == i ? (
                    < >
                    <div className="backdrop p-0 m-0" style={{zIndex:20}}></div>
                    <div className="share position-absolute start-0 end-0 mx-auto bg-white p-3 rounded-4"style={{zIndex:22}} >
                      <div className="btn btn-close end-0 position-absolute top-0 p-3" onClick={()=>{setshareindex()}}></div>
                        <p className=''>Share this Blog at</p>
                        <div className="col-12" >
                        <Sharing title={data.title} shareurl={`http://localhost:3000/Blogs/view/${data.id}`}/>
                        </div>
                    </div>
                    </>
                  ):(
                    <></>
                  )
                }
               
                </Fragment>
                ))
              )
              }
                </div>
        {
          loadnext?(
              <Blog_Loader/>
          ):(<div className='text-center text-gray2 py-4'>no more blogs to show</div>)
        }
  </div>
  </Fragment>
  )
}

export default Default_blogs