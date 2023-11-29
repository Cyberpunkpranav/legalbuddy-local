import React, { useState,useEffect } from 'react'
import toast from 'react-hot-toast'
import Notiflix from 'notiflix'
import ReactPaginate from "react-paginate";
import { formatted_date } from '../../utils/formatter';
import { Get_blogs,Get_blog_count} from '../../../api/admin/get_apis'
import { Get_filters } from '../../../api/commons/get_apis';
import {Switch_Blogs,Change_Admin_Blog_view} from '../../../api/admin/post_apis'
import  {Get_category,Get_industry,Get_topic} from '../../blogs_section/common_functions'
import { Delete_Blog } from '../../../api/admin/delete_apis'
import { Link } from 'react-router-dom'
import { image_path } from '../../../env'
import '../../../css/admin_panel/blogs.css'
import Cookies from 'js-cookie';
const Blogs = () => {
  const blog_view = Cookies.get('blog_view')
  const [search,setsearch] = useState('')
  const [filter,setfilter] = useState([])
  const [total_count,settotal_count] = useState('')
  const [data,setdata] = useState({
        limit:12,
        offset:0
  })
    const [blogs,setblogs]=useState([])
    const[load,setload]=useState(false)
    const [view,setview] = useState(blog_view?blog_view:'Grid')

    async function Fetch(Data){
      if (Data == undefined || Data.selected == undefined) {
      try {
        setload(true)
        const Data =  await Get_blogs(data.limit,data.offset,search)
          setblogs(Data.data)
        setload(false)
      } catch (err) {
        toast.error(err.message)
      }
    }else{
      try {
        setload(true)
        const responseData =  await Get_blogs(data.limit,Data.selected*10,search)
          setblogs(responseData.data)
        setload(false)
      } catch (err) {
        toast.error(err.message)
      }
    }
    }
    async function Get_types(){
      const Data = await Get_filters()
      setfilter(Data.data.data)
    }
    // const Get_topic = (id)=>{
    //   let topic_name = ''
    //   if(filter !=undefined && filter.topics !== undefined) {
    //     for(let j=0;j<filter.topics.length;j++){
    //       if(filter.topics[j].id == id){
    //         topic_name = filter.topics[j].topic_name
    //       }
    //     } 
    // }
    //   return topic_name
    // }
    // const Get_category = (id)=>{
    //   let category_name = ''
    //   if(filter !=undefined && filter.categories !== undefined) {
    //     for(let j=0;j<filter.categories.length;j++){
    //       if(filter.categories[j].id == id){
    //         category_name = filter.categories[j].category_name
    //       }
    //     } 
    // }
    //   return category_name
    // }
    // const Get_industry = (id)=>{
    //   let industry_name = ''
    //   if(filter !=undefined && filter.industry !== undefined) {
    //     for(let j=0;j<filter.industry.length;j++){
    //       if(filter.industry[j].id == id){
    //         industry_name = filter.industry[j].industry_name
    //       }
    //     } 
    // }
    //   return industry_name
    // }
    async function Switch_status(id,status){
      const data = await Switch_Blogs(id,status)
      if(data.data.status == true){
        toast.success(data.data.message)
        Fetch()
      }
      if(data.data.status == false){
        toast.error(data.data.message)
      }
    }
    async function delete_blog(id){
      const data = await Delete_Blog(id)
      if(data.data.status==true){
        toast.success(data.data.message)
        Fetch()
      }else{
        toast.error(data.data.message)
      }
    }
    const confirmmessage = (id) => {
      Notiflix.Confirm.show(
        `Delete Blog`,
        `Are you sure you want to delete this blog `,
        "Yes",
        "No",
        () => {
          delete_blog(id);
        },
        () => {
          return 0;
        },
        {}
      );
    }
    const toggleview = (view)=>{
        if(view == 'Grid'){
          setview('Grid')
          Cookies.set('blog_view','Grid')
        }
        if(view == 'List'){
          setview('List')
          Cookies.set('blog_view','List')
        }
    }
    const Get_count = async()=>{
      const data = await Get_blog_count()
      if(data.data.status == true){
        // toast.success(data.data.message)
        settotal_count(data.data.data)
      }else{
        toast.error(data.data.message)
      }
    }

    useEffect(()=>{
      Get_types()
      Get_count()
    },[])
    useEffect(() => {
      Fetch()
  }, [data,search])
    // console.log(total_count)
  return (
    <div className="container-fluid admin_blogs p-0 m-0 mt-4 text-dark position-relative">
        <Link to='../Admin' className='text-decoration-none position-absolute top-0 start-0 ms-5 text-darks'><img src={process.env.PUBLIC_URL+'/images/back.png'} className='img-fluid icons'/></Link>
  <h4 className='text-center fw-semibold mb-4'>Blogs</h4>
  <div className="container position-relative">
    <input className='form-control search w-50 d-flex mx-auto my-4' placeholder='search blogs..' value={search?search:''} onChange={(e)=>setsearch(e.target.value)} />
    <Link to='new_blog' className='btn btn-blue1 text-light position-absolute top-0 end-0'>+ New Blog</Link>
    <select value={view?view:''} className="position-absolute top-0 start-0 btn" onChange={(e)=>toggleview(e.target.value)} aria-label="Default select example">
    <option value='Grid'>Grid</option>
    <option value='List'>List</option>
</select>
  </div>
  <div className="container" style={{minHeight:'80vh'}}>
  {
    load ? (
      <div className="container d-flex align-items-center">
  <strong role="status">Loading...</strong>
  <div className="spinner-border ms-auto" aria-hidden="true"></div>
</div>
    ):(
      <>
      <div className={`d-${view=='Grid'?'':'none'} row justify-content-start g-4`} style={{minHeight:'50vh'}}>
      {
        blogs && blogs.length>0?(
          blogs.map((data,i)=>(
            <Link to={`edit_blog/${data.id}`} key={i} className="col-md-5 col-11 col-lg-4 text-decoration-none">
                <div className={`card text-wrap bg-${data.status==0?'light':'pearl'} position-relative`} >
                <div className="card-body">
                <div className="row">
                <div className="col-12 image_holder">
                  {
                    data.image?(
                      <img className='img-fluid card_image' alt='blog_image' src={data.image!=null?image_path+data.image:''}/>

                    ):(
                      <img className='img-fluid card_image' alt='blog_image' src={process.env.PUBLIC_URL+'/images/no_image.png'}/>
                    )
                  }
                </div> 
                <div className="col-12 mt-2">
                    <h4 className='title mb-md-4 mb-2 text-dark text-truncate'>{data.title}</h4>
                    <h6 className='card-text mb-mb-4 text-truncate text-gray1'>{data.description}</h6>
                    <div className="d-flex">
                      <small className="d-inline-block me-2 text-truncate">#{Get_topic(data.topic_id)} </small>
                      <small className="d-inline-block mx-2 text-truncate">#{Get_category(data.category_id)} </small>
                      <small className="d-inline-block mx-2 text-truncate">#{Get_industry(data.industry_id)}</small>
                    </div>
                    <div className="col-12">
                    <small className='text-gray2'> {formatted_date(data.created_on)}</small>
                    </div>
                </div> 
                </div>
                </div>
                <div className="dropdown position-absolute top-0 end-0">
                  <button className="btn p-0 m-0 me-1 mt-1" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={process.env.PUBLIC_URL+'/images/settings.png'} className='img-fluid icons'/>
                  </button>      
                  <ul className="dropdown-menu">
                    <li><Link to={`edit_blog/${data.id}`} className="dropdown-item" href="#">Update</Link></li>
                    {
                      data.status == 0 ? (
                        <li onClick={()=>{Switch_status(data.id,1)}}><div className="dropdown-item">Enable</div></li>
                      ):(
                        <li onClick={()=>{Switch_status(data.id,0)}}><div className="dropdown-item">Disable</div></li>
                      )
                    }
                    <li onClick={()=>confirmmessage(data.id)}><div className="dropdown-item">Delete</div></li>
                  </ul>
                </div>

                </div>
           
            </Link>
        ))
        ):(
          <h4 className='container d-flex justify-content-center align-items-center text-gray2'>No Blogs found</h4>
        )
      
      }
      </div>

        <div className={`d-${view=='List'?'':'none'}`} style={{minWidth:'100%',maxWidth:'100%',minHeight:'50vh'}}>

        {
          blogs && blogs.length>0?(
            <table className=' position-relative' style={{minHeight:'100%'}}>
            <thead className=''>
              <tr>
              <th className='px-4'>Title</th>
              <th className='px-4'>Descripiton</th>
              <th className='px-4'>Content</th>
              <th className='px-4'>Topic</th>
              <th className='px-4'>Category</th>
              <th className='px-4'>Industry</th>
              <th className='px-4'>Settings</th>
              </tr>
            </thead>
        <tbody>
          {
            blogs.map((data,i)=>(
              <tr key={i} className={`bg-${data.status==0?'light':'pearl'} align-middle position-relative `}>
                <td className='px-4'>{data.title}</td>
                <td className='px-4'>{data.description}</td>
                <td className='px-4' dangerouslySetInnerHTML={{__html:data.content}}></td>
                <td className='px-4'>{Get_topic(data.topic_id)}</td>
                <td className='px-4'>{Get_category(data.category_id)}</td>
                <td className='px-4'>{Get_industry(data.industry_id)}</td>
                <td className='text-center'><><div className="dropdown">
                  <button className="btn p-0 m-0 me-1 mt-1" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={process.env.PUBLIC_URL+'/images/settings.png'} className='img-fluid icons'/>
                  </button>      
                  <ul className="dropdown-menu">
                    <li><Link to={`edit_blog/${data.id}`} className="dropdown-item" href="#">Update</Link></li>
                    {
                      data.status == 0 ? (
                        <li onClick={()=>{Switch_status(data.id,1)}}><div className="dropdown-item">Enable</div></li>
                      ):(
                        <li onClick={()=>{Switch_status(data.id,0)}}><div className="dropdown-item">Disable</div></li>
                      )
                    }
                    <li onClick={()=>confirmmessage(data.id)}><div className="dropdown-item">Delete</div></li>
                  </ul>
                </div></></td>
              </tr>
               ))  
            }
                      </tbody>
                      </table>
                      
       
          ):(
            <h4 className='container d-flex justify-content-center align-items-center text-gray2'>No Blogs found</h4>

          )
        
        }

        </div>
        </>
    )
  }
     <div className="container-fluid mt-2 d-flex align-items-center justify-content-center">
    <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"."}
          pageCount={total_count/10}
          marginPagesDisplayed={3}
          pageRangeDisplayed={2}
          onPageChange={Fetch}
          containerClassName={
            "pagination scroll align-self-center align-items-center"
          }
          pageClassName={"page-item text-charcoal"}
          pageLinkClassName={
            "page-link text-decoration-none text-charcoal border-charcoal rounded-1 mx-1"
          }
          previousClassName={"btn button-charcoal-outline me-2"}
          previousLinkClassName={"text-decoration-none text-charcoal"}
          nextClassName={"btn button-charcoal-outline ms-2"}
          nextLinkClassName={"text-decoration-none text-charcoal"}
          breakClassName={"d-flex mx-2 text-charcoal fw-bold fs-4"}
          breakLinkClassName={"text-decoration-none text-charcoal"}
          activeClassName={"active "}
        />

    </div>
</div>
 
    </div>
  
  )
}

export default Blogs