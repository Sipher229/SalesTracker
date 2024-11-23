import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: false,
    errorTickets: [],
}

const errorTicketsSlice = createSlice({
    name: 'errorTickets',
    initialState: initialState,
    reducers: {
        setErrorTickets: (state, action) => {
            if ( action.payload === null ) return
            state.errorTickets = action.payload
        },
        updateErrorFlag: (state, action) => {
            if ( action.payload === null ) return
            state.error = action.payload
        }
    }
})

export const {setErrorTickets, updateErrorFlag} = errorTicketsSlice.actions

export default errorTicketsSlice.reducer