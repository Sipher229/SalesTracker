import { useState, useEffect, useRef } from "react"
import SubmitButton from "./SubmitButton"
import Api from "../../utils/API-calling-functions/Api"
import { useDispatch, useSelector } from "react-redux"
import { initializeCampaigns } from "../../../store/features/campaignSlice"
import { useNavigate } from "react-router-dom"
import { setErrorTickets, updateErrorFlag } from "../../../store/features/errorTicketsSlice"
import errorMessages from "../../utils/errorMessages"

function SaleForm() {
    const api = new Api()
    const dispatch = useDispatch()
    const commissionRef = useRef(null)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const {campaigns} = useSelector((state)=> state.campaigns)
    const {isLoggedIn, user} = useSelector((state) => state.employee)
    const [data, setData] = useState({
        name: '',
        campaign: '',
        customerNumber: '',
        tax: '',
        discount: '',
        price: '',
        commission: '',
        commissionRate: ''
    })

    const handleChange = (e) => {
        const {value, name} = e.target

        switch (name) {
            case 'saleName':
                setData((prev) => {
                    return{...prev, name: value}
                })
                break;
            case 'discount':
                setData((prev) => {
                    return{...prev, discount: value}
                })
                break;
            case 'customerNumber':
                setData((prev) => {
                    return{...prev, customerNumber: value}
                })
                break;
        
            case 'price':
                setData((prev) => {
                    return{...prev, price: value}
                })
                break;
        
            default:
                break;
        }
    }
    const handleSelect = (e) => {
        const {value} = e.target
        const campaign = campaigns.find((campaign) => campaign.campaign_id == value)
        console.log(campaigns)
        console.log(value)
        setData((prev) => {
            return {...prev, tax:campaign.tax, commissionRate: campaign.commission, campaign: value}
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const body = {
                customerNumber: data.customerNumber, 
                campaignId: data.campaign,
                name: data.name,
                price: data.price,
                discount: data.discount,
                tax: data.tax,
                employeeId: user.id,
                commission: commissionRef.current.value,
                loginTime: user.loginTime
            }
            const response = await api.addSale(body)
            if (response.status === 200){
                dispatch(setErrorTickets([errorMessages.addingSuccessFul]))
                dispatch(updateErrorFlag(false))
                setData({
                    name: '',
                    campaign: '',
                    customerNumber: '',
                    tax: '',
                    discount: '',
                    price: '',
                    commission: '',
                    commissionRate: ''
                })
            }
            setIsLoading(false)
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            dispatch(setErrorTickets([errorMessages.failedAddition]))
            dispatch(updateErrorFlag(true))
            setIsLoading(false)
            
        }

    }

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/layout/dashboard')
        }
        const fetchData = async () => {

            try{

                const response = await api.getCampaigns()

                if (response.status === 200) {
                    dispatch(initializeCampaigns(response.data.requestedData))

                }
            }
            // eslint-disable-next-line no-unused-vars
            catch (err) {
                dispatch(initializeCampaigns(['Error fetching campaigns']))
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <>
        <form className="w-full h-full bg-white rounded-lg grid grid-cols-12 grid-rows-12 shadow-xl gap-2 p-3">
            <label className="flex flex-col row-start-1 row-span-2 col-start-2 col-span-9">
                <span className="roboto-medium">Sale Name:</span>
                <input 
                type="text" 
                name="saleName"
                value={data.name}
                className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="product+campaign. eg: grup sale for 116.8"
                required
                autoComplete="off"
                onChange={handleChange}
                />

            </label>
            <label className={`flex flex-col row-start-3 row-span-2 col-start-2 col-span-8`}>
                <span className="roboto-medium">Campaign:</span>
                <select 
                    id="campaign"
                    name="campaign" 
                    required
                    className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                    onChange={handleSelect}
                    >
                    <option value='' className="">Choose a campaign</option>
                    {
                        campaigns.map((campaign) => {
                            return <option key={campaign.campaign_id} value={campaign.campaign_id} className="">{campaign.campaign_name}</option>
                        })
                    }
            
                </select>
                   
            </label>

            <label className="flex flex-col row-start-5 row-span-2 col-start-2 col-end-10">
                <span className="roboto-medium">Customer Number:</span>
                <input 
                type="text" 
                name="customerNumber" 
                className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="MONT-000000"
                required
                autoComplete="off"
                value={data.customerNumber}
                onChange={handleChange}
                />

            </label>
            <label className="flex flex-col row-start-7 row-span-2 col-start-2 col-end-5">
                <span className="roboto-medium">Price:</span>
                <input 
                type="Number" 
                name="price"
                value={data.price}
                className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="340.99"
                required
                onChange={handleChange}
                />

            </label>
            <label className="flex flex-col row-start-7 row-span-2 col-start-5 col-span-3">
                <span className="roboto-medium">Discount:</span>
                <input 
                type="number" 
                name="discount" 
                value={data.discount}
                className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="eg: 10"
                required
                onChange={handleChange}
                />

            </label>

            <label className="flex flex-col row-start-7 row-span-2 col-start-8 col-span-2">
                <span className="roboto-medium">Tax:</span>
                <input 
                type="number" 
                name="tax"
                className="px-2 w-full h-4/5 outline-none border border-mygreen-300 rounded-md"
                readOnly
                value={data.tax}
                />

            </label>
            <label className="flex flex-col row-start-9 row-span-2 col-start-2 col-span-6">
                <span className="roboto-medium">Commission:</span>
                <input
                ref={commissionRef}
                type="number" 
                name="commission"
                className="px-2 w-full h-4/5 outline-none border border-mygreen-300 rounded-md"
                readOnly
                value={((data.price - (data.price * data.tax/100) - (data.price * data.discount/100)) * data.commissionRate/100).toFixed(2) || 0}
                />

            </label>

            <SubmitButton isLoading={isLoading} handleSubmit={handleSubmit} name={'Submit'} />

        </form>
    </>
  )
}

export default SaleForm