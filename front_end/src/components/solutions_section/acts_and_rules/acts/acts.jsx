import React,{useContext, useEffect, useState} from 'react'
import { GetActs } from '../../../../api/user/get_apis'
import { Link } from 'react-router-dom'
import '../../../../css/user/acts/acts.css'
import { encryptID } from '../../../../security/crypto'

const Acts = () => {
  const [data,setdata]  = useState([])
  const [req,setreq] = useState({
    search:"",
  })  
  const Get_data = async()=>{
    const res  = await GetActs(req)
    setdata(res.data.data)
  }
  useEffect(()=>{
    return(()=>{
      Get_data()
    })
  },[])

  return (
    <section className='container-fluid mt-4 position-relative'>
      <img src={process.env.PUBLIC_URL+'/images/back.png'} onClick={()=>{window.history.back()}} className='icons cursor-pointer position-absolute top-0 start-0 ms-5'/>
      <h5 className='text-center py-4'>Acts</h5>
      <section className='act_nav py-2 position-sticky top-0'>
      <div className="container my-2 d-flex justify-content-center ">
        <div className="col-10 position-relative">
        <button className='btn p-0 m-0 position-absolute end-0 me-2'><img src={process.env.PUBLIC_URL+'/images/search.png'} className='img-fluid icons ' alt="" onClick={()=>{Get_data()}} /></button>
        <input type="text" className='form-control' placeholder='Search acts...' value={req.search?req.search:""} onBlur={()=>Get_data()} onChange={(e)=>setreq(prevState=>({...prevState,search:e.target.value}))} />
        </div>
      </div>
      </section>
      {/* <div className="scroll"> */}
      <div className="row justify-content-center g-4">
      {
        data && data.map((Data,i)=>(
          <div className="col-10" key={i}>
          <div className="card border-0 my-2">
          <h5 className="card-header border-0 ">{Data.act?Data.act:'NA'}</h5>
          <div className="card-body">
            <h6 className="card-title"><span className='me-1'>act number-</span>{Data.act_number?Data.act_number:'NA'}<span className='mx-2'>Of</span>{Data.act_year?Data.act_year:'NA'}</h6>
            <h6 className="card-title"><span className='me-1'>amendment-</span>{Data.amendment?Data.amendment:'NA'}</h6>
            <p className="card-text text-gray1 text-truncate">{Data.description?Data.description:'NA'}</p>
            <Link to={`../Solutions/services/acts_and_rules/acts/${Data.act}/${Data.token}`} className="text-decoration-none py-2 text-blue1">Chapters</Link>
          </div>
        </div>
        </div>
        ))
      }
    </div>
    {/* </div> */}
    </section>
  )
}

export default Acts