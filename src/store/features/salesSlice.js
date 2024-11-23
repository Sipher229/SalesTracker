import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sales: []
}

const salesSlice = createSlice({
    name: 'sales',
    initialState: initialState,
    reducers: {
        initializeSales: (state, action) => {
            if ( action.payload === null ) return
            state.sales = action.payload
        }
    }
})

export const {initializeSales} = salesSlice.actions

export default salesSlice.reducer