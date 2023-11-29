import { Get_Clauses,Get_Clause_by_Id,Update_Clause,Add_Clause_alternates, Create_clause } from "../../controllers/admin/clauses_controller.js";
import express from 'express'
import upload from '../../middleware/multer_middleware.mjs'

const app = express()
const router = express.Router()
app.use(express.urlencoded({ extended: true }));

router.get('/libraries/clauses',Get_Clauses)
router.get('/libraries/clause/view',Get_Clause_by_Id)
router.post('/libraries/clauses/update',Update_Clause)
router.post('/libraries/clause/alternate/new',Add_Clause_alternates)
router.post('/libraries/clauses/create',Create_clause)

export default router