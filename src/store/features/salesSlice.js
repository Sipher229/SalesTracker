import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sales: [
        {
            name: 'sale name',
            customernumber: '',
            campaignname: 'campaign name',
            price: '',
            discount: 0.00,
            tax: 13,
            employeename: 'sold by',
            entrydate: '',
            id: -1
        },

    ]
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