import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    companyId: -1,
    company: {
        companyName: "",
        email: "",
        employeeCount: -1
    }
   
}

const registrationDataSlice = createSlice({
    name: 'registrationData',
    initialState: initialState,
    reducers: {
        updateCompanyData: (state, action) => {
            if ( action.payload === null) return
            state.company.email = action.payload.email
            state.company.companyName = action.payload.companyName
            state.company.employeeCount = action.payload.employeeCount
        },
        updateCompanyId: (state, action) => {
            if ( action.payload === null) return
            state.companyId = action.payload
        }
    }

})
export const {updateCompanyData, updateCompanyId} = registrationDataSlice.actions
export default registrationDataSlice.reducer