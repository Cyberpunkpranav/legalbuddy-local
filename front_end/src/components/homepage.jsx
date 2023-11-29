import React ,{useEffect,useRef,useState} from 'react'
import toast from 'react-hot-toast'
import gsap from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

import { useNavigate,Link } from 'react-router-dom'
import '../css/homepage.css'
gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const mainref = useRef(null);
  const titleref = useRef(null);

  useEffect(() => {
    let el = mainref.current;
    let el2 = titleref.current;
  
    gsap.fromTo(
      el,
      {
        scrollTrigger: el,
        x: -800,
        duration: 1,
      },
      {
        scrollTrigger: el,
        x: 0,
        duration: 1,
      }
    );
    gsap.fromTo(
      el2,
      {
        scrollTrigger: el2,
        x: 800,
        duration: 1,
      },
      {
        scrollTrigger: el2,
        x: 0,
        duration: 1,
      }
    );
  }, []);
  return (
  <>
<div className="container-fluid p-0 m-0 mainsection align-items-center justify-content-center">
        <div className=" background d-flex mx-auto justify-content-center align-items-center ">
          <div className="container d-flex justify-content-center mb-5 p-0 m-0 align-items-center position-relative">
            <div className="row p-0 m-0 text-light justify-content-center section_content">
              <div ref={mainref} className="col-4 text-end align-middle  ">
                <h5 className="">We </h5>
                <h5 className="">Are</h5>
                <h5 className="">Your</h5>
              </div>
              <div ref={titleref} className="col-8 main-1">
                <h1 className=" fw-bold d-flex ">
                  LEGAL
                </h1>
                <h1 className=" fw-bold">BUDDY</h1>
              </div>
              <p className="text-center text-gray1 mt-4">
              Developing Digital Enterprise Capabilities For Addressing Legal
              and Compliance Challenges
            </p>
            <button className='btn w-auto learnmore text-center'>Know About Us</button>
            </div>
             <img className=' position-absolute mx-auto bg_svg' src={process.env.PUBLIC_URL +'/images/bg_1.svg'}/>
          </div>
        </div>
      </div>
</>
  )
}

export default Homepage