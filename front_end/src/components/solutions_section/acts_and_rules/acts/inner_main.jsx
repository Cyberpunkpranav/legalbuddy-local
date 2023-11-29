import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { GetSubSections_By_Section,GetClauses_By_Section,GetSubClauses_By_Section } from '../../../../api/user/get_apis';
import toast from 'react-hot-toast';
import jwt_decode from 'jwt-decode';

const Inner_main = ({act,chapter,section,token}) => {
    const decodedToken = token ? jwt_decode(token,'section_token'):""
    const[data,setdata] = useState([])
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
        
    useEffect(()=>{
        return(()=>{
            SubSections()
        })

    },[])
    const replace_space=(word)=>{
      word =  word.replaceAll('%20',' ')
      return word 
    }
    // console.log(token,data);
  return (
    <>
    <section className='container-fluid inner_main position-relative'>
    <h3 className='text-center text-gray1 '>{replace_space(act)}</h3>
    <h4 className='text-center mt-2 text-gray1 fw-normal'>{replace_space(chapter)} </h4>
    <h5 className='text-center mt-2 text-gray1 fw-normal'>{replace_space(section)} </h5>
        {
            loading ? (
                <div>loading</div>
            ):( 
                    data!=undefined && data.length>0?(
                        <>
                        {
                        data.map((Data,i)=>(
                            <div key={i}>
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

                                
            )
        }

</section> 
</>
  )
}

export default Inner_main