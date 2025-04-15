import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { searchCompanyByText } from '@/redux/companyslice'

function Companies() {
    useGetAllCompanies();
    const navigate=useNavigate();
    const [input,setInput]=useState("");
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(searchCompanyByText(input));
    },[input])
    return (
        <div>
            <Navbar />
            <div className=' flex items-center justify-between max-w-6xl mx-auto my-5' >
                <div className='flex items-center justify-between my-5' >
                    <Input
                        placeholder="Filter by name"
                        className="w-fit"
                        onChange={(e)=>setInput(e.target.value)}
                    />
                </div>
                <Button onClick={()=>navigate("/admin/companies/create")} >New Company</Button>
            </div>
                <div>
                    <CompaniesTable />
                </div>
        </div>
    )
}

export default Companies