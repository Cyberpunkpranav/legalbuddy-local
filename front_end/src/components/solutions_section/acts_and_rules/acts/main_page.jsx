import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { GetSubSections_By_Section,GetClauses_By_Section,GetSubClauses_By_Section } from '../../../../api/user/get_apis';
import Sections from './sections';
import Chapters from './chapters';
import Inner_main from './inner_main'
import toast from 'react-hot-toast';
import jwt_decode from 'jwt-decode';

const Main_page = () => {
    const {act,chapter,section,token} = useParams()
    console.log(act,chapter,section,token);
    const decodedToken = jwt_decode(token,'section_token')
    const[data,setdata] = useState([])
    const[Params,setParams] = useState(null)
    const [loading,setloading] = useState(false)
    const req = ({
        act_id:decodedToken.act_id,
        chapter_id:decodedToken.chapter_id,
        section_id:decodedToken.id
    })

    const SubSections = async()=>{
    setloading(true)
    let Data;
    let subsections ;
    let clauses;
    let subclauses;
    const data = await GetSubSections_By_Section(req)
    if(data!==undefined && data.data.status == true){
        subsections =data.data.data
        clauses = await Clauses()
        subclauses = await SubClauses()
        Data = await insertObjects(subsections,clauses,subclauses)
        setdata(Data)
    }else{
        toast.error('please refresh and try again')
    }
    setloading(false)
    }
   async function insertObjects(subsections, clauses, subclauses) {
        for(let i=0;i<subsections.length;i++){
            let clause = []
            if(clauses !==undefined && clauses.length>0){
            for( let j=0;j<clauses.length;j++){
                if(subsections[i].id == clauses[j].subsection_id){
                    clause.push(clauses[j])
                }
            }
            subsections[i] = {...subsections[i],clause}
        }
        }
        for(let i=0;i<subsections.length;i++){
                for(let j = 0; j<subsections[i].clause.length; j++){
                    let subclause = []
                    if(subclauses !==undefined && subclauses.length>0){
                    for(let k=0;k<subclauses.length;k++){
                        if(subsections[i].clause[j].id == subclauses[k].clause_id){
                            subclause.push(subclauses[k])
                        }
                       
                    }
                }
                subsections[i].clause[j] = {...subsections[i].clause[j],subclause} 
        }
        }
        return subsections;
    }

    const Clauses = async()=>{
        const data = await GetClauses_By_Section(req)
        if(data!==undefined && data.data.status == true){
            return data.data.data
        }else{
            toast.error('please refresh and try again')
        }
        return data.data.data
    }
    const SubClauses = async()=>{
        const data = await GetSubClauses_By_Section(req)
        if(data!==undefined && data.data.status == true){
            return data.data.data
        }else{
            toast.error('please refresh and try again')
        }
        return data.data.data
    }
    const Get_link = ()=>{
        const link = window.location.href
        navigator.clipboard.writeText(link)
        toast.success('link copied')
    }

    useEffect(()=>{
        return(()=>{
            SubSections()
        })
    },[])
    const [selectedLink, setSelectedLink] = useState(null)


    const isEqual = (obj1, obj2) => {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    };
  
    const componentMap = {
        chapter: Chapters,
        section: Sections,
        subsections:Inner_main   
      };
      const parseLinkParameters = (link) => {
        let match = link.replace('http://localhost:3000/Solutions/services/acts_and_rules/acts/','');
       match =  match.split('/')
       if (match.length ==4) {
        return {
          act: match[0],
          chapter: match[1],
          section:match[2],
          token: match[3],
        };
      }
        if (match.length ==3) {
          return {
            act: match[0],
            chapter: match[1],
            token: match[2],
          };
        }
        if (match.length ==2) {
            return {
              act: match[0],
              token: match[1],
            };
          }
    }
   
      const getComponentForLink = (link) => {
        // Parse the link to extract parameters (:act, :chapter, :token)
        const params = parseLinkParameters(link);

        if (!isEqual(params, Params)) {
          setParams(params);
        }
   
        // Determine the type of content based on the presence of parameters
        const contentComponent = params.chapter && params.act && params.section && params.token? componentMap.subsections: params.chapter && params.act && params.token ? componentMap.section : params.act && params.token ? componentMap.chapter: '';

        return contentComponent;
      };
    
    const handleLinkClick = (event) => {
      const target = event.target;
      if (target.tagName.toLowerCase() === 'a') {
        event.preventDefault();
        const linkHref = target.getAttribute('href');
        setSelectedLink(linkHref);
      }
    };
    useEffect(()=>{
    },[])

  return (
  <>
    <section className='container-fluid mt-4 position-relative'>
    <img src={process.env.PUBLIC_URL+'/images/back.png'} onClick={()=>{window.history.back()}} className='icons cursor-pointer position-absolute top-0 start-0 ms-5'/>

        {
            loading ? (
                <div>loading</div>
            ):( 
                 <div className="row p-0 m-0">
                    
                    <div className={`col-${selectedLink?'6':'12'}`}>
                    <h3 className='text-center text-gray1 '>{act}</h3>
                    <h4 className='text-center mt-2 text-gray1 fw-normal'>{chapter} </h4>
                    <h5 className='text-center mt-2 text-gray1 fw-normal'>{section} <img className='img-fluid icons cursor-pointer ms-2 p-1' src={process.env.PUBLIC_URL+'/images/link.png'} alt='' onClick={()=>Get_link()}/></h5>
                    {
                    data!=undefined && data.length>0?(
                        <>
                        {
                        data.map((Data,i)=>(
                            <div onClick={handleLinkClick} key={i}>
                            <div className="row p-0 m-0 g-4 justify-content-center">
                            <div className="col-auto">{Data.subsection_number}</div>
                            <div  dangerouslySetInnerHTML={{__html:Data.subsection?Data.subsection:''}} className=' col-10 text-gray1'></div>
                           </div>
                           <div className="container-fluid p-0 m-0">
                           {
                            Data.clause.map((clause,j)=>(
                                <div key={j}>
                                <div className="row p-0 m-0 g-4 justify-content-center">
                                <div className="col-auto">{clause.clause_number}</div>
                                <div dangerouslySetInnerHTML={{__html:clause.clause?clause.clause:''}} className='col-10 text-gray1'></div>
                               </div>
                               <div className="container-fluid p-0 m-0">
                               {
                                clause.subclause.map((subclause,l)=>(
                                    <div key={l} className="row p-0 m-0 g-4 justify-content-center">
                                    <div className="col-auto">{subclause.subclause_number}</div>
                                    <div dangerouslySetInnerHTML={{__html:subclause.subclause?subclause.subclause:''}} className='col-10 text-gray1'></div>
                                   </div>
                                ))
                                }
                              </div>
                              </div>
                            ))
                            }
                            </div>                 
                            </div>
                        ))
                        }
                        </>
                    ):(<h5 className='mt-5 text-center'>No subsections found</h5>)
                    }
                    </div>
                    <div className="col-6 text-wrap">
                    {
                        selectedLink ? (    
                            <div>
                            {React.createElement(getComponentForLink(selectedLink), {
                            act: Params ?Params.act:'',
                            chapter: Params?Params.chapter:'',
                            section:Params? Params.section:'',
                            token: Params?Params.token:''
                          })}
                          </div>
                        ):(<></>)
                    }
                    </div>
                    </div>   
                    
                    
            )
        }

</section> 
</>
  )
}

export default Main_page