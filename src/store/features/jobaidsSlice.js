import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobAids: []
}

const jobAidsSlice = createSlice({
    name: 'jobAids',
    initialState: initialState,
    reducers: {
        initializejobAids: (state, action) => {
            if ( action.payload === null ) return
            state.jobAids = action.payload
        }
    }
})

export const {initializejobAids} = jobAidsSlice.actions

export default jobAidsSlice.reducer