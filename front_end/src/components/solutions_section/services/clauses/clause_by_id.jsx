import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GetClausesById } from '../../../../api/user/get_apis'
import '../../../../css/user/clauses/clauses.css'
const Clause_by_id = () => {
    const{id} = useParams()
    const[data,setdata] = useState()
    const[loading,setloading] = useState(false)

    const Fetch_Clause=async()=>{
        setloading(true)
        const Data = await GetClausesById(id)
        setdata(Data.data)
        setloading(false)
    }

    useEffect(()=>{
      return()=> Fetch_Clause()
    },[])
  return (
    loading ? (
        <div className="loader">
        <div className="container  d-flex align-items-center">
        <strong role="status">Loading...</strong>
        <div className="spinner-border ms-auto" aria-hidden="true"></div>
      </div>
      </div>
    ):(
        <div className='container position-relative mt-4'>
          <Link to='../Solutions/services/libraries/clauses' className='position-absolute top-0 start-0 mt-1' style={{marginLeft:'-2rem'}}><img src={process.env.PUBLIC_URL+'/images/back.png'} className='img-fluid icons'/></Link>
        <h2>{data!=undefined?data.clause_name:""}</h2>
        <h5>{data!=undefined?data.definition:''}</h5>
        <nav className='mt-4'>
          <div className="nav nav-tabs" id='nav-tab' role="tablist">
            {
            data!=undefined && data.clauses.map((data,i)=>( 
              <button key={i} className={`nav-link ${i==0?'active':''}`} id={`nav-${data.id}-tab`} data-bs-toggle="tab" data-bs-target={`#nav-${data.id}`} type="button" role="tab" aria-controls={`nav-${data.id}`} aria-selected="true">{data.rationale?data.rationale:<i>insert rationale</i>}</button>
            ))
            }
          </div>
        </nav>
        <div className="tab-content bg-white p-5 border clause_alt scroll" id="nav-tabContent">
        {
            data!=undefined && data.clauses.map((data,i)=>( 
              <div key={i} className={`tab-pane ${i==0?'fade show active':''} `} id={`nav-${data.id}`} role="tabpanel" aria-labelledby={`nav-${data.id}-tab`} tabindex={`0`} dangerouslySetInnerHTML={{__html:data!=undefined?data.html:''}}></div>
            ))
        }
        </div>
    </div>
    )

  ) 
}

export default Clause_by_id