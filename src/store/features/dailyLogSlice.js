import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logs: [
        {
            logintime: 10,
            loginDate: 13,
            salesperhour: 'corresponding goal',
            commission: 'employeeName',
            shiftduration: '',
            id: -1
        },

    ]
}

const dailyLogSlice = createSlice({
    name: 'logs',
    initialState: initialState,
    reducers: {
        initializeLogs: (state, action) => {
            if ( action.payload === null ) return
            state.logs = action.payload
        }
    }
})

export const {initializeLogs} = dailyLogSlice.actions

export default dailyLogSlice.reducer