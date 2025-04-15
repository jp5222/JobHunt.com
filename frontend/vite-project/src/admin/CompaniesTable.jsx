import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import store from '@/redux/store'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CompaniesTable() {
    const { companies,searchCompanyByText } = useSelector(store => store.company)
    const [filterCompany,setFilterCompany]=useState(companies);
    const navigate=useNavigate();
    useEffect(()=>{
        const filteredCompany=companies.length>=0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
        setFilterCompany(filteredCompany)

    },[companies,searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption> A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right" >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <tr>
                                <TableCell>
                                    <Avatar className=''>
                                        <AvatarImage className='w-20 h-20' src={company.logo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer " >
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32' >
                                            <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className='flex items-center w-fit cursor-pointer' >
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
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

export default CompaniesTable