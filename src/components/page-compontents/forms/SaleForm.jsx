import { useState, useEffect, useRef } from "react"
import SubmitButton from "./SubmitButton"
import Api from "../../utils/API-calling-functions/Api"
import { useDispatch, useSelector } from "react-redux"
import { initializeCampaigns } from "../../../store/features/campaignSlice"
import { useNavigate, useParams } from "react-router-dom"
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
    const {sales} = useSelector((state) => state.sales)
    const {id} = useParams()
    const delay = 900
    const [data, setData] = useState({
        name: '',
        campaign: '',
        customerNumber: '',
        tax: '',
        discount: '',
        price: '',
        commission: '',
        commissionRate: '',
        campaignId: '',
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
        setData((prev) => {
            return {...prev, tax:campaign.tax, commissionRate: campaign.commission, campaignId: value, campaign: campaign.campaign_name}
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const body = {
                customerNumber: data.customerNumber, 
                campaignId: data.campaignId,
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
                    campaign: data.campaign,
                    customerNumber: '',
                    tax: data.tax,
                    discount: '',
                    price: '',
                    commission: '',
                    commissionRate: data.commissionRate,
                    campaignId: data.campaignId
                })
            }
            setIsLoading(false)
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            dispatch(setErrorTickets(['Make sure all input fields are complete', errorMessages.failedAddition]))
            dispatch(updateErrorFlag(true))
            setIsLoading(false)
            
        }

    }
    const handleEdit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await api.editSale(data, id)
            if (response.status === 200) {
                dispatch(setErrorTickets([errorMessages.editSuccessFul]))
                dispatch(updateErrorFlag(false))
                setTimeout(()=> {
                    setIsLoading(false)
                
                    navigate('/layout/mysales')

                }, delay)
            }
            else{
                dispatch(setErrorTickets([errorMessages.failedEdit]))
                dispatch(updateErrorFlag(true))
            }

            setIsLoading(false)  
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            dispatch(setErrorTickets([errorMessages.failedEdit]))
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

    useEffect(() => {
        if (id && id > 0) {
            const sl = sales.find((s) => s.id == id)
            console.log(sl)
            setData({
                name: sl.sale_name,
                campaign: sl.name,
                customerNumber: sl.customer_number,
                tax: sl.tax,
                discount: sl.discount,
                price: parseFloat(sl.price.slice(1)),
                commission: sl.commission,
                commissionRate: sl.tax,
                campaignId: sl.campaign_id,
                entryDate: sl.entry_date
            })
        }
        else{

            const cm = campaigns.find((c) => c.campaign_id == user.empCampaignId)
            console.log(cm)
            setData((prev) => {
                return {...prev, campaignId: cm ? user.empCampaignId: '', campaign: cm ? cm.campaign_name: 'Choose a campaign', commissionRate: cm ? cm.commission : 0, tax: cm ? cm.tax : ''}
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campaigns])

  return (
    <>
        <form className="w-full h-full bg-white rounded-lg grid grid-cols-12 grid-rows-12 shadow-xl gap-2 p-3">
            <label className="flex flex-col row-start-1 row-span-2 col-start-2 col-span-9">
                <span className="roboto-medium">Sale Name:</span>
                <input 
                type="text" 
                name="saleName"
                value={data.name}
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
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
                    className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                    onChange={handleSelect}
                    >
                    <option value={id? data.campaignId : ''} className="">{ data.campaign}</option>
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
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
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
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
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
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
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
                className="px-2 w-full h-10 outline-none border border-mygreen-300 rounded-md"
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
                className="px-2 w-full h-10 outline-none border border-mygreen-300 rounded-md"
                readOnly
                value={((data.price - (data.price * data.tax/100) - (data.price * data.discount/100)) * data.commissionRate/100).toFixed(2) || 0}
                />

            </label>

            {id? <SubmitButton name={'Save'} isLoading={isLoading} handleSubmit={handleEdit} /> : <SubmitButton isLoading={isLoading} handleSubmit={handleSubmit} name={'Submit'} />}

        </form>
    </>
  )
}

export default SaleForm