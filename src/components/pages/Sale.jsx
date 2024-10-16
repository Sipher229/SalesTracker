import { Link } from "react-router-dom"
function SaleComponent(){
  return (
    <>
      <div className="w-full h-full bg-white box-border py-2 rounded-md shadow-xl outline-mygreen-500 overflow-hidden">
            
            <div className="flex justify-between pr-3 h-auto">
                <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">Sale Name</h1>
                <div className="w-1/4 h-auto flex justify-end items-center gap-2">
                  <Link className={`text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium`}>Edit</Link>
                  <button className={`text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium`}>Delete</button>
                </div>

            </div>
            <table className=" w-full ">
                <tbody className="">
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Name</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium">FunnyCx-FAES</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Campaign</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">FAES/FAE+TDR</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Customer Nuber</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">Mont-204394</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Price</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">116.8</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Discount</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">0</td>
                    </tr>
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Commission</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">10</td>
                    </tr>
                    
                </tbody>
            </table>
      </div>
    </>
  )
}


function Sale() {
  return (
    <>
      <main className="grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg">

        <div className="row-start-2 row-span-6 col-start-3 col-end-11">
          <SaleComponent />

        </div>
      </main>
    </>
  )
}

export default Sale