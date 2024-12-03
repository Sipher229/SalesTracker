import { useEffect } from "react"
import Header from "../page-compontents/header/Header.jsx"
import SideNav from "../page-compontents/side-nav/SideNav.jsx"
import { Outlet } from "react-router-dom"
import { updateSalesPerHour } from "../../store/features/employeeSlice.js" 
import { useDispatch } from "react-redux"
import Api from "../utils/API-calling-functions/Api.js"




function Dashboard() {
  const delay = 1000 * 60 * 10
  const dispatch = useDispatch()
  const api = new Api()
  useEffect(() => {
    const updateSales = async () => {
  
      try {
        const response = await api.updateSales()
        if(response.data.success){
          dispatch(updateSalesPerHour(response.data.salesPerHour))
        }
        return
      // eslint-disable-next-line no-unused-vars
      } catch (error) { 
        return  
      }
    }
     
    return () => updateSales()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const updateSales = async () => {
  
      try {
        const response = await api.updateSales()
        if(response.data.success){
          dispatch(updateSalesPerHour(response.data.salesPerHour))

        }
        return
      // eslint-disable-next-line no-unused-vars
      } catch (error) { 
        return  
      }
    }
    updateSales()
    const intervalID = setInterval( async () => { await updateSales() }, delay)

    return () => {
      clearInterval(intervalID)
    }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <article className="w-full relative h-full flex flex-col">
      
      <div className="w-full h-16">
        <Header />
        
      </div>
      <div className={`w-full h-full flex overflow-hidden`}>
        <div className="w-72 h-full ">
          <SideNav />
        </div>
        <div className={`w-full h-full`}>
          
          <Outlet />
        </div>
      </div>
    </article>
  )
}

export default Dashboard