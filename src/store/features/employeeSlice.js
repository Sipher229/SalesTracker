import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    subscriptionIsActive: false,
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
            const {first_name,
                last_name, 
                employee_number, 
                employee_role, 
                id, 
                email, 
                campaignname, 
                login_time, 
                manger_id, 
                hourlysales, 
                hourlydecisions, 
                sales_per_hour, 
                shift_duration, 
                emp_campaign_id,
                company_id,
                employee_type
            } = action.payload

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
                empCampaignId: emp_campaign_id,
                companyId: company_id,
                employeeType: employee_type,
                
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
            if (action.payload === null ) return;
            if (!state.isLoggedIn) return;
            state.salesPerHour = action.payload
        },
        updateSubscriptionStatus: (state, action) => {
            if (!action.payload) return;
            state.subscriptionIsActive = action.payload;
        }
    }

})
export const {initializeEmployee, updateIsLoggedIn, updateShiftDuration, updateSalesPerHour, updateSubscriptionStatus} = employeeSlice.actions 
export default employeeSlice.reducer