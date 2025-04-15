import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { setSearchJobByTest } from '@/redux/jobslice'
import store from '@/redux/store'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AdminJobsTable() {
    const {allAdminJobs,searchJobByTest} = useSelector(store=>store.job)
    const [filterJobs,setFilterJobs]=useState(allAdminJobs);
    const navigate=useNavigate();
    useEffect(()=>{
        const filteredJobs=allAdminJobs.length>=0 && allAdminJobs.filter((job)=>{
            if(!searchJobByTest){
                return true
            }
            return job?.title?.toLowerCase().includes(searchJobByTest.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByTest.toLowerCase())
        })
        setFilterJobs(filteredJobs)

    },[allAdminJobs,searchJobByTest])
    return (
        <div>
            <Table>
                <TableCaption> A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right" >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr> 
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer " >
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32' >
                                            <div onClick={()=>navigate(`/admin/companies/${job._id}`)} className='flex items-center w-fit cursor-pointer' >
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2' >
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }


                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable