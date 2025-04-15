import { setCompanies } from '@/redux/companyslice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetAllCompanies() {
    const dispatch=useDispatch();
    useEffect(()=>{
       const fetchcompanies=async ()=>{
           try {
               const res=await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
               if(res.data.success){
                   dispatch(setCompanies(res.data.companies));
               }
           } catch (error) {
               console.log(error);
           }
       }
       fetchcompanies();
    },[])
}

export default useGetAllCompanies