import { Chapters_By_Act,Add_Chapter,Update_Chapter } from "../../controllers/admin/chapters_controller.js";
import express from 'express'
const app = express()
const router = express.Router()
app.use(express.urlencoded({ extended: true }));


router.get('/chapters/list',Chapters_By_Act)
router.post('/chapter/new',Add_Chapter)
router.put('/chapter/update/:id',Update_Chapter)

export default router