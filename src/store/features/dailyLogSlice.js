import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logs: []
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