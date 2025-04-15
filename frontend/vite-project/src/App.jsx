import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/shared/Navbar.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/authslice'
import Companies from './admin/Companies'
import Companycreate from './admin/Companycreate'
import CompanySetup from './admin/CompanySetup'
import AdminJobs from './admin/AdminJobs'
import Postjob from './admin/postjob'
import Applicants from './admin/Applicants'
import ProtectedRoute from './admin/ProtectedRoute'
const approuter=createBrowserRouter([
  {  path:'/',
    element:<Home/>
  },
  {  path:'/login',
    element:<Login/>
  },
  {  path:'/signup',
    element:<Signup/>
  },{
    path:"/jobs",
    element:<Jobs/>
  },{
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  //admin ke liye {
   {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute> 
   },{
    path:"/admin/companies/create",
    element: <ProtectedRoute><Companycreate/></ProtectedRoute> 
   },
   {
    path:"/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup/></ProtectedRoute> 
   },
   {
    path:"/admin/jobs",
    element: <ProtectedRoute><AdminJobs/></ProtectedRoute> 
   },{
    path:"/admin/jobs/create",
    element: <ProtectedRoute><Postjob/></ProtectedRoute> 
   },{
    path:"/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants/></ProtectedRoute> 
   }
])
function App() {

  return (
    <>
      <RouterProvider router={approuter} >

      </RouterProvider>
    </>
  )
}

export default App
