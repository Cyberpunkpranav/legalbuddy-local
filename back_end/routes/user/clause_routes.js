import express from 'express'
import { Get_Clauses,Get_Clause_by_Id } from "../../controllers/user/clauses_controller.js";
const app = express()
const router = express.Router()
app.use(express.urlencoded({ extended: true }));

router.get('/allclauses',Get_Clauses)
router.get('/view/:id',Get_Clause_by_Id)


export default router