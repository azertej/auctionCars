import { createSlice } from "@reduxjs/toolkit";

export const userSlides = createSlice({
    name: 'users',
    initialState: {
        user: false,
    },
   reducers:{
    SetUser:(state,action)=>{
       state.user = action.payload
    }
   }
})

export const {SetUser} = userSlides.actions