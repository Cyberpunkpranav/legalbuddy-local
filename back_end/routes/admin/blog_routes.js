import express from 'express'
import upload from '../../middleware/multer_middleware.mjs'
import {Insert_Blog,Get_Blogs,Delete_Blogs,Blogs_Filters,Update_Blog,Blog_by_Id,Switch_Blogs,Blog_total} from '../../controllers/admin/blogs_controller.js'
const app = express()
const router = express.Router()
app.use(express.urlencoded({ extended: true }));

//admin
router.post('/new',upload.single('image'),Insert_Blog)
router.get('/allblogs',Get_Blogs)
router.delete('/delete',Delete_Blogs)
router.get('/types',Blogs_Filters)
router.put('/update/:id', upload.single('image'),Update_Blog)
router.get('/blogbyId',Blog_by_Id)
router.post('/switch',Switch_Blogs)
router.get('/blog_count',Blog_total)
router.post('/')

export default router