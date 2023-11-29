import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from '../api/axios'
import Notiflix from 'notiflix';
import {encryptNumber, encryptString } from '../security/crypto';
import {Link,NavLink,useNavigate } from 'react-router-dom'
import { userData } from '../security/decryption';
import '../css/navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const [popup,setpopup]=useState('block')
  const[load,setload]=useState(false)
  const logout = ()=>{
    Cookies.remove('accessToken')
    Cookies.remove('user_id')
    Cookies.remove('username')
    Cookies.remove('blog_view')
    toast.success('Logged out')
    window.location.reload()
  }
 
  const responseMessage = async(response) => {
    const decoded_creds = jwt_decode(response.credential)
    const googlecreds = {
      username:decoded_creds.name,
      email:decoded_creds.email,
      email_verified:decoded_creds.email_verified,
      password:decoded_creds.sub,
    }
    try{
      setload(true)
       axios.post(`/api/user/google/login`,googlecreds).then((response)=>{
        if(response.data.status){
          toast.success(response.data.message);
          let user_id = encryptNumber(response.data.data.id)
          let username = encryptString(response.data.data.username)
          Cookies.set('accessToken',response.data.access_token)
          Cookies.set('user_id',user_id)
          Cookies.set('username',username)
          window.location.reload()
          setTimeout(() => {
            navigate('/')
          }, 1000);
        }else{
          toast.error(response.data.message);
        }
        setload(false)
      })
    }catch(e){
      setload(false)
      toast.error(e.message)
    }
}
const errorMessage = (error) => {
  toast.error(error);
} 


const toggle_popup=()=>{
if(popup=='none'){
  setpopup('block')
}
if(popup=='block'){
  setpopup('none')
}
}


  // console.log(userData) 
  return (
    <>
    <nav className="navbar mx-5 mt-2 position-sticky start-0 end-0 shadow-sm px-3 top-0 bg-white navbar-expand-lg">
    <div className="container-fluid">
      <Link to='/' className="navbar-brand" ><img src={process.env.PUBLIC_URL + '/images/logo_light.png'} className='img-fluid logo'/>  </Link>
      <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item px-2">
            <NavLink to='/' className="nav-link rounded-2 ps-sm-2 ps-2" aria-current="page" >Home</NavLink>
          </li>
          <li className="nav-item px-2">
            <NavLink to='Blogs' className="nav-link ps-sm-2 ps-2" >Blogs & News</NavLink>
          </li>
          <li className="nav-item px-2">
            <NavLink to='Solutions' className="nav-link ps-sm-2 ps-2" >What we provide</NavLink>
          </li>
          <li className="nav-item px-2">
            <NavLink to='Team' className="nav-link ps-sm-2 ps-2" > Our Team</NavLink>
          </li>
          <li className="nav-item px-2">
            <NavLink to='know_us' className="nav-link ps-sm-2 ps-2" >Know us</NavLink>
          </li>
          <li className="nav-item px-2 d-flex align-items-center rounded-2">
            {
              userData.username !=undefined ? (
              <div className="dropdown">
                <button className="btn btn-sm dropdown-toggle text-truncate" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {userData.username?userData.username:''}
              </button>
                <ul className="dropdown-menu shadow">
                <li><Link to='Admin' className="dropdown-item"><img className='img-fluid icons me-1' src={process.env.PUBLIC_URL+'/images/admin_panel.png'}/>Admin panel</Link></li>
                <li><a className="dropdown-item" href="#"><img className='img-fluid icons me-1' src={process.env.PUBLIC_URL+'/images/settings.png'}/>settings</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li className='bg-transparentred1'><a className='dropdown-item '  href="#" onClick={()=>logout()}><img className='img-fluid icons me-1' src={process.env.PUBLIC_URL+'/images/logout.png'}/>Logout</a></li>
                </ul>
              </div>
              ):(
                <div className="dropdown dropstart">
                  <button className="btn text-blue1 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    login
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link to='Login' className="dropdown-item border-bottom py-2" href="#">login</Link></li>
                    <li><Link to='Signup' className="dropdown-item border-bottom py-2" href="#">Signup</Link></li>
                    <li><a className="dropdown-item" href="#">
                    <div className="col-auto">
                    <GoogleOAuthProvider clientId='238984833221-rc5s0bmt65pj6riarg9bd9lusvff3l24.apps.googleusercontent.com'>
                            <GoogleLogin 
                            onSuccess={responseMessage} 
                            onError={errorMessage} 
                            useOneTap={userData.accessToken?false:true} 
                            size='large'
                            text='continue_with'
                             />
                    </GoogleOAuthProvider>
                      </div></a></li>
                  </ul>
                </div>
              )
            }
          </li>
        </ul>
      </div>
    </div>
    {/* <div className={`d-${userData.accessToken?'none':'block'}`}>
    <div className={`slider d-${popup} top-100 mt-2 bg-white shadow position-absolute rounded-3`} >
      <div className="position-relative py-4 ps-2 pe-4">
      <button className='btn btn-sm btn-close p-0 m-0 position-absolute top-0 p-2 end-0' onClick={()=>toggle_popup()}></button>
      <div className="row align-items-center justify-content-center me-3 ">
        <div className="col-2 d-flex justify-contebnt-center align-items-center">
        <img src={process.env.PUBLIC_URL + '/logo512.png'} className='img-fluid icons'/>
        </div>

      </div>
  
      </div>
    </div>
    </div> */}
  </nav>
  {/* <div className="container-fluid"style={{height:'10vh'}}></div> */}
  </>
  )
}

export default Navbar