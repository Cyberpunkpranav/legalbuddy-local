import db from '../../config/database.js'
import { fileURLToPath } from 'url'
import { dirname,join } from 'path'
import {response_data} from '../../config/config.js'
import {promises, readFileSync } from 'fs'
import VerifyToken from '../../middleware/verify_token.mjs'
const currentDir = dirname(fileURLToPath(import.meta.url));


export const Get_Clauses = (req,res,next)=>{

    const limit = Number(req.query.limit)
    const offset = Number(req.query.offset)
    const token = req.headers.authorization;
    VerifyToken(token,req,res,next)
    let query;
    if(req.query.search !=undefined){
     query = `SELECT * from public_clauses WHERE clause_name LIKE "%${req.query.search}%" AND status=1 LIMIT ? OFFSET ? `
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
    }else{
        query = `SELECT * from public_clauses AND status = 1 ORDER BY id LIMIT ? OFFSET ? `
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
async function Get_clause_By_id_helper(id,res){
return  new Promise((resolve,reject)=>{
   let query = `SELECT * FROM public_clause_alternates WHERE public_clause_alternates.clause_id=?`
    db.query(query,[id],((err,result)=>{
        if(err){
            res.json(err)   
        }else{
            let arr = []
            for(let i=0; i<result.length;i++){
                try {
                    let file_path = join(currentDir, '..', '..', 'assets', 'clauses', result[i].file_name);
                    const data = readFileSync(file_path, 'utf8' )
                      res.setHeader('Content-Type', 'text/html');
                      let obj = {
                        id:result[i].id,
                        html:data,
                        rationale:result[i].rationale,
                        clause_id: result[i].clause_id,
                        clause_nature: result[i].clause_nature,
                        file_name: result[i].file_name,
                        file_path: result[i].file_path,
                        status: result[i].status,
                        created_on: result[i].created_on,
                        updated_on: result[i].updated_on
                    }
                    arr.push(obj)   
                } catch (error) {
                   console.log(error);
                }
            }
            resolve(arr)
        }
    }))
})
}
export const Get_Clause_by_Id =async(req,res,next)=>{
    let query;
    const token = req.headers.authorization;
    VerifyToken(token,req,res,next)
    const id = req.params.id
    let response  = {
        clause_name:'',
        definition:'',
        clauses:[],
        status:'',
    }
    try {
        query = `SELECT clause_name,definition FROM public_clauses WHERE id = ?`
            db.query(query,[id],((err,result)=>{
            if(err){
                next(err)
            }else{
                response.clause_name = result[0].clause_name
                response.definition = result[0].definition
                response.status = true
            }
        }))
        const clauses =  await Get_clause_By_id_helper(id,res)
        response.clauses = clauses
        res.json(response)
    } catch (error) {
        next(error)
    }

}