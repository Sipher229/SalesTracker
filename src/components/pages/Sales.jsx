/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Api from "../utils/API-calling-functions/Api"
import { initializeSales } from "../../store/features/salesSlice"
import { setErrorTickets } from "../../store/features/errorTicketsSlice"
import Loading from "../utils/Loading"
import DateQryTool from "../page-compontents/DateQryTool"


function RowComponent({name='N/A', rowNumber=0, campaign='N/A', customerNumber='N/A', price='N/A', discount='N/A', commission='N/A', id=-1}) {
  return (
    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
      <td className="w-10 h-full text-left px-3 roboto-medium text-sm">{rowNumber + 1}</td>
      <td className="w-24 h-full text-left px-3 roboto-light text-sm underline text-mygreen-500 underline-offset-2 decoration-inherit"><Link to={`/layout/mysales/sale/${id}`}>{name}</Link></td> 
      <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">{campaign}</td>
      <td className="w-28 h-8 text-left px-3 roboto-medium text-sm">{customerNumber}</td>
      <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">{price}</td>
      <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">{discount}</td>
      <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">{commission}</td>
                    
    </tr>
  )
}

function SalesComponent({sales=[], setTotalCommission}) {

  useEffect(() => {

    const calculateTotalCom = () => {  
      const commissionArray = Array.from(sales, (sale) => parseFloat(sale.commission))
      
      const total = commissionArray.reduce((accumulator, current)=> accumulator + current, 0) 
      setTotalCommission(total)
    }
    calculateTotalCom()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className="w-full h-full overflow-y-scroll bg-white box-border  rounded-md shadow-lg hover:outline-offset-2 outline-mygreen-500">
            
            <table className=" w-full full">
                <tbody className="w-full h-full">
                  <tr className="w-full h-9 bg-fadedGrayBg">
                    <td className="w-10 h-8 text-left px-3 roboto-medium text-sm" >No</td>
                    <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">Name</td> 
                    <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">Campaign</td>
                    <td className="w-28 h-8 text-left px-3 roboto-medium text-sm">Customer Number</td>
                    <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">Price</td>
                    <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">Discount</td>
                    <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">Commission</td>
                    
                  </tr>
                  {
                    sales.length === 0 ?
                    <RowComponent />
                    :
                    sales.map((sale, index) => {
                      return <RowComponent key={index} id={sale.id} rowNumber={index} name={sale.sale_name} customerNumber={sale.customer_number} commission={sale.commission} tax={sale.tax} price={sale.price} discount={sale.discount} campaign={sale.name}/> 

                    })
                  }
                </tbody>
            </table>
      </div>
    </>
  )
}

function Sales() {
  const {isLoggedIn, subscriptionIsActive } = useSelector((state) => state.employee)
  const [isLoading, setIsLoading ] = useState(false)
  const [totalCommmission, setTotalCommission] = useState(0)
  const {sales} = useSelector((state) => state.sales)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const api = new Api()
  useEffect(() => {
    if (!isLoggedIn) navigate('/layout/dashboard');
    
    if (!subscriptionIsActive) navigate('/layout/subscription-not-active');
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await api.getSalesForEmployee()
        console.log(response.data.requestedData)
        
        if( response.status === 200) {
          dispatch(initializeSales(response.data.requestedData))
        }
        setIsLoading(false)  
        
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setIsLoading(false)
      }
    }
    fetchData()
    return () => dispatch(setErrorTickets([]))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  // useEffect(() => {
  
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []) 
  return (
    <>
      <main className="grid pl-8 w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg">
        <div className="w-full h-full mt-3 flex justify-between items-center col-start-1 col-span-11 row-start-1 row-span-1"><h1 className=" w-1/2 h-full roboto-bold text-2xl p-1 text-left">My Sales</h1> <DateQryTool isLoading={isLoading} setIsLoading={setIsLoading} /> </div> 
        <div className="row-start-3  row-span-8 col-start-1 col-span-11 w-full h-full">
          {isLoading? <Loading /> : <SalesComponent sales={sales} isLoading={isLoading} setTotalCommission={setTotalCommission} />}

        </div>
        <h1 className="roboto-bold text-xl p-1 text-left col-start-1 col-span-10 row-start-12 row-span-1">Total Commission: {totalCommmission.toFixed(2) || 'N/A'} </h1>

      </main>

    </>
  )
}

export default Sales