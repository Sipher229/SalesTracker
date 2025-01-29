/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import PopupWindow from "../page-compontents/PopupWindow"
import { setErrorTickets, updateErrorFlag } from "../../store/features/errorTicketsSlice"
import Api from "../utils/API-calling-functions/Api"

function SaleComponent({name='N/A', customerNumber='N/A', price='N/A', discount='N/A', commission ='N/A', entryDate='N/A', campaign='N/A', id=-1, handleShowing}){
  return (
    <>
      <div className="w-full h-full bg-white box-border py-2 rounded-md shadow-xl outline-mygreen-500 overflow-hidden">   
            <div className="flex justify-between pr-3 h-auto">
                <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">Sale</h1>
                <div className="w-1/4 h-auto flex justify-end items-center gap-2">
                  <Link className={`text-mygreen-500 underline underline-offset-2 active:no-underline decoration-inherit roboto-medium`} to={`/layout/mysales/sale/edit/${id}`}>Edit</Link>
                  <button onClick={() => handleShowing(true)} className={`text-mygreen-500 underline active:no-underline underline-offset-2 decoration-inherit roboto-medium`}>Delete</button>
                </div>

            </div>
            <table className=" w-full ">
                <tbody className="">
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Name</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium">{name}</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Campaign</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{campaign}</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Customer Number</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{customerNumber}</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Price</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{price}</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Discount</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{discount}</td>
                    </tr>
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Commission</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{commission}</td>
                    </tr>
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Entry Date</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{entryDate}</td>
                    </tr>
                    
                </tbody>
            </table>
      </div>
    </>
  )
}


function Sale() {
  const navigate = useNavigate()
  const {isLoggedIn, subscriptionIsActive} = useSelector((state) => state.employee)
  const [isLoading, setIsLoading] = useState(false)
  const [showing, setShowing] = useState(false)
  const {sales} = useSelector((state) => state.sales)
  const {id} = useParams()
  const [sale, setSale] = useState(null)
  const dispatch = useDispatch()
  const delay = 700
  const api = new Api()
  const message = {
    messageTitle: 'Are you sure?',
    messageBody: 'This action is irreversible.',
    actionName: 'Delete'
  }

  const handleDelete = async () =>{
    // delete
    try{
      const response = await api.deleteSale(id, {entryDate: sale.entry_date.split("T")[0]})
      if (response.status === 200) {
        dispatch(setErrorTickets([response.data.message]))
        dispatch(updateErrorFlag(false))
        setIsLoading(false)
        setShowing(false)
        setTimeout(() => {
          
          navigate('/layout/mysales')
        }, delay)
      }
      else{
        dispatch(setErrorTickets(['Could Not delete sale']))
        dispatch(updateErrorFlag(true))
        setIsLoading(false)
        setShowing(false)
      }

      
    }
    // eslint-disable-next-line no-unused-vars
    catch (err) {
      dispatch(setErrorTickets(['failed delete']))
      dispatch(updateErrorFlag(true))
      setIsLoading(false)
      setShowing(false)
    }
  }
  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/layout/dashboard')
    }
    
    if (!subscriptionIsActive) navigate('/layout/subscription-not-active');
    if(id && id> 0) {
    
      const sl = sales.find((s) => s.id == id)
      setSale(sl)

    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <PopupWindow handleConfirmed={handleDelete} handleShowing={setShowing} showing={showing} isLoading={isLoading} messageBody={message.messageBody} messageTitle={message.messageTitle} actionName={message.actionName}/>
      <main className={`grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg ${showing? 'filter brightness-75': ''}`}>

        <div className="row-start-2 row-span-7 col-start-3 col-end-11">
          {id? 
          <SaleComponent 
          name={sale?.sale_name} 
          commission={sale?.commission} 
          entryDate={sale?.entry_date.split("T")[0]} 
          discount={sale?.discount} 
          id={id} 
          campaign={sale?.name}
          price={sale?.price}
          customerNumber={sale?.customer_number}
          handleShowing={setShowing}
          />
          :
          <SaleComponent /> }

        </div>
      </main>
    </>
  )
}

export default Sale