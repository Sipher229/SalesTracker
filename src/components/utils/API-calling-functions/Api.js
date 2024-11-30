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

    this.getCampaigns = async () => {
        const response = await axiosInstance.get('/campaigns/getcampaigns/all')
        return response
    }
    this.getChartData = async () => {
        const response = await axiosInstance.get('/logs/getchartdata')
        return response
    }
    this.getChartDataById = async (id) => {
        const response = await axiosInstance.get(`/logs/getchartdata/${id}`)
        return response
    }
    this.editShiftDuration = async (body) => {
        const response = await axiosInstance.patch('/employees/edit/shiftduration', body)
        return response
    }
    this.addSale = async (body) => {
        const response = await axiosInstance.post('/sales/addsale', body)
        return response
    }
    this.updateSales = async () => {
        const response = await axiosInstance.patch('/sales/update/salesperhour')
        return response
    }
    this.addEmployee = async (body) => {
        const response = await axiosInstance.post('/employees/addemployee', body)
        return response
    }
    this.getGoals = async () => {
        const response = await axiosInstance.get('/goals/getgoals/all')
        return response
    }
    this.addCampaign = async (body) => {
        const response = await axiosInstance.post('/campaigns/addcampaign', body)
        return response
    }
    this.addGoal = async (body) => {
        const response = await axiosInstance.post('/goals/addgoal', body)
        return response
    }
    this.getSalesForEmployee = async () => {
        const response = await axiosInstance.get(`/sales/getsales/all`)
        return response
    }
    this.getSubordinates = async (id) => {
        const response = await axiosInstance.get(`/employees/getsubordinates/${id}`)
        return response
    }
    this.getAllEmployees = async () => {
        const response = await axiosInstance.get(`/employees/getemployees/all`)
        return response
    }
    this.getSalesByDate = async (date) => {
        const response = await axiosInstance.get(`/sales/getsales/${date}`)
        return response
    }
    this.editCampaign = async (body, id) => {
        const response = await axiosInstance.patch(`/campaigns/editcampaign/${id}`, body)
        return response
    }
    this.editGoal = async (body, id) => {
        const response = await axiosInstance.patch(`/goals/editgoal/${id}`, body)
        return response
    }
    this.editSale = async (body, id) => {
        const response = await axiosInstance.patch(`/sales/editsale/${id}`, body)
        return response
    }
    this.editEmployee = async (body, id) => {
        const response = await axiosInstance.patch(`/employees/editemployee/${id}`, body)
        return response
    }
    this.getEmployeeById = async (id) => {
        const response = await axiosInstance.get(`/employees/getemployee/${id}`)
        return response
    }
    this.deleteSale = async (id, body) => {
        const response = await axiosInstance.delete(`/sales/delete/${id}`, body)
        return response
    }
    this.addJobAid = async (body) => {
        const response = await axiosInstance.post(`/jobaids/addjobaid`, body)
        return response
    }
    this.editJobAid = async (body, id) => {
        const response = await axiosInstance.patch(`/jobaids/edit/${id}`, body)
        return response
    }
    this.deleteJobAid = async (id) => {
        const response = await axiosInstance.delete(`/jobaids/delete/${id}`)
        return response
    }
    
    this.getJobAids = async () => {
        const response = await axiosInstance.get(`/jobaids/getjobaids`)
        return response
    }
    this.getCampaignsPerGoal = async (id) => {
        const response = await axiosInstance.get(`/goals/getcampaigns/${id}`)
        return response
    }
    this.getEmployeesPerCampaign = async (id) => {
        const response = await axiosInstance.get(`/campaigns/getemployees/${id}`)
        return response
    }
    
}

export default Api

