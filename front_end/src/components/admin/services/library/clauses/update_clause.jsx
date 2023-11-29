import React, { Fragment, startTransition, useEffect, useState, useTransition } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { Get_Clause_by_id } from '../../../../../api/admin/get_apis'
import { Update_Clause,Add_Clause_alternate } from '../../../../../api/admin/post_apis';
import {useParams} from 'react-router-dom'
import Notiflix from 'notiflix'
import toast from 'react-hot-toast';

const Update_clause = () => {
    const {id} = useParams()
    const [loading,startTransition] = useTransition()
    const [new_clause,setnew_clause]=useState('none')
    const [clause_btn,setclause_btn] = useState('block')
    const [data,setdata] = useState()
    const [clause_alt,setclause_alt] = useState()

    const editorConfiguration = {
      toolbar: {
        items: [
          'undo', 'redo',
          '|','highlight',
          '|', 'heading',
          '|',{
            label: 'fonts',
            icon:false,
            items: ['fontfamily','fontsize', 'fontColor', 'fontBackgroundColor'] 
        },
          '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
          '|', 'link', 'uploadImage','imageInsert', 'blockQuote', 'codeBlock','alignment',
          '|', 'bulletedList', 'numberedList',
          '|', 'outdent', 'indent','FindAndReplace'
      ],
      shouldNotGroupWhenFull: false
      }
    }
    const getData = async()=>{
      if(data==undefined){
        const Data = await Get_Clause_by_id(id)
        if(Data!=undefined && Data.data!=undefined){
         let arr =[]
          for(let i=0;i<Data.data.clauses.length;i++){
            let obj = {
              id:Data.data.clauses[i].id,
              clause_id:Data.data.clauses[i].clause_id,
              clause:Data.data.clauses[i].html?Data.data.clauses[i].html:'',
              rationale:Data.data.clauses[i].rationale,
              status:Data.data.clauses[i].status,
              file_name:Data.data.clauses[i].file_name,
              file_path:Data.data.clauses[i].file_path,
              created_on:Data.data.clauses[i].created_on,
              updated_on:Data.data.clauses[i].updated_on
            }
            arr.push(obj)
          }
          startTransition(()=>{
            let obj = {
              id:id,
              clause_name:Data.data.clause_name,
              definition:Data.data.definition,
              clauses:arr
            }
            let obj2 ={
              clause_id:id,
              clause_name:Data.data.clause_name,
              clause:'',
              rationale:'',
              status:1,
            }
              setdata(obj)
              setclause_alt(obj2)

          })
        }
      }

    }
    useEffect(()=>{
      return()=>getData()
    },[])

    const Update = async()=>{
    Notiflix.Loading.arrows()
        const Data = await Update_Clause(data)
        if(Data.data.status==true){
          Notiflix.Loading.remove()
          toast.success(Data.data.message)
          window.location.reload()
        }else{
          Notiflix.Loading.remove()
          toast.error(Data.data.message)
        }
    }
    const toggle_Add_clause_alt = ()=>{
      if(clause_btn=='block'){
        setnew_clause('block')
        setclause_btn('none')
      }
      if(clause_btn=='none'){
        setnew_clause('none')
        setclause_btn('block')
      }
    }
    const Add_new_clause_alt = async()=>{
      Notiflix.Loading.dots()
      const res = await Add_Clause_alternate(clause_alt)
      if(res.data.status==true){
        Notiflix.Loading.remove()
       toast.success(res.data.message)
       window.location.reload()
      }else{
        Notiflix.Loading.remove()
        toast.error(res.data.message)
      }
    }
    return (
    <Fragment>
      {
        data==undefined || loading ? (
          <div className="loader">
          <div className="container  d-flex align-items-center">
          <strong role="status">Loading...</strong>
          <div className="spinner-border ms-auto" aria-hidden="true"></div>
        </div>
        </div>
        ):(
    <div className='container mt-4'>
      <div className="col my-4">
      <label htmlFor='clause_name'>Clause</label>
      <input name='clause_name' className='form-control' value={data&&data.clause_name?data.clause_name:""} onChange={(e)=>  setdata(prevState=>({...prevState,clause_name:e.target.value}))}/>
      </div>
      <div className="col my-4">
      <label htmlFor="clause_defintion">Definition</label>
      <input name='clause_defintion' className='form-control' value={data&&data.definition?data.definition:''} onChange={(e)=>setdata(prevState=>({...prevState,definition:e.target.value}))}/>
      </div>
     <div className="col">
      <label className='mb-4'>Clauses</label><br/>
      {
        data&&data.clauses !=undefined && data.clauses.length!=0?(
          data.clauses !=undefined && data.clauses.map((Data,i)=>(
            <Fragment key={i}>
            <label htmlFor="rationale">Rationale</label>
            <input type="text" className='form-control mb-4' name='rationale' value={Data.rationale?Data.rationale:''}     
            onChange={ ( e ) => {
              const updatedrationale = data.clauses.map(item => {
                if (item.id === Data.id) {
                  return { ...item, rationale:e.target.value };
                }
                return item; 
              });
              setdata(prevState=>({...prevState,clauses:updatedrationale}))
            }} />
            <div className='ck_editor'>
              <CKEditor
                editor={Editor}
                config={editorConfiguration}
                data={Data.clause}
                onReady={ ( editor ) => {
                  if(editor&& editor.model ){
                    return editor
                  }
                }}
                onChange={ ( event, editor ) => {
                  const newdata = editor.getData()
                  const updatedClauses =data.clauses.map(item => {
                    if (item.id === Data.id) {
                      return { ...item, clause: newdata };
                    }
                    return item; 
                  });
                  setdata(prevState=>({...prevState,clauses:updatedClauses}))
                }
              }
              />
            </div>
            </Fragment>
          ))
        ):(
          <div className="container text-center text-gray2 ">No Clause alternates found</div>
        )
   
      }
     </div>
     <div className={`container mt-5 position-relative bg-blue13 p-5 `}>
     <div className={`col d-${new_clause}`}>
      <button className='btn btn-lg btn-close text-white position-absolute end-0 top-0 mt-3 me-4' onClick={()=>toggle_Add_clause_alt()}></button>
            <section className='col-12'>
            <label htmlFor="rationale">Rationale</label>
            <input type="text" className='form-control' value={clause_alt&&clause_alt.rationale?clause_alt.rationale:''} onChange={(e)=>{setclause_alt(prevState=>({...prevState,rationale:e.target.value}))}} />
            <div className='ck_editor mt-4'>
                  <CKEditor
                    editor={Editor}
                    config={editorConfiguration}
                  data={clause_alt.clause?clause_alt.clause:''}
                  onReady={ ( editor ) => {
                    if(editor && editor.model){
                      return editor
                    }
                  }}
                  onChange={ ( event, editor ) => {
                      if(editor && editor.model){
                        const newdata = editor.getData();
                        setclause_alt(prevState=>({...prevState,clause:newdata}))
                      }
               
                    
                  }}
                />

      
            </div>
            </section>
      <div className={` row justify-content-center`}>
        <div className="col-auto">
        <button className={`btn btn-sm text-center btn-greenlight text-white px-5`} onClick={()=>Add_new_clause_alt()}>Save</button>
        </div>
     </div> 
     </div>
     <div className={` row justify-content-center`}>
      <div className="col-auto">
      <button className={`btn btn-sm btn-greenlight text-white d-${clause_btn}`} onClick={()=>toggle_Add_clause_alt()}>Add New Clause Alternate</button>
      </div>
     </div>

     </div>
     <div className="row mt-4 my-4">
      <div className="col-auto mt-4">
        <button className='btn btn-blue1 text-white'onClick={()=>Update()}>Update</button>
      </div>
     </div>
    </div>
      )
     }
    </Fragment>
  )
}

export default Update_clause