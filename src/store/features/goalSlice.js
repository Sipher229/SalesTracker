import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    goals: [
        {
            name: 'goal name',
            hourlySales: 3,
            entryDate: "",
            creator: 'created by',
            id: -1
        },

    ]
}

const goalSlice = createSlice({
    name: 'goals',
    initialState: initialState,
    reducers: {
        initializeGoals: (state, action) => {
            if ( action.payload === null ) return
            state.goals = action.payload
        }
    }
})

export const {initializeGoals} = goalSlice.actions

export default goalSlice.reducer