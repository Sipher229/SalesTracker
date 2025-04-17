import { useState, useEffect, useRef } from "react"
import Api from "../../utils/API-calling-functions/Api"
import { useDispatch, useSelector } from "react-redux"
import { initializeCampaigns } from "../../../store/features/campaignSlice"
import { useNavigate, useParams } from "react-router-dom"
import { setErrorTickets, updateErrorFlag } from "../../../store/features/errorTicketsSlice"
import errorMessages from "../../utils/errorMessages"
import Spiner from "../../utils/Spiner"
import CancelFormButton from "../CancelFormButton"

function SaleForm() {
    const api = new Api()
    const dispatch = useDispatch()
    const commissionRef = useRef(null)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const {campaigns} = useSelector((state)=> state.campaigns)
    const {isLoggedIn, user, subscriptionIsActive} = useSelector((state) => state.employee)
    const {sales} = useSelector((state) => state.sales)
    const {id} = useParams()
    const delay = 900
    const detailsRef = useRef(null);
    const [data, setData] = useState({
        name: '',
        campaign: '',
        customerNumber: '',
        tax: '',
        discount: '0',
        price: '',
        commission: '',
        commissionRate: '',
        campaignId: '',
        status: '',
        details: '',
    })

    const handleChange = (e) => {
        const {value, name} = e.target

        // switch (name) {
        //     case 'saleName':
        //         setData((prev) => {
        //             return{...prev, name: value}
        //         })
        //         break;
        //     case 'discount':
        //         setData((prev) => {
        //             return{...prev, discount: value}
        //         })
        //         break;
        //     case 'customerNumber':
        //         setData((prev) => {
        //             return{...prev, customerNumber: value}
        //         })
        //         break;
        
        //     case 'price':
        //         setData((prev) => {
        //             return{...prev, price: value}
        //         })
        //         break;
        
        //     default:
        //         break;
        // }
        if (name === "details" && data.details.length >=255) {
            detailsRef.current.classList.remove("outline-mylightgreen-300");
            detailsRef.current.classList.add("outline-red-400");
            setData((prev) => {
                return {...prev, [name]: value.slice(0, 255)};
            });
            return

        }
        else{
            if (!detailsRef.current.classList.contains("outline-mylightgreen-300")){
                detailsRef.current.classList.add("outline-mylightgreen-300");
                detailsRef.current.classList.remove("outline-red-400");
            }
            setData((prev) => {
                return {...prev, [name]: value};
            });
        }
    }
    const handleSelect = (e) => {
        const {value} = e.target
        const campaign = campaigns.find((campaign) => campaign.campaign_id == value)
        setData((prev) => {
            return {...prev, tax:campaign.tax, commissionRate: campaign.commission, campaignId: value, campaign: campaign.campaign_name}
        })
    }
    const handleDetailsPaste = (e) => {
        const {name, value} = e.target;
        if (name === "details" && data.details.length >=255) {
            detailsRef.current.classList.remove("outline-mylightgreen-300");
            detailsRef.current.classList.add("outline-red-400");
            setData((prev) => {
                return {...prev, [name]: value.slice(0, 255)};
            });
            return

        }
        else{
            if (!detailsRef.current.classList.contains("outline-mylightgreen-300")){
                detailsRef.current.classList.add("outline-mylightgreen-300");
                detailsRef.current.classList.remove("outline-red-400");
            }
            setData((prev) => {
                return {...prev, [name]: value};
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.name === "" || data.campaign === "") {
            console.log(data.commission);
            dispatch(setErrorTickets(['Make sure all input fields are complete']))
            dispatch(updateErrorFlag(true))
            setIsLoading(false)
            return;
        };
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
                loginTime: user.loginTime,
                details: data.details,
                status: data.status
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
                    campaignId: data.campaignId,
                    status: "",
                    details: ""
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
        if(data.status === "") {
            dispatch(setErrorTickets(['The status field is required']))
            dispatch(updateErrorFlag(true))
            setIsLoading(false)
            return;
        }
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
        
        if (!subscriptionIsActive) navigate("/layout/subscription-not-active");
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
            // console.log(sl)
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
                entryDate: sl.entry_date,
                status: sl.status,
                details: sl.details
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
        <form className="w-full h-auto bg-white rounded-lg flex flex-col justify-start items-start shadow-xl gap-2 lg:pl-14 p-3 box-border mb-5">
            <label className="flex flex-col w-4/5">
                <span className="roboto-medium">Sale Name:</span>
                <input 
                type="text" 
                name="name"
                value={data.name}
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="product+campaign. eg: grup sale for 116.8"
                required
                autoComplete="off"
                onChange={handleChange}
                />

            </label>
            <label className={`flex flex-col w-4/5`}>
                <span className="roboto-medium">Campaign:</span>
                <select 
                    id="campaign"
                    name="campaign" 
                    required
                    className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                    onChange={handleSelect}
                    >
                    <option value={id? data.campaignId : ''} className="">{ id? data.campaign : ""}</option>
                    {
                        campaigns.map((campaign) => {
                            return <option key={campaign.campaign_id} value={campaign.campaign_id} className="">{campaign.campaign_name}</option>
                        })
                    }
            
                </select>
                   
            </label>
            <div className="flex justify-start gap-2 items-center">

                <label className="flex flex-col w-3/5">
                    <span className="roboto-medium">Customer number:</span>
                    <input 
                    type="text" 
                    name="customerNumber" 
                    className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                    placeholder="Customer number (optional)"
                    required
                    autoComplete="off"
                    value={data.customerNumber}
                    onChange={handleChange}
                    />

                </label>
                <label className="flex flex-col w-2/5">
                    <span className="roboto-medium">Status:</span>
                    <select 
                    type="text" 
                    name="status" 
                    className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                    placeholder="Select the status."
                    required
                    autoComplete="off"
                    value={data.status}
                    onChange={handleChange}
                    >

                        <option className="roboto-regular" value={id? data.status : ""}>{id? data.status : "Select the status"}</option>
                        <option value={"Lead"}>Lead</option>
                        <option value={"Negotiating"}>Negotiating</option>
                        <option value={"Closed"}>Closed</option>
                    </select>

                </label>
            </div>
            <div className="w-full flex flex-col items-start justify-start">

                <label className="flex flex-col w-4/5">
                    <span className="roboto-medium">Details:</span>
                    <textarea 
                    type="text" 
                    ref={detailsRef}
                    name="details" 
                    className="px-2 w-full h-24 resize-none  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                    placeholder="Decription (optional)"
                    required
                    autoComplete="off"
                    value={data.details}
                    onChange={handleChange}
                    onPaste={handleDetailsPaste}
                    />

                </label>
                <small className="roboto-regular">255 characters max. {data.details.length}/255 </small>
            </div>

            <div className="flex gap-2 justify-start items-center pr-2">

                <label className="flex flex-col row-start-9 row-span-2 col-start-2 col-end-5">
                    <span className="roboto-medium">Price:</span>
                    <input 
                    type="Number" 
                    name="price"
                    value={data.price}
                    className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                    placeholder="eg: 340.99"
                    required
                    onChange={handleChange}
                    />

                </label>
                <label className="flex flex-col row-start-11 row-span-2 col-start-5 col-span-3">
                    <span className="roboto-medium">Discount:</span>
                    <input 
                    type="number" 
                    name="discount" 
                    value={data.discount}
                    className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                    placeholder="% eg: 10 (optional)"
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
            </div>
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

            <div className="flex justify-end items-center w-full pr-2 gap-2">
                {id? <CancelFormButton />: ""}
                {
                    id? 
                    <button 
                    type="submit" 
                    disabled={isLoading} 
                    className="outline-white disabled:opacity-35 disabled:cursor-not-allowed h-10 bg-mygreen-700 text-white flex justify-center items-center rounded-md active:scale-95 w-24" 
                    onClick={handleEdit}> 
                    {isLoading ? <Spiner /> : "Save"} 
                    </button> 
                    :
                    <button 
                    type="submit"
                    disabled={isLoading} 
                    className="outline-white disabled:opacity-35 disabled:cursor-not-allowed h-10 bg-mygreen-700 text-white flex justify-center items-center rounded-md active:scale-95 w-24" 
                    onClick={handleSubmit}> {isLoading ? <Spiner /> : "Submit"} </button>
                }
            </div>
        </form>
    </>
  )
}

export default SaleForm