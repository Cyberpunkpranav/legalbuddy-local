import React, { Fragment } from 'react'
import '../css/admin_panel/blogs.css'
import { Link } from 'react-router-dom'
const Admin = () => {
  return (
    <Fragment>
    <h3 className='text-dark fw-semibold text-center my-4'>Administration Wizard</h3>
    <div className='container admin mt-4'>
    <h4 className='text-center my-4 text-gray1'>Blogs & News</h4>
      <div className="row justify-content-start">
        <div className="col-6 col-md-5 col-lg-4">
          <Link to='./blogs' className='text-decoration-none text-dark'>
        <div className="card border-0 text-dark">
      <div className="card-body">
        <h5 className="title">Blogs</h5>
        <p className='text-gray1'>Customise blogs in the website</p>
      </div>
    </div>
    </Link>
        </div>
        <div className="col-4">
        <div className="card border-0 ">
      <div className="card-body">
        <h5 className="title">News</h5>
        <p className='text-gray1'>Customise news in the website</p>
      </div>
    </div>
        </div>
      </div>

      <section className='container mt-4'>
        <h4 className='text-center my-4 text-gray1'>What we Provide</h4>
        <h5 className='mt-4'>Products</h5>
        <div className="row mb-4">
          <div className="col-auto">
            <Link to='' className='text-decoration-none'>
            <div className="card border-0">
                <div className="card-body">
                  <h5 className="text-title text-dark">coming soon....</h5>
                  <p className='text-gray1'>Coming soon...</p>
                </div>
            </div>
            </Link>
          </div>
        </div>
        <h5 className='mt-4'>Services</h5>
        <div className="row ">
          <div className="col-auto">
            <Link to='./services/libraries/clauses' className='text-decoration-none'>
            <div className="card border-0">
                <div className="card-body">
                  <h5 className="text-title text-black">Clauses</h5>
                  <p className='text-gray1'>Customise clauses in the website</p>
                </div>
            </div>
            </Link>
          </div>
        </div>
        <h5 className='mt-4'>Acts & Rules</h5>
        <div className="row ">
          <div className="col-auto">
            <Link to='./acts' className='text-decoration-none'>
            <div className="card border-0">
                <div className="card-body">
                  <h5 className="text-title text-black">Acts</h5>
                  <p className='text-gray1'>Customise acts in the website</p>
                </div>
            </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </Fragment>
  )
}

export default Admin