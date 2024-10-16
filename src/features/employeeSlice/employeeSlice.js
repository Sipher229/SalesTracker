import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: 'Company',
    lastName: 'Employee',
    id: 10001,
    employeeNumber: 'S249',
    email: 'companyEmployee@gmail.com',
    campaign1: 'primary campaign',
    campaign2: 'secondary campaign'
}

// will not be querying the database for the password

const employeeSlice = createSlice({
    name: 'employee',
    initialState: initialState,
    reducers: {}

})

export default employeeSlice.reducer