/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
function SaleComponent({name='N/A', customerNumber='N/A', price='N/A', discount='N/A', commission ='N/A', entryDate='N/A', campaign='N/A', id=-1}){
  return (
    <>
      <div className="w-full h-full bg-white box-border py-2 rounded-md shadow-xl outline-mygreen-500 overflow-hidden">
            
            <div className="flex justify-between pr-3 h-auto">
                <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">Sale</h1>
                <div className="w-1/4 h-auto flex justify-end items-center gap-2">
                  <Link className={`text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium`}>Edit</Link>
                  <button className={`text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium`}>Delete</button>
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
  const {isLoggedIn} = useSelector((state) => state.employee)
  const {sales} = useSelector((state) => state.sales)
  const {id} = useParams()
  const [sale, setSale] = useState(null)
  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/layout/dashboard')
    }
    if(id && id> 0) {
    
      const sl = sales.find((s) => s.id == id)
      setSale(sl)

    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <main className="grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg">

        <div className="row-start-2 row-span-6 col-start-3 col-end-11">
          {id? 
          <SaleComponent 
          name={sale?.sale_name} 
          commission={sale?.commission} 
          entryDate={sale?.entry_date.split("T")[0]} 
          discount={sale?.discount} 
          id={id} 
          campaign={sale?.campaign}
          price={sale?.price}
          customerNumber={sale?.customer_number}
          />
          :
          <SaleComponent /> }

        </div>
      </main>
    </>
  )
}

export default Sale