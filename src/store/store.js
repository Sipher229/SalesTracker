import {configureStore} from '@reduxjs/toolkit'
import employeeReducer from './features/employeeSlice.js'
import salesReducer from './features/salesSlice.js'
import campaignReducer from './features/campaignSlice.js'
import dailyLogReducer from './features/dailyLogSlice.js'
import goalReducer from './features/goalSlice.js'
import errorTicketsReducer from './features/errorTicketsSlice.js'
import otpCredintialsReducer from './features/otpCredentialsSlice.js'
import employeesReducer from './features/employeesSlice.js'
import jobAidsReducer from './features/jobaidsSlice.js'
import registrationDataReducer from './features/registrationDataSlice.js'

const store = configureStore({
    reducer: {
        campaigns: campaignReducer,
        goals: goalReducer,
        sales: salesReducer,
        logs: dailyLogReducer,
        employee: employeeReducer,
        errorTickets: errorTicketsReducer,
        otpCredentials: otpCredintialsReducer,
        employees: employeesReducer,
        jobAids: jobAidsReducer,
        registrationData: registrationDataReducer,
        
    }
})

export default store