import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    obj1:{
        activeCount:1
    },
    obj2: {
        activeCount:1
    },
    obj3:{
        activeCount:1
    },
    obj4: {
        activeCount:1
    },
    obj5:{
        activeCount:1
    },
    
};

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        modifyobj1:(state,action)=>{
            state.obj1=action.payload;
        },
        modifyobj2:(state,action)=>{
            state.obj2=action.payload;
        },
        modifyobj3:(state,action)=>{
            state.obj3=action.payload;
        },
        modifyobj4:(state,action)=>{
            state.obj4=action.payload;
        },
        modifyobj5:(state,action)=>{
            state.obj5=action.payload;
        }
    },
});

export const { modifyobj1,modifyobj2,modifyobj3,modifyobj4,modifyobj5 } = customerSlice.actions;

export default customerSlice.reducer;