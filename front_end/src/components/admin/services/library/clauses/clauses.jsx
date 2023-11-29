import React, { useState,useEffect } from 'react'
import { Get_Clauses } from '../../../../../api/admin/get_apis'
import { Link } from 'react-router-dom'

const Clauses = () => {
  const [data,setdata] = useState({
    search:'',
    limit:12,
    offset:0
  })

  const [clauses,setclauses] = useState([])
  const fetch = async()=>{
    const Data =  await Get_Clauses(data)
    setclauses(Data.data.data)
  }
  useEffect(()=>{
   return()=>fetch()
  },[])
  return (
    <section className='container position-relative mt-4'>
      <Link to='../Admin' className='position-absolute start-0 top-0'><img className='icons img-fluid' src={process.env.PUBLIC_URL+'/images/back.png'}/></Link>
      <h4 className='text-center fw-semibold'>Clauses</h4>
      <div className="container position-relative mt-4">
        <div className="col-10 p-0 m-0 position-relative">
        <input className='form-control' placeholder='search clauses' value={data.search?data.search:''} onChange={(e)=>setdata(prevState=>({...prevState,search:e.target.value}))}/>
        <button className='btn p-0 m-0 position-absolute end-0 top-0 mt-1 me-1' onClick={()=>fetch()}><img className='icons img-fluid' alt='...' src={process.env.PUBLIC_URL+'/images/search.png'}/></button>
        </div>
        <div className="col-2">
        <Link to='./new' className='position-absolute top-0 end-0 btn btn-blue1 text-white'>+ New Clause </Link>
        </div>
      </div>

          {
            clauses && clauses.length>0 ?(
              <table className='table mt-4 align-middle'>
              <thead>
                <tr>
                  <th>Clause Name</th>
                  <th>Definition</th>
                  <th className='text-center'>Settings</th>
                </tr>
              </thead>
              <tbody>
                {
              clauses.map((data)=>(
                <tr>
                <td><Link to={`update/${data.id}`} className="text-decoration-none link" href="#">{data.clause_name}</Link></td>
                <td>{data.definition}</td>
                <td className='text-center'><><div className="dropdown">
                  <button className="btn p-0 m-0 me-1 mt-1" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={process.env.PUBLIC_URL+'/images/settings.png'} className='img-fluid icons'/>
                  </button>      
                  <ul className="dropdown-menu">
                    <li><Link to={`update/${data.id}`} className="dropdown-item" href="#">Update</Link></li>
                    {
                      data.status == 0 ? (
                        <li><div className="dropdown-item">Enable</div></li>
                      ):(
                        <li><div className="dropdown-item">Disable</div></li>
                      )
                    }
                    <li><div className="dropdown-item">Delete</div></li>
                  </ul>
                </div></></td>
              </tr>
              ))
              }
              </tbody>
              </table>
            ):(
              <tr className='container d-flex justify-content-center align-items-center text-gray2 fw-semibold'>No Clauses found</tr>
            )
          }

    </section>
  ) 
}

export default Clauses