import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React, { useState } from 'react'
import { Button } from '../ui/button.jsx'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_ENDPOINT } from '@/utils/constant.js'
import { setUser } from '@/redux/authslice.js'
import { toast } from 'sonner'
import axios from 'axios'

function Navbar() {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/")
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='bg-white' >
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16' >
                <div>
                    <h1 className='text-2xl font-bold' >Job <span className='text-[#F83002]' >Portal</span> </h1>
                </div>
                <div className='flex items-center gap-12' >
                    <ul className='flex font-medium items-center gap-5' >

                        { 
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Company</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        } 
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2' >
                                <Link to="/login" >
                                    <Button variant="outline" className='bg-[#F83002] text-white cursor-pointer ' >Login</Button>
                                </Link>
                                <Link to="/signup" >
                                    <Button variant="outline" className='bg-[#F83002] text-white cursor-pointer' >Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover  >
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer' >
                                        <AvatarImage className='w-10 h-10 rounded-full' src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80 bg-white ' >
                                    <div>
                                        <div className='flex gap-4  space-y-2' >
                                            <Avatar className='cursor-pointer' >
                                                <AvatarImage className='ml-2  w-10 h-10 rounded-full' src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medim' >{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground' >{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600' >
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer' >
                                                        <User2 />
                                                        <Button className='cursor-pointer' variant="link" ><Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }
                                            <div className='flex w-fit items-center gap-2 cursor-pointer' >
                                                <LogOut />
                                                <Button onClick={logoutHandler} className='cursor-pointer' variant="link" >Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar