import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchCompanyByText } from '@/redux/companyslice';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByTest } from '@/redux/jobslice';

function AdminJobs() {
  useGetAllAdminJobs();
  const navigate=useNavigate();
  const [input,setInput]=useState("");
  const dispatch=useDispatch();
  useEffect(()=>{
      dispatch(setSearchJobByTest(input));
  },[input])
  return (
      <div>
          <Navbar />
          <div className=' flex items-center justify-between max-w-6xl mx-auto my-5' >
              <div className='flex items-center justify-between my-5' >
                  <Input
                      placeholder="Filter by name,role "
                      className="w-fit"
                      onChange={(e)=>setInput(e.target.value)}
                  />
              </div>
              <Button onClick={()=>navigate("/admin/jobs/create")} >New Jobs</Button>
          </div>
              <div>
                 <AdminJobsTable/>
              </div>
      </div>
  )
}

export default AdminJobs