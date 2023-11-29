import React ,{ Fragment, lazy, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Cookies from 'js-cookie';
import '../../css/user/blogs/blogs.css'
const Default_blogs = lazy(()=>import('./default_blogs'))
const Blog_by_search = lazy(()=>import('./blog_by_search'))

function Blogs() {
  const [searchparam,setsearchparam] = useSearchParams()
  const [search,setsearch] = useState(false)
  const [searchview,setsearchview] = useState(false)
  const [topic_id, settopic_id] = useState('');
  const [category_id, setcategory_id] = useState('');
  const [industry_id, setindustry_id] = useState('');
  const [limit,setlimit] = useState(12)
  const [all,setall] = useState(1)
  const [offset,setoffset] = useState(0)
  const [page,setpage] = useState(1)

  const types= JSON.parse(Cookies.get('types')) 
  useEffect(()=>{
    setsearchparam()
  },[])

    const set_values = ()=>{
      setsearchparam({search:search})
      if(searchview == false){
        setsearchview(true)
      }
    }
  return (
    <Fragment>
    <section className="blog_nav bg-transparent position-sticky top-0 py-2">
    <div className="container mt-1 d-flex justify-content-center">
      <div className="col-8 position-relative">
        <button className='btn btn-sm p-0 m-0 mt-1 me-2 position-absolute end-0' onClick={(e)=>{set_values()}}><img src={process.env.PUBLIC_URL+'/images/search.png'} className='img-fluid icons'/></button>
      <input value={search?search:''} onChange={(e)=>{setsearch(e.target.value);}} className='form-control rounded-pill' placeholder='search blogs...'/>
      </div>
    </div>
    </section>
    {
      searchview ? (
        <></>
      ):(  <div className=" ms-3 scroll mt-3 px-3"> 
      <div className="d-flex align-self-center"> 
              <div className="col-auto">
              <button className={`btn btn-sm p-0 m-0 mx-2 px-2 py-1 text-${all == 1 ? "white" : "charcoal" } bg-${all == 1 ? "blue1" : "pearl" } rounded-2`} 
              onClick={() => { settopic_id('');setcategory_id('');setindustry_id('');setall(1);setoffset(0);setpage(1) }} > All </button>
              </div>
              <div className="col-auto">
                  {types !=undefined && types.topics !=undefined && types.topics.map((data, i) => (
                    <button key={i} className={`btn btn-sm p-0 m-0 px-2 py-1 mx-2 text-${topic_id == data.id ? "white" : "charcoal" } bg-${topic_id == data.id ? "blue1" : "pearl" } rounded-2 p-2`} 
                    onClick={() => { settopic_id(data.id);setcategory_id('');setindustry_id('');setall('');setoffset(0);setpage(1) }} > {data.topic_name} </button>
                  ))}
              </div>
                <div className="col-auto">
                  {types !=undefined && types.categories !=undefined && types.categories.map((data, i) => (
                    <button key={i} className={`btn btn-sm p-0 m-0 px-2 py-1 mx-2 text-${category_id == data.id ? "white" : "charcoal" } bg-${category_id == data.id ? "blue1" : "pearl" } rounded-2 p-2`} 
                    onClick={() => { setcategory_id(data.id);settopic_id('');setindustry_id('');setall('');setoffset(0);setpage(1) }} > {data.category_name} </button>
                  ))}
                </div>
                  <div className="col-auto">
                  {types!=undefined && types.industry !=undefined && types.industry.map((data, i) => (
                    <button key={i} className={`btn btn-sm p-0 m-0 px-2 py-1 mx-2 text-${industry_id == data.id ? "white" : "charcoal" } bg-${industry_id == data.id ? "blue1" : "pearl" } rounded-2 p-2`} 
                    onClick={() => { setindustry_id(data.id);settopic_id('');setcategory_id('');setall('');setoffset(0);setpage(1) }} > {data.industry_name} </button>
                  ))}
                </div> 
      </div>
      </div>)
    }
  
    <section className="position-relative blog_section px-3">
    {
      searchview ? (
        <Blog_by_search search={search} setpage={setpage} searchparam={searchparam} limit={limit} offset={offset} searchview={searchview} settopic_id={settopic_id} setindustry_id={setindustry_id} setcategory_id={setcategory_id} category_id={category_id} setlimit={setlimit} setall={setall} setoffset={setoffset}/>
      ):(
        <Default_blogs topic_id={topic_id} settopic_id={settopic_id} category_id={category_id} setcategory_id={setcategory_id} industry_id={industry_id} setindustry_id={setindustry_id} page={page} setpage={setpage} limit={limit} offset={offset} setlimit={setlimit} setoffset={setoffset} setall={setall} />
      )
    }
    </section>
    </Fragment>
  );
}

export default Blogs