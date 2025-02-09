import Footer from "../page-compontents/Footer/Footer"
import PublicFacingHeader from "../page-compontents/header/PublicFacingHeader"
import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
function PricingCard( {price="price",featuresArray=["7 days free trial", "24/7 support", "Free staff training","Access to built-in guides", "No commitent, cancel anytime",], title="Card Title" }) {
    return (
        <div className="lg:w-80 lg:h-96 sm:w-64 sm:h-72 bg-gradient-to-br from-mygreen-750 via-mygreen-500 to-mygreen-300 rounded-lg shadow-lg flex flex-col justify-start items-center lg:p-3 sm:p-1 sm:gap-1 lg:gap-4 text-white">
            <h2 id="card-header" className="w-full h-1/6 flex justify-center items-center sm:text-base lg:text-xl roboto-medium-italic mb-3 border-b border-white ">{title}</h2>
            <span className="lg:text-2xl sm:text-base roboto-medium w-full text-center"> {price} </span>
            <ul id="card-body" className="w-full h-auto flex flex-col justify-start items-center gap-3 list-disc sm:text-sm lg:text-base ">
                    {
                        featuresArray.map((feature, idx) => {
                            return <li key={idx}> {feature} </li>
                        })
                    }
            </ul>
            <Link to={"/register"} className="bg-white w-24 flex justify-center items-center sm:h-8 lg:h-10 rounded-md text-black roboto-medium shadow-md active:scale-95"> Choose </Link>

        </div>
    )
}

function Pricing() {
  return (
    <main className="w-screen h-screen flex flex-col overflow-x-hidden">
        <PublicFacingHeader />
        <div className="h-96 w-full bg-fadedGrayBg flex flex-col justify-center items-center">
            <div className="w-full h-auto roboto-regular flex justify-start gap-4  sm:pl-2 lg:pl-10">
                <Link to={"/"} className=" hover:underline underline-offset-2" >Home</Link>
                <Link to={"/contact"} className="underline underline-offset-2" >Pricing</Link>
            </div>
            <h1 className="lg:text-4xl sm:text-xl roboto-bold">Choose the Perfect Plan for Your Team</h1>
        </div>
        <div className="w-full h-4/5 flex justify-center items-cente bg-white p-8 gap-6">
            <PricingCard title="Monthly Plan" price="$150 + $10/employee"/>
        </div>
        <Footer />
    </main>
  )
}

export default Pricing