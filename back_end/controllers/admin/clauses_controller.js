import db from '../../config/database.js'
import { fileURLToPath } from 'url'
import { dirname,join } from 'path'
import {response_data} from '../../config/config.js'
import {readFileSync, writeFileSync } from 'fs'
import VerifyToken from '../../middleware/verify_token.mjs'

let clause_response  = {
  clause_name:'',
  definition:'',
  clauses:[],
  status:'',
}
const currentDir = dirname(fileURLToPath(import.meta.url));

export const Create_clause = async(req,res,next)=>{
  const token = req.headers.authorization;
  VerifyToken(token,req,res,next)
  const query = 'INSERT into clauses (`clause_name`,`definition`) VALUES (?,?)'
  db.query(query,[req.body.clause_name,req.body.definition],((err,result)=>{
    if(err){
      next(err)
    }else{
      response_data.access_token=''
      response_data.data=''
      response_data.message='Clause Created Succesfully'
      response_data.status = true
      res.json(response_data)
    }
  }))
}

export const Get_Clauses = (req,res,next)=>{
    const limit = Number(req.query.limit)
    const offset = Number(req.query.offset)
    const token = req.headers.authorization;
    VerifyToken(token,req,res,next)
    let query;
    if(req.query.search !=undefined){
     query = `SELECT * from clauses WHERE clause_name LIKE "%${req.query.search}%" LIMIT ? OFFSET ? `
     db.query(query,[limit,offset],((err,result)=>{
        if(err){
            res.json(err)
        }else{
            response_data.data = result
            response_data.message = 'Clauses list'
            response_data.status = true
            res.json(response_data)
        }
    }))
    }else{
        query = `SELECT * from clauses ORDER BY id LIMIT ? OFFSET ? `
        db.query(query,[limit,offset],((err,result)=>{
            if(err){
                next(err)
            }else{
                response_data.data = result
                response_data.message = 'Clauses list'
                response_data.status = true
                res.json(response_data)
            }
        }))
    }

}
async function Get_clause_by_id_helper(id,res) {
    // Replace this with your actual query logic
    return new Promise((resolve, reject) => {
       let query = `SELECT * FROM clause_alternates WHERE clause_alternates.clause_id=?`
        db.query(query,[id],((err,result)=>{
            if(err){
                res.json(err)
            }else{
                let arr = []
                for(let i=0; i<result.length;i++){
                  let data = '<p></p>'
                  if(result[i].file_name){
                    let file_path = join(currentDir, '..', '..', 'assets', 'clauses', result[i].file_name);
                     data = readFileSync(file_path, 'utf8' )
                    }
                          res.setHeader('Content-Type', 'text/html');
                          let obj = {
                            id:result[i].id,
                            html:data,
                            clause_id: result[i].clause_id,
                            rationale:result[i].rationale,
                            file_name: result[i].file_name,
                            file_path: result[i].file_path,
                            status: result[i].status,
                            created_on: result[i].created_on,
                            updated_on: result[i].updated_on
                        }
                        arr.push(obj)   
                }
                resolve(arr)                
            }
        }))
    });
}
export const Get_Clause_by_Id = async (req,res,next)=>{
    let query;
        const id = Number(req.query.id)
        const token = req.headers.authorization;
        VerifyToken(token,req,res,next)
        query = `SELECT * FROM clauses WHERE id = ?`
        try {
           db.query(query,[id],((err,result)=>{
            if(err){
              res.json(err)
            }else{
              clause_response.clause_name = result[0].clause_name
              clause_response.definition = result[0].definition
            }
          }))
          const clauses =   await Get_clause_by_id_helper(id,res)
            clause_response.clauses = clauses
            clause_response.status = true  
            res.json(clause_response)
        } catch (error) {
          res.json(error)
        }

}
async function  Update_clause_helper(id,rationale,clause,status,clause_filepath,paths,filename,res) {
    // Replace this with your actual query logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let query ='UPDATE clause_alternates SET rationale=?, file_name=?,file_path=? ,status = ? WHERE id = ?';
        db.query(query, [rationale, filename, clause_filepath, status, id],((err,result)=>{
           if(err){
               res.json(err)
           }else{   
               writeFileSync(paths, clause, 'utf8');
               resolve(result)
           }
       }))
      }, 1000);
    });
}
export const Update_Clause = async (req, res,next) => {
    const Id = Number(req.body.id);
    const clause_name = req.body.clause_name;
    const definition = req.body.definition;
    const clauses = req.body.clauses;
    const token = req.headers.authorization;
    VerifyToken(token,req,res,next)

    try {
      let query = 'UPDATE clauses SET clause_name = ?, definition = ?  WHERE id = ?';
       db.query(query, [clause_name, definition, Id]);
  
      for (let i = 0; i < clauses.length; i++) {
        let id = Number(clauses[i].id);
        let rationale = clauses[i].rationale
        let filename = `${clause_name}_${id}.html`;
        let clause = clauses[i].clause;
        let status = clauses[i].status;
        let paths = join(currentDir, '..', '..', 'assets', 'clauses', filename);
        let clause_filepath = process.env.FILEPATH + '/clauses/' + filename;
        await Update_clause_helper(id,rationale,clause,status,clause_filepath,paths,filename,res)
      }
      res.json({
        data: '',
        message: 'Clause Updated Successfully',
        status: true,
      });
    } catch (err) {
    next(err);
    }
}  
export const Add_Clause_alternates  = async(req,res,next)=>{

    const clause_id = req.body.clause_id;
    const clause_name = req.body.clause_name;
    const clause = req.body.clause;
    const rationale =  req.body.rationale
    const status = req.body.status;
    const token = req.headers.authorization;
    VerifyToken(token,req,res,next)

    let query ='INSERT into clause_alternates (`clause_id`,`rationale`,`status`) VALUES (?,?,?)';
    db.query(query, [clause_id,rationale, status],((err,result)=>{
       if(err){
           next(err)
       }else{   
        const filename = clause_name+'_'+result.insertId
        const paths = join(currentDir, '..', '..', 'assets', 'clauses', filename);
        const clause_filepath = process.env.FILEPATH + '/clauses/' + filename; 
        const updateQuery = 'UPDATE clause_alternates SET file_name = ? , file_path = ? WHERE id = ?';
          db.query(updateQuery,[filename,clause_filepath,result.insertId],((err,result)=>{
            if(err){
              next(err)
            }else{
              writeFileSync(paths, clause, 'utf8');
              response_data.data = ''
              response_data.status = true
              response_data.message = 'Clause alternate added sucessfully'
              res.json(response_data)
            }
          }))
   
       }
   }));
}