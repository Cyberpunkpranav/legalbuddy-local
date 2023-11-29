import { GetActs,GetChapters,GetSections,GetSubSections,GetClauses,GetSubClauses } from '../../controllers/user/acts_controller.js';
import express from 'express'
const app = express()
const router = express.Router()
app.use(express.urlencoded({ extended: true }));

router.get('/acts/list',GetActs)
router.get('/act/chapters/list',GetChapters)
router.get('/act/chapter/sections/list',GetSections)
router.get('/act/chapter/section/subsections/list',GetSubSections)
router.get('/act/chapter/section/subsections/clauses/list',GetClauses)
router.get('/act/chapter/section/subsections/clauses/subclauses/list',GetSubClauses)


export default router