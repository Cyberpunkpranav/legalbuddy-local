import React ,{useState,useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom'
import { Add_New_clause } from '../../../../../api/admin/post_apis'
import toast from 'react-hot-toast'

const New_clause = () => {

  const [data,setdata] = useState({
    search:'',
    limit:12,
    offset:0
  })
  const [reqdata1,setreqdata1]=  useState({
    clause_name:'',
    definition:''
  })
const postdata = async()=>{
  const data =  await Add_New_clause(reqdata1)
  if(data.data.status==true){
    toast.success(data.data.message)
    setreqdata1({
      clause_name:'',
      definition:''
    })
  }else{
    toast.error(data.data.message)
  }
}

  return (
    <div className={`container mt-4 position-relative`}>
      <Link to='../Admin/services/libraries/clauses'><img src={process.env.PUBLIC_URL+'/images/back.png'} className='img-fluid icons'/></Link>
      <h5 className='text-center'>Create New Clause Schema</h5>
      <div className="col-12 mt-4">
      <label>Clause Name</label>
        <input className='form-control' value={reqdata1.clause_name?reqdata1.clause_name:""} onChange={(e)=>setreqdata1(prevState=>({...prevState,clause_name:e.target.value}))}/>
      </div>
      <div className="col-12 mt-4">
      <label>Definition</label>
        <input className='form-control' value={reqdata1.definition?reqdata1.definition:""} onChange={(e)=>setreqdata1(prevState=>({...prevState,definition:e.target.value}))}/>
      </div>
      <div className="col-12 mt-4">
        <button className ='btn bg-blue1 text-white' onClick={()=>postdata()}>Create</button>
      </div>
    </div>

  )
}

export default New_clause


