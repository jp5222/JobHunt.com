import {createSlice} from "@reduxjs/toolkit"
const jobSlice=createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJobByTest:"",
        allAppliedJobs:[],
        searchedQuery:"",
    },
    reducers:{
        //actions
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload
        },
        setSearchJobByTest:(state,action)=>{
            state.searchJobByTest=action.payload
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs=action.payload
        },
        setSearchQuery:(state,action)=>{
            state.searchedQuery=action.payload
        }
    }
})
export const {setAllJobs ,setSingleJob,setAllAdminJobs,setSearchJobByTest,setAllAppliedJobs,setSearchQuery } =jobSlice.actions;
export default jobSlice.reducer