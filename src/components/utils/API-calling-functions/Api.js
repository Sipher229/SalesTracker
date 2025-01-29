
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
    this.deleteEmployee = async (id) => {
        const response  = await axiosInstance.delete(`/employees/delete/${id}`)
        return response
    }
    this.deleteCampaign = async (id) => {
        const response  = await axiosInstance.delete(`/campaigns/delete/${id}`)
        return response
    }
    this.deleteGoal = async (id) => {
        const response  = await axiosInstance.delete(`/goals/delete/${id}`)
        return response
    }
    this.getLogsByDate = async (date) => {
        const response  = await axiosInstance.get(`/logs/getlogsdaily/${date}`)
        return response
    }
    this.getLogsById = async (id) => {
        const response  = await axiosInstance.get(`/logs/getlogs/${id}`)
        return response
    }
    this.getLogsByIdAndDate = async (id, date) => {

        const response  = await axiosInstance.get(`/logs/getlogsbyid&date?id=${id}&date=${date}}`)
        return response
    }

    this.editShiftDurationByDate = async (body) => {
        const response = await axiosInstance.patch(`/employees/edit/shiftDuration/manager`, body)
        return response
    }
    this.getPublishableKey = async () => {
        const response = await axiosInstance.get("/registration/config")
        return response
    }
    this.createPaymentIntent = async (body) => {
        const response = await axiosInstance.post("/registration/create-setup-intent ", body)
        return response
    }

    this.registerCompany = async (body) => {
        const response = await axiosInstance.post("/registration/register-company", body)
        return response
    }
    this.saveSubscription = async (body) => {
        const response = await axiosInstance.post("/registration/save-subscription", body);
        return response;
    }

    this.loginAfterRegistration = async (body) => {
        const response = await axiosInstance.post("/registration/login-after-registration", body)
        return response
    }

    this.submitInquiry = async (body) => {
        const response = await axiosInstance.post("/contact-us", body)
        return response
    }

    this.getEmployeeCount = async () => {
        const response = await axiosInstance.get("/companies/employee-count");
        return response;
    }

    this.getCompany = async () => {
        const response = await axiosInstance.get("/companies/get-company");
        return response
    }
    this.createResubscriptionIntent = async (body) => {
        const response = await axiosInstance.post("/companies/create-setup-intent", body);
        return response;
    }

    this.saveUpdatedSubscription = async (body) => {
        const response = await axiosInstance.post("/companies/save-subscription", body);
        return response;
    }
    this.getSubscriptionStatus = async (id) => {
        const response = await axiosInstance.get(`/companies/get-subscription-status/${id}`);
        return response;
    }
    this.cancelSubscription = async () => {
        const response = await axiosInstance.delete("/companies/cancel-subscription");
        return response;
    }
}

const apiObject = new Api()
export {apiObject}
export default Api

// should have created an api object here and exported that instead 
// (better practice to avoid memory leakage.) Probably too late, 
// but I will be adding the additional export just to feel good about my self

