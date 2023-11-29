import { Add_Act,Update_Act,Acts_list, Act_by_Id} from "../../controllers/admin/acts_controller.js"
import express from 'express'
const app = express()
const router = express.Router()
app.use(express.urlencoded({ extended: true }));

router.get('/acts/list',Acts_list)
router.post('/act/new',Add_Act)
router.put('/act/update/:id',Update_Act)
router.delete('/act/delete')
router.get('/act/view',Act_by_Id)

export default router