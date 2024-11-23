import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    shiftDuration: 'N/A',
    salesPerHour: 'N/A',
    user:{
        firstName: 'Company',
        lastName: 'Employee',
        id: 10001,
        employeeNumber: 'S249',
        email: 'companyEmployee@gmail.com',
        campaignName: 'primary campaign',
        loginTime: '',
        managerId: 1001,
        shiftDuration: 0,
        role: '',
    }
}

// will not be querying the database for the password

const employeeSlice = createSlice({
    name: 'employee',
    initialState: initialState,
    reducers: {
        initializeEmployee: (state, action) => {
            if ( action.payload === null) return
            const {first_name, last_name, employee_number, employee_role, id, email, campaignname, login_time, manger_id, hourlysales, hourlydecisions, sales_per_hour, shift_duration} = action.payload

            state.user = {
                firstName: first_name,
                lastName: last_name,
                employeeNumber: employee_number,
                role: employee_role,
                id: id,
                email,
                campaignName: campaignname,
                loginTime: login_time,
                managerId: manger_id,
                hourlyDecisions: hourlydecisions,
                hourlySales: hourlysales,
                
            }
            state.salesPerHour =sales_per_hour
            state.shiftDuration = shift_duration
        },

        updateIsLoggedIn: (state, action) => {
            if ( action.payload === null) return
            state.isLoggedIn = action.payload
        },
        updateShiftDuration: (state, action) => {
            if ( action.payload === null ) return 
            state.shiftDuration = action.payload
        },
        updateSalesPerHour: (state, action) => {
            if (action.payload === null ) return
            if (!state.isLoggedIn) return
            state.salesPerHour = action.payload
        }
    }

})
export const {initializeEmployee, updateIsLoggedIn, updateShiftDuration, updateSalesPerHour} = employeeSlice.actions 
export default employeeSlice.reducer