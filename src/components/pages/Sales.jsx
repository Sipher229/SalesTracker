/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

function RowComponent({name='FAES-sale', campaign='FAES/FAE+TDR', customerNumber='Mont-029339', price=125.40, discount=10, commission=10}) {
  return (
    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">

      <Link to={'/layout/mysales/sale'}><td className="w-[30rem] h-full text-left px-3 roboto-light text-sm underline text-mygreen-500 underline-offset-2 decoration-inherit">{name}</td></Link> 
      <td className="w-[30rem] h-full text-left px-3 roboto-bold text-sm">{campaign}</td>
      <td className="w-[30rem] h-full text-left px-3 roboto-bold text-sm">{customerNumber}</td>
      <td className="w-[30rem] h-full text-left px-3 roboto-bold text-sm">{price}</td>
      <td className="w-[30rem] h-full text-left px-3 roboto-bold text-sm">{discount}</td>
      <td className="w-[30rem] h-full text-left px-3 roboto-bold text-sm">{commission}</td>
                    
    </tr>
  )
}

function SalesComponent() {
  return (
    <>
      <div className="w-full h-full bg-white box-border  rounded-md shadow-xl hover:outline-offset-2 outline-mygreen-500 overflow-hidden">
            
            <table className=" w-full ">
                <tbody className="">
                  <tr className="w-full h-9 bg-fadedGrayBg">

                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Name</td> 
                    <td className="w-[30rem] h-full text-left px-3 roboto-light">Campaign</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-light">Customer Number</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-light">Price</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-light">Discount</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-light">Commission</td>
                    
                  </tr>
                  <RowComponent /> 
                  <RowComponent name="FunnyCxSale-FAES" commission={10} tax={13} price={116.8} discount={0} campaign="FAES/FAE+TDR"/> 
                </tbody>
            </table>
      </div>
    </>
  )
}

function Sales() {
  return (
    <>
      <main className="grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg">
      <h1 className="roboto-bold text-2xl p-1 text-left col-start-2 col-span-10 row-start-1 row-span-2">My Sales</h1>
        <div className="row-start-2 row-span-10 col-start-2 col-span-10">
          <SalesComponent />

        </div>
      </main>

    </>
  )
}

export default Sales