import { createSlice } from "@reduxjs/toolkit";
import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";

const initialState = {
    loading : false
}

const loadingSlice = createSlice({
    name:"loadinit",
    initialState,
    reducers:{
        loading:(state)=>{
            state.loading=!state.loading;
        }
    }
})

export default loadingSlice.reducer

export const {loading} = loadingSlice.actions;

