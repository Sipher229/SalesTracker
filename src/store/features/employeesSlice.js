import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employees: []
}

// will not be querying the database for the password

const employeeSlice = createSlice({
    name: 'employees',
    initialState: initialState,
    reducers: {
        initializeEmployees: (state, action) => {
            if ( action.payload === null) return
            state.employees = action.payload

            
        },
       
    }

})
export const {initializeEmployees} = employeeSlice.actions 
export default employeeSlice.reducer