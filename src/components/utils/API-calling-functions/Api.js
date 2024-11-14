import axiosInstance from "./axiosInstance";

function Api() {
    this.logUserIn = async (body) => {
        const response = await axiosInstance.post('/login', body)
        return response
    }
    this.logUserOut = async () => {
        const response = await axiosInstance.delete('/logout')
        return response
    }
    this.confirmEmail = async (body) => {
        const response = await axiosInstance.post('/employees/confirmemail', body)

        return response
    }

    this.resendOtp = async (body) => {
        const response = await axiosInstance.get('/employees/resendotp', body)

        return response
    }

    this.resetPassword = async (body) => {
        const response = await axiosInstance.put('/employees/resetpassword', body)
        return response
    }

    this.verifyOtp = async (body) => {
        const response = await axiosInstance.post('/employees/verifyotp', body)
        return response
    }
    this.getEmployee = async () => {
        const response = await axiosInstance.get('/employees/getemployee')
        return response
    }

    this.getLogs = async () => {
        const response = await axiosInstance.get('/logs/getlogs')
        return response
    }

    this.getCampaigns = async () {
        const response = await axiosInstance.get('/campaigns/getcampaigns')
        return response
    }
}

export default Api