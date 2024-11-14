import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    otpCredentials: {
        otpId: -1,
        email: ''
    }
   
}

// will not be querying the database for the password

const otpCredentialsSlice = createSlice({
    name: 'otpCredentials',
    initialState: initialState,
    reducers: {
        updateEmail: (state, action) => {
            if ( action.payload === null) return
            state.otpCredentials.email = action.payload
        },
        updateOtpId: (state, action) => {
            if ( action.payload === null) return
            state.otpCredentials.otpId = action.payload
        }
    }

})
export const {updateEmail, updateOtpId} = otpCredentialsSlice.actions
export default otpCredentialsSlice.reducer