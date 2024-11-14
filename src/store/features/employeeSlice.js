import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
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
            const {first_name, last_name, employee_number, employee_role, id, email, campaignname, shift_duration, login_time, manger_id, hourlysales, hourlydecisions, salse_per_hour} = action.payload

            state.user = {
                firstName: first_name,
                lastName: last_name,
                employeeNumber: employee_number,
                role: employee_role,
                shiftDuration: shift_duration,
                id: id,
                email,
                campaignName: campaignname,
                loginTime: login_time,
                managerId: manger_id,
                hourlyDecisions: hourlydecisions,
                hourlySales: hourlysales,
                salesPerHour: salse_per_hour
            }
        },

        updateIsLoggedIn: (state, action) => {
            if ( action.payload === null) return
            state.isLoggedIn == action.payload
        }
    }

})
export const {initializeEmployee, updateIsLoggedIn} = employeeSlice.actions 
export default employeeSlice.reducer