import React from 'react'
import { Link } from 'react-router-dom'
const Solutions = () => {
  return (

    <div className='container position-relative mt-4'>
     <nav className=''>
       <div className="nav  border-0" id='nav-tab' role="tablist">
           <button className={`nav-link btn bg-white active me-3`} id={`nav-1-tab`} data-bs-toggle="tab" data-bs-target={`#nav-1`} type="button" role="tab" aria-controls={`nav-1`} aria-selected="true">Products</button>
           <button className={`nav-link btn bg-white`} id={`nav-2-tab`} data-bs-toggle="tab" data-bs-target={`#nav-2`} type="button" role="tab" aria-controls={`nav-2`} aria-selected="true">Services</button>
       </div>
     </nav>
  <div className="tab-content" id="nav-tabContent">
    <div className={`tab-pane fade show active `} id={`nav-1`} role="tabpanel" aria-labelledby={`nav-1-tab`} tabindex={`0`}>
    <div className="container">
                <div className="container mt-4">
      
                </div>
            </div>
    </div>
    <div className={`tab-pane fade show `} id={`nav-2`} role="tabpanel" aria-labelledby={`nav-2-tab`} tabindex={`0`}>
                <div className="row pb-4 mt-1 g-4">
                        <h5 className=''>Applications</h5>
                        <div className="col-auto">
                        <Link to='./services/contract_and_lifecycle_management' className='text-dark text-decoration-none'><button className="btn btn-lg border-blue10 text-dark bg-blue13 fw-bold"><img src={process.env.PUBLIC_URL+'/images/CLM.png'} alt='...' className='img-fluid icons bg-white rounded-3 p-2 mx-2' style={{boxSizing:'content-box'}}/><h6 className='d-inline'>Contract LifeCycle Mangement</h6></button></Link>
                        </div>
                        <div className="col-auto">
                        <Link to='./services/governance_risk_and_compliance' className='text-dark text-decoration-none'><button className="btn btn-lg border-blue10 text-dark bg-blue13 fw-bold"><img src={process.env.PUBLIC_URL+'/images/GRC.png'} alt='...' className='img-fluid icons bg-white rounded-3 p-2 mx-2' style={{boxSizing:'content-box'}}/><h6 className='d-inline'>Governance Risk and Compliance</h6></button></Link>
                        </div>
                    </div>            
                    <div className="row pb-4 mt-1 g-4">
                        <h5 className=''>Libraries</h5>
                        <div className="col-auto">
                        <Link to='./services/libraries/clauses' className='text-dark text-decoration-none'><button className="btn btn-lg border-blue10 text-dark bg-blue13 fw-bold"><img src={process.env.PUBLIC_URL+'/images/clauses.png'} alt='...' className='img-fluid icons bg-white rounded-3 p-2 mx-2' style={{boxSizing:'content-box'}}/><h6 className='d-inline'>Clauses</h6></button></Link>
                        </div>
                        <div className="col-auto">
                        <Link to='./services/libraries/resolutions' className='text-dark text-decoration-none'><button className="btn btn-lg border-blue10 text-dark bg-blue13 fw-bold"><img src={process.env.PUBLIC_URL+'/images/resolutions.png'} alt='...' className='img-fluid icons bg-white rounded-3 p-2 mx-2' style={{boxSizing:'content-box'}}/><h6 className='d-inline'>Resolutions</h6></button></Link>
                        </div>
                    </div>
                    <div className="row pb-4 mt-1 g-4">
                        <h5 className=''>Acts and Rules</h5>
                        <div className="col-auto">
                        <Link to='./services/acts_and_rules/acts' className='text-dark text-decoration-none'><button className="btn btn-lg border-blue10 text-dark bg-blue13 fw-bold"><img src={process.env.PUBLIC_URL+'/images/act.png'} alt='...' className='img-fluid icons bg-white rounded-3 p-2 mx-2' style={{boxSizing:'content-box'}}/><h6 className='d-inline'>Acts</h6></button></Link>
                        </div>
                        <div className="col-auto">
                        <Link to='./services/libraries/resolutions' className='text-dark text-decoration-none'><button className="btn btn-lg border-blue10 text-dark bg-blue13 fw-bold"><img src={process.env.PUBLIC_URL+'/images/rule.png'} alt='...' className='img-fluid icons bg-white rounded-3 p-2 mx-2' style={{boxSizing:'content-box'}}/><h6 className='d-inline'>Rules</h6></button></Link>
                        </div>
                    </div>

    </div>

  </div>
</div>
  )
}

export default Solutions