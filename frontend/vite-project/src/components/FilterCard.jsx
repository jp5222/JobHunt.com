import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobslice';
const filterData=[
  {
    filterType:"location",
    array:["Kolkata","bangalore","Hyderabad","Mumbai","Pune","Chennai"]
  },
  {
    filterType:"Industry",
    array:["Frontend","Backend","Fullstack","Data Science","AI/ML","DevOps"]
  },
  {
    filterType:"Salary",
    array:["0-40k","42-1lakh","1lakh-5lakh"]
  },

]

function FilterCard() {
  const [selectedvalue,setselectedvalue]=useState('');
  const dispatch=useDispatch();
  const handleChange=(value)=>{
    setselectedvalue(value);
  }
  useEffect(()=>{
    dispatch(setSearchQuery(selectedvalue));
  },[selectedvalue])
  return (
    <div className='w-full bg-white p-3 rounded-md' >
      <h1 className='font-bold text-lg' >Filter Jobs</h1>
      <hr  className='mt-3'/>
      <RadioGroup  value={selectedvalue} onValueChange={handleChange} >
        {
          filterData.map((data,index)=>(
            <div>
              <h1 className='font-bold text-lg' >{data.filterType}</h1>
              {
                data.array.map((item,ind)=>{
                  const itemId=`id${index}-${ind}`
                  return (
                    <div className='flex items-center space-x-2 my-2' >
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId} >{item}</Label>
                    </div>
                  )
                })
              }
            </div>

          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard