import {configureStore} from '@reduxjs/toolkit'
import employeeReducer from './features/employeeSlice.js'

const store = configureStore({
    reducer: {
        employee: employeeReducer,
    }
})

export default store