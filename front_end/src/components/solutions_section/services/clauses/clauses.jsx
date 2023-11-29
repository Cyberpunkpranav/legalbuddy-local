import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetClauses } from '../../../../api/user/get_apis' 
import '../../../../css/user/clauses/clauses.css'
import toast from 'react-hot-toast'

const Clauses = () => {
  const [req,setreq] = useState({
    search:'',
    limit:12,
    offset:0
  })
  const[loading,setloading] = useState(false)
  const [data,setdata] = useState([])
  const Fetch=async()=>{
    setloading(true)
    const Data = await GetClauses(req)
    setdata(Data.data.data)
    setloading(false)

  }
  useEffect(()=>{
    return()=>Fetch()
  },[])
  
  return (
    loading ?(
      <div className="loader">
      <div className="container  d-flex align-items-center">
      <strong role="status">Loading...</strong>
      <div className="spinner-border ms-auto" aria-hidden="true"></div>
    </div>
    </div>
    ):(    <div className='position-relative'>
    <div className="container search bg-gray4 mt-4 py-4 position-sticky top-0 start-0 end-0">
    <Link to='../Solutions' className='position-absolute top-0 start-0 mt-1' style={{marginLeft:'-2rem'}}><img src={process.env.PUBLIC_URL+'/images/back.png'} className='img-fluid icons'/></Link>
      <div className=" row justify-content-center ">
        <div className="col-8 position-relative">
        <input className='form-control py-1' placeholder='search clauses...' value={req.search?req.search:''} onChange={(e)=>{setreq(prevState=>({...prevState,search:e.target.value}))}}/>
    <button className='btn p-0 m-0 position-absolute top-0 end-0 me-3' onClick={()=>{Fetch()}}><img src={process.env.PUBLIC_URL+'/images/search.png'} className='img-fluid icons'/></button>
        </div>

    </div>
    </div>
    {
      <div className="container">
        <div className="row">
        {
          data!==undefined && data.length!=0?(
            data!=undefined&& data.map((data)=>(
              <Link to={`view/${data.id}`} className="col-lg-4 col-md-6 col-12 text-decoration-none">
              <div className="card my-4">
                <div className="card-body">
                  <h5 className="card-title text-blue1 text-truncate">{data.clause_name}</h5>
                  <p className="card-text text-gray1 text-truncate">{data.definition}</p>
                </div>
              </div>
              </Link>
            ))
          ):(
            <div className="container text-center justify-content-center d-flex align-items-center fw-semibold text-gray2" style={{height:'50vh'}}>No Clauses found</div>
          )

      }
    </div>
    </div>
    }
  </div>)

  )
}

export default Clauses