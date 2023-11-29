import React,{useState,useEffect,useRef} from 'react'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode'
import axios from '../api/axios'
import {GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { encryptNumber,encryptString } from '../security/crypto';
const Login = () => {
    const navigate = useNavigate()
    const[load,setload]=useState(false)
    const googlecreds = {
        username:'',
        email:'',
        email_verified:'',
        password:''
      }
      const [creds,setcreds]=useState({
        username:'',
        password:'',
      })
    
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
    
    const set_values=(user,pass)=>{
      setcreds({username:user,password:pass})
    }
    
    const login = ()=>{
        try{
          setload(true)
          axios.post(`/api/user/login`,creds).then((response)=>{
            if(response.data.status){
              toast.success(response.data.message);
              let user_id = encryptNumber(response.data.data.id)
              Cookies.set('accessToken',response.data.access_token)
              Cookies.set('user_id',user_id)
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
          toast.error(e.message);
        }
    }
  return (
    <div className="container mainapp align-items-center d-flex justify-content-center">
    <div className="row align-items-center p-0 m-0">
    <div className='signupsection bg-white container py-3 px-4 shadow-sm rounded-3 border w-50'>
      <img className='img-fluid d-flex mx-auto logo' src={process.env.PUBLIC_URL +'logo192.png'}/>
        <div className="row p-0 m-0">
        <div className="col-12 mx-auto text-center mt-4">
              <div className='d-inline-block'>
              <GoogleOAuthProvider clientId='238984833221-rc5s0bmt65pj6riarg9bd9lusvff3l24.apps.googleusercontent.com'>
              <GoogleLogin 
              onSuccess={responseMessage} 
              onError={errorMessage} 
              useOneTap={true} 
              size='medium'
              text='continue_with'
               />
              </GoogleOAuthProvider>
              </div>      
            </div>
            <div className="col-12 text-center my-2 text-charcoal75 position-relative">
              <hr className=''/>
            <small className='position-absolute top-0 start-0 end-0 bottom-0 align-items-center d-flex justify-content-center'><div className='bg-white px-2'>OR</div></small>
            </div>
            <div className="col-12 pb-1">
                <label htmlFor=''>Username or email</label>
                <input className='form-control' placeholder='username or email' type='text' value={creds.username?creds.username:''} onChange={(e)=>set_values(e.target.value,creds.password)}/>
            </div>
            <div className="col-12 pb-3 pt-1">
                <label htmlFor="">Password</label>
                <input className='form-control' value={creds.password?creds.password:''} onChange={(e)=>set_values(creds.username,e.target.value)} type='password' placeholder='password@123'/>
            </div>
            <div className="col-12 justify-content-center text-center d-flex mx-auto ">
              {
                load?(
                  <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                  </div>
                ):(
                  <button className='btn btn-light rounded-4 border'onClick={()=>login()}>Login</button>
                )
              }
            </div>
            <div className="col-12 text-center mt-2">
              <small>New to legalbuddy? <a href='' onClick={()=>{navigate('/Signup')}}>Signup</a> </small>
            </div>
     
        </div>  
    </div>
    </div>
    </div>
  )
}

export default Login