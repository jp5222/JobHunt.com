
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { setUser } from '@/redux/authslice'
import { toast } from 'sonner'

function UpdateProfileDialog({open, setOpen}) {
    const [loading,setLoading]=useState(false)
    const {user}=useSelector(store=>store.auth)
    const [input,setInput]=useState({
        fullname:user?.fullname,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill=>skill) || "",
        file:user?.profile?.resume || ""
    });
    const dispatch=useDispatch()
    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const filechnageHandler=(e)=>{
        const file=e.target.files?.[0];
        setInput({...input,file})
    }
    const submitHandler= async (e)=>{
        e.preventDefault();
        // console.log(input)
        const formData=new FormData();
        formData.append("fullname",input.fullname);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("bio",input.bio);
        formData.append("skills",input.skills);
        if(input.file){
            formData.append("file",input.file)
        }
        try {
            setLoading(true)
            const res=await axios.post(`${USER_API_ENDPOINT}/profile/update`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            });
            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success((res.data.message));
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally{
            setLoading(false)
        }
        setOpen(false)
    }
    

  return (
    <div>
        <Dialog  open={open}>
            <DialogContent className='sm:max-w-[425px]' onInteractOutside={()=>setOpen(false)} >
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler} >
                    <div className='grid gap-4 py-4' >
                        <div className='grid grid-cols-4 items-center gap-4' >
                            <label htmlFor='name' className='text-right' >Name</label>
                            <Input 
                            id="name"
                            name="name"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4' >
                            <label htmlFor='email' className='text-right' >Email</label>
                            <Input 
                            id="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4' >
                            <label htmlFor='number' className='text-right' >Number</label>
                            <Input 
                            id="number"
                            name="number"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4' >
                            <label htmlFor='bio' className='text-right' >Bio</label>
                            <Input 
                            id="bio"
                            name="bio"
                            value={input.bio}
                            onChange={changeEventHandler}
                            className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4' >
                            <label htmlFor='skills' className='text-right' >Skills</label>
                            <Input 
                            id="skills"
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4' >
                            <label htmlFor='file' className='text-right' >Resume</label>
                            <Input 
                            id="file"
                            name="file"
                            type="file"
                            onChange={filechnageHandler}
                            accept="image/*"
                            className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {                                
                          loading ? <Button className='w-full my-4' ><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :<Button type="submit" className='w-full my-4 cursor-pointer' >Sumit</Button>                                 
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default UpdateProfileDialog