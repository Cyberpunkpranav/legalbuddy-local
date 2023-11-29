import React, { useEffect, useState }  from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; 
import { get_blog_by_id,get_blogs } from '../../api/user/get_apis';
import { formatted_date } from '../utils/formatter';
import { image_path } from '../../env';
import { Get_topic,Get_category,Get_industry } from './common_functions';
//css
import '../../css/user/blogs/view_blog.css'
const View_Blog = () => {
  const [viewblog,setviewblog] =useState([])
  const [limit,setlimit] = useState(12)
  const[blog_id,setblog_id] = useState()
  const [offset,setoffset] = useState(0)
  const [related_blogs,setrelated_blogs] = useState([])
  const params = useParams();
  const { id } = params;


  const View_blog = async()=>{
    const res = await get_blog_by_id(id)
    console.log(res);
    setviewblog(res.data.data[0])
  }
  const related_posts = async()=>{
    let req = {
      topic_id:viewblog.topic_id,
      category_id:viewblog.category_id,
      industry_id:viewblog.industry_id,
      limit:limit,
      offset:offset,
    }
    const res = await get_blogs(req)
    setrelated_blogs(res.data.data)
  } 
  useEffect(()=>{
    return()=>View_blog()
  },[id])
  useEffect(()=>{
    related_posts()
  },[])
  console.log(related_blogs);
  return (
    <section className='container-fluid mt-5 view_blog'>
      
      <div className="row justify-content-evenly">
        <div className="col-8 blog">
          {
            viewblog !==undefined?(
              <div className="container-fluid">
              <h2 className='text-dark mb-4'>{viewblog.title}</h2>
              <img className='img-fluid blog_image' src={image_path+viewblog.image}/>
              <h6 className='text-gray2 my-4'> {formatted_date(viewblog.created_on)}</h6>
              <h4 className='text-dark my-4'>{viewblog.description}</h4>
              <p className='my-4' dangerouslySetInnerHTML={{__html:viewblog.content}}></p>
              <Link className='text-decoration-none me-3'>#{Get_topic(viewblog.topic_id)}</Link>
              <Link className='text-decoration-none me-3'>#{Get_category(viewblog.category_id)}</Link>
              <Link className='text-decoration-none me-3'>#{Get_industry(viewblog.industry_id)}</Link>
            </div>
            ):(<></>)
          }
        </div>
        <div className="col-3">
          <h4>Related Blogs</h4>
          <div className="col-12">
          {
          related_blogs !=undefined && related_blogs.length>0 ?(
            related_blogs && related_blogs.length > 0 && related_blogs.map((data, i) => (
              <Link to={`../Blogs/view/${data.id}`} onClick={window.scrollY==0} className={`d-${data.id==viewblog.id?'none':''} col-lg-3 col-md-4 col-10 text-decoration-none`}>
              <div key={i} className={`card bg-transparent position-relative blogs border-0`} >
                  <button className="btn position-absolute top-0 start-0 btn-sm btn-blue7 mt-2 ms-2 text-white p-0 m-0 px-2 rounded-pill">{Get_topic(data.topic_id)}</button >
                  <div className="overflow-hidden image_holder">
                  {
                    data.image ? (
                      <img src={image_path + data.image} className="card-img-top card_image" alt="..."/>
  
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
                <small className='text-gray2'> {formatted_date(data.created_on)}</small>
                </div>
                  </div>
                  <div className="col-2" style={{zIndex:20}}>
                  <div class="dropdown">
                <button class="btn p-0 m-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={process.env.PUBLIC_URL +'/images/more.png'} className='img-fluid blog_more'/>
                </button>
                <ul class="dropdown-menu" style={{zIndex:20}}>
                <li><a class="dropdown-item" href="javascript:void(0)" onClick={(e)=>{e.preventDefault()}}>Save to watch later</a></li>
                <li><a class="dropdown-item" href="javascript:void(0)" onClick={(e)=>{e.preventDefault()}}>Share</a></li>
                <li><a class="dropdown-item" href="javascript:void(0)" onClick={(e)=>{e.preventDefault()}}>Not interested</a></li>
                </ul>
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
        </div>
      </div>
    </section>
  )
}
export default View_Blog 