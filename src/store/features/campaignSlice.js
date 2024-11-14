import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    campaigns: [
        {
            name: 'campain name',
            commission: 10,
            tax: 13,
            goalName: 'corresponding goal',
            employeeName: 'employeeName',
            entryDate: '',
            id: -1
        },

    ]
}

const campaignSlice = createSlice({
    name: 'campaigns',
    initialState: initialState,
    reducers: {
        initializeCampaigns: (state, action) => {
            if ( action.payload === null ) return
            state.campaigns = action.payload
        }
    }
})

export const {initializeCampaigns} = campaignSlice.actions

export default campaignSlice.reducer