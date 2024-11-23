import { useEffect, useState } from "react"
import Api from "../../utils/API-calling-functions/Api"
import BarChart from "./BarChart"
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);


function StatsGraph() {
  const [isLoading, setIsLoading] = useState(true)
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  const api = new Api()


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.getChartData()
 
            if (response.status === 200){
              const myData = Array.from(response.data.requestedData, (log) => {
                if(log.sales_per_hour !== null){
                  return log.sales_per_hour
                }
              })   
              setData(myData)
              const myLabels= Array.from(response.data.requestedData, (log) => log.login_date.split('T')[0])
              setLabels(myLabels)
            }
            setIsLoading(false)

        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setIsLoading(false)
        }
    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // const handleRefresh = async () => {
  //   setIsLoading(true)
  //   try {
  //       const response = await api.getLogs()
  //       if (response.status === 200){
  //           dispatch(initializeLogs(response.data.requestedData))
  //       }
  //       setIsLoading(false)

  //   } catch (error) {
  //       setIsLoading(false)
  //   }

  // }
  return (
    <>
        <div id="statsGraph" className="w-full h-82 mb-10 bg-white shadow-xl rounded-md p-2">
            <h1 className="roboto-bold text-xl px-3 text-center w-full h-7">Weekly Stats</h1>
            <div className="h-80 w-full flex flex-col items-center">

              <BarChart isLoading={isLoading} logs={data} labels={labels} />
            </div>
        </div>
    </>
  )
}

export default StatsGraph