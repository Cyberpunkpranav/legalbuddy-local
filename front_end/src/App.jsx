import { lazy,Suspense,createContext, useContext, useEffect,useState} from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { Get_filters } from "./api/commons/get_apis";
import "../src/css/bootstrap.css";
import './components/utils/notiflix';
//Admin
const AdminBlogs = lazy(()=>import('./components/admin/blogs/blogs'))
const EditBlog = lazy(()=>import('./components/admin/blogs/edit_blog'))
const NewBlog = lazy(()=>import('./components/admin/blogs/new_blog'))
const AdminClauses = lazy(()=>import('./components/admin/services/library/clauses/clauses'))
const NewClause = lazy(()=>import('./components/admin/services/library/clauses/new_clause'))
const UpdateClause = lazy(()=>import('./components/admin/services/library/clauses/update_clause'))
const AdminActs = lazy(()=>import('./components/admin/acts/acts'))
const NewAct = lazy(()=>import('./components/admin/acts/new_act'))
const EditAct = lazy(()=>import('./components/admin/acts/edit_act'))
const AdminChapters = lazy(()=>import('./components/admin/acts/chapters/chapters'))
const AdminNewChapter = lazy(()=>import('./components/admin/acts/chapters/new_chapter'))
const AdminNewSubSection = lazy(()=>import('./components/admin/acts/subsections/new_subsection'))
const AdminSubsection = lazy(()=>import('./components/admin/acts/subsections/subsections'))
const AdminUpdateSubsection = lazy(()=>import('./components/admin/acts/subsections/updatesubsection'))
const AdminNewClause = lazy(()=>import('./components/admin/acts/clauses/new_clause'))
//User
const Authentication = lazy(()=>import('./components/signup'))
const Blogs = lazy(()=>import('./components/blogs_section/blogs'))
const Layout = lazy(()=>import('./components/layout'))
const Homepage = lazy(()=>import('./components/homepage'))
const News = lazy(()=>import('./components/news'))
const NotFound = lazy(()=>import('./components/not_found'))
const Admin = lazy(()=>import('./components/admin'))
const Team = lazy(()=>import('./components/team'))
const Login = lazy(()=>import('./components/login'))
const AboutUs = lazy(()=>import('./components/about_us'))
const RequireAuth = lazy(()=>import('./components/user_auth/require_auth'))
const ViewBlog = lazy(()=>import('./components/blogs_section/blog_by_id'))
//solutions
const Solutions = lazy(()=>import('./components/solutions_section/solutions'))
const Products = lazy(()=>import('./components/solutions_section/products/products'))
//products
const CLM = lazy(()=>import('./components/solutions_section/products/clm'))
const GRC = lazy(()=>import('./components/solutions_section/products/grc'))
//services
const Clauses = lazy(()=>import('./components/solutions_section/services/clauses/clauses'))
const Resolutions = lazy(()=>import('./components/solutions_section/services/resolutions'))
const ViewClause = lazy(()=>import('./components/solutions_section/services/clauses/clause_by_id'))
//acts and rules
const Acts = lazy(()=>import('./components/solutions_section/acts_and_rules/acts/acts'))
const Chapters = lazy(()=>import('./components/solutions_section/acts_and_rules/acts/chapters'))
const Sections = lazy(()=>import('./components/solutions_section/acts_and_rules/acts/sections'))
const Main_page = lazy(()=>import('./components/solutions_section/acts_and_rules/acts/main_page'))

function App(){
  const [types,settypes] = useState([])
  const Get_Types = async()=>{
    try{
      const types = await Get_filters()
      settypes(types.data.data)
      let data = types !==undefined ?JSON.stringify(types.data.data):''
      Cookies.set('types',data)
    }catch(e){
      console.error(e.message)
    }
  }
  useEffect(()=>{
    let data =  Cookies.get('types')
    if(data!=undefined){
    settypes(JSON.parse(data))
  }
  if(data==undefined || data.length==0){
    Get_Types()
  }
  },[])
  return(
    <Suspense fallback={<div className="text-charcoal75 fs-6 fw-bold text-center"> {" "} loading..{" "} </div>} >
    <Routes>
    <Route path='Login' element={<Login/>}/>
      <Route path='Signup' element={<Authentication/>}/>
      <Route path='/' element={<Layout/>}>
      <Route path='/' element = {<Homepage/>}/>
      <Route path='Blogs' element = {<Blogs/>}/>
      <Route path ='Blogs/view/:id' element = {<ViewBlog/>}/>
      <Route path='News' element={<News/>}/>
      <Route path='Team' element={<Team/>}/>
      <Route path='About_us' element={<AboutUs/>}/>
      <Route path='Solutions' element={<Solutions/>} />
      <Route path='Solutions/services/libraries/clauses' element={<Clauses/>} />
      <Route path='Solutions/services/libraries/clauses/view/:id' element={<ViewClause/>} />
      <Route path='Solutions/services/libraries/resolutions' element={<Resolutions/>} />
      <Route path='Solutions/services/contract_and_lifecycle_management' element={<CLM/>} />
      <Route path='Solutions/services/governance_risk_and_compliance' element={<GRC/>} />
      <Route path='Solutions/services/acts_and_rules/acts' element={<Acts/>}/>
      <Route path='Solutions/services/acts_and_rules/acts/:act/:token' element={<Chapters/>}/>
      <Route path='Solutions/services/acts_and_rules/acts/:act/:chapter/:token' element={<Sections/>}/>
      <Route path='Solutions/services/acts_and_rules/acts/:act/:chapter/:section/:token' element={<Main_page/>}/>
      <Route element={<RequireAuth/>}>
      <Route path='Admin' element={<Admin/>}/>
      <Route path='Admin/services/libraries/clauses' element={<AdminClauses/>}/>
      <Route path='Admin/services/libraries/clauses/update/:id' element={<UpdateClause/>} />
      <Route path='Admin/services/libraries/clauses/new' element={<NewClause/>} />
      <Route path='Admin/blogs' element={<AdminBlogs/>}/>
      <Route path ='Admin/blogs/new_blog' element = {<NewBlog/>} />
      <Route path='Admin/blogs/edit_blog/:id' element = {<EditBlog/>}/>
      <Route path='Admin/acts' element={<AdminActs/>}/>
      <Route path='Admin/acts/new' element={<NewAct/>}/>
      <Route path='Admin/acts/update/:id' element={<EditAct/>}/>
      <Route path='Admin/acts/:act' element={<AdminChapters/>}/>
      <Route path='Admin/acts/:act/:act_id/chapter/new' element={<AdminNewChapter/>}/>
      <Route path='Admin/acts/:act/:chapter/:section' element={<AdminSubsection/>}/>
      <Route path='Admin/acts/:act/:chapter/:section/subsection/new' element={<AdminNewSubSection/>}/>
      <Route path='Admin/acts/:act/:chapter/:section/subsection/update' element={<AdminUpdateSubsection/>}/>
      <Route path='Admin/acts/:act/:chapter/:section/subsection/clause/new' element={<AdminNewClause/>}/>

      </Route>

      <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
    </Suspense> 
  )
}
export default App;
