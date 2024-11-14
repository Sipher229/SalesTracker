import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bgColor: 'bg-red-300',
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
        updateBgColor: (state, action) => {
            if ( action.payload === null ) return
            state.bgColor == action.payload
        }
    }
})

export const {setErrorTickets, updateBgColor} = errorTicketsSlice.actions

export default errorTicketsSlice.reducer