import React, { useState,useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Update_blogs } from '../../../api/admin/update_apis';
import { Get_Blog_by_Id } from '../../../api/admin/get_apis';
import { Get_filters } from '../../../api/commons/get_apis';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../../css/admin_panel/edit_blog.css'
import { image_path } from '../../../env';
import CK_Editor from '../../text_editor/ck_editor';
const Edit_Blog = () => {
  const navigate = useNavigate()
  const params = useParams();
  const { id } = params;
  const[ options,setoptions] = useState([])
  const [data,setdata] =useState({
    title:'',
    description:'',
    content:'',
    topic_id:'',
    category_id:'',
    industry_id:'',
    image_file:''
  })
  async function Fetch(){
    const data = await Get_Blog_by_Id(id)
    setdata({
      title:data.data[0].title,
      description:data.data[0].description,
      content:data.data[0].content,
      topic_id:data.data[0].topic_id,
      category_id:data.data[0].category_id,
      industry_id:data.data[0].industry_id,
      image:data.data[0].image
    })  
  }

  useEffect(()=>{
    Fetch()
  },[id])

    async function Update (){
      const formData = new FormData()
      formData.append('image',data.image_file)
      formData.append('title',data.title)
      formData.append('description',data.description)
      formData.append('content',data.content)
      formData.append('topic_id',data.topic_id)
      formData.append('category_id',data.category_id)
      formData.append('industry_id',data.industry_id)

      const Data = await Update_blogs(id,formData)
      
      if(Data.data.status = true){
        toast.success(Data.data.message)
        setTimeout(()=>{
          navigate('../Admin/blogs')
        },1000)
      }else{
        toast.error('Something went wrong, please try again.')
      }
    }
    // Update()
    async function Options (){
      const data = await Get_filters()
        setoptions(data.data.data)
    }
    useEffect(()=>{
      Options()
    },[])
  return (
    <div className='container-fluid edit_blog mt-4 position-relative'>
      <Link to='../Admin/blogs' className='text-decoration-none position-absolute top-0 start-0 ms-3 text-darks'><img src={process.env.PUBLIC_URL+'/images/back.png'} className='img-fluid icons'/></Link>
      <h4 className='text-dark fw-semibold d-flex justify-content-center'>Edit Blog</h4>
      <div className="container rounded-3 py-4 border mt-4 d-flex justify-content-center align-items-center" >
           <div className="row">
           <div className="col-12">
            <div className="row g-4 mt-2">
              <div className="row align-items-center">
                <div className="col-auto">
                <img className='img-fluid' style={{width:'20rem'}} src={image_path+data.image}/>

                </div>
                <div className="col-md-6 col-10">
                <h6>Choose new image</h6>
                <input onChange={(e)=>{setdata(prevState=>({...prevState,image_file:e.target.files[0]}))}} type='file' className='form-control'/>
                </div>
              </div>
              <div className="col-12">
                <h6>Title</h6>
                <textarea className='form-control' onChange={(e)=>setdata(prevState =>({...prevState,title:e.target.value}))}  maxLength={100} value={data.title?data.title:''}/>
              </div>
              <div className="col-12">
                <h6>Description</h6>  
                <textarea className='form-control' onChange={(e)=>setdata(prevState =>({...prevState,description:e.target.value}))} maxLength={100} value={data.description?data.description:""}/>
              </div>
              <div className="col-12">
                <h6>Content</h6>
                <CK_Editor data={data.content} setdata={setdata}/>
                {/* <textarea className='form-control' onChange={(e)=>setdata(prevState =>({...prevState,content:e.target.value}))} maxLength={200} value={data.content?data.content:""}/> */}
              </div>
            </div>
            </div>
            <div className="col-12 mt-4">
            <div className="row gy-md-0 gy-3">
        <div className="col-md-4 col-10">
        <select class="form-select" value={data.topic_id?data.topic_id:""} onChange={(e)=>setdata(prevState =>({...prevState,topic_id:e.target.value}))} aria-label="Default select example">
  <option selected>Topics</option>
  {
    options && options.topics&& options.topics.map((data)=>(
      <option  value={data.id}>{data.topic_name}</option>

    ))
  }
</select>
        </div>
        <div className="col-md-4 col-10 ">
        <select class="form-select" value={data.category_id?data.category_id:''} onChange={(e)=>setdata(prevState =>({...prevState,category_id:e.target.value}))} aria-label="Default select example">
  <option selected>Categories</option>
  {
    options && options.categories && options.categories.map((data)=>(
      <option value={data.id}>{data.category_name}</option>

    ))
  }
</select>
        </div>
        <div className="col-md-4 col-10">
        <select class="form-select" value={data.industry_id?data.industry_id:''} onChange={(e)=>setdata(prevState =>({...prevState,industry_id:e.target.value}))} aria-label="Default select example">
  <option selected>Industry</option>
  {
    options && options.industry&& options.industry.map((data)=>(
      <option value={data.id}>{data.industry_name}</option>
    ))
  }
</select>
        </div>
          </div>
            </div>
            <div className="col-12">
      <div className="row mt-4">
        <div className="col-auto">
          <button className='btn btn-blue1 text-white' onClick={()=>{Update()}}>Update</button>
        </div>
        <div className="col-auto">
          <button className='btn btn-pearl border'onClick={()=>Fetch()}>Cancel</button>
        </div>
      </div>
      </div>
          </div>
       
    </div>
    </div>
  )
}

export default Edit_Blog