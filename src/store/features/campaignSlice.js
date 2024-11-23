import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    campaigns: []
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