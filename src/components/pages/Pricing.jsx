import Footer from "../page-compontents/Footer/Footer"
import PublicFacingHeader from "../page-compontents/header/PublicFacingHeader"
import { Link } from "react-router-dom"
import useLogVisit from "../utils/custom-hooks/useLogVisit"

/* eslint-disable react/prop-types */
function PricingCard( {price="price",featuresArray=["7 days free trial", "24/7 support", "Free staff training","Access to built-in guides", "No commitent, cancel anytime",], title="Card Title", ctaText="Get Started", path="/register" }) {
    return (
        <div className="py-4 px-10 bg-gradient-to-br from-mygreen-750 via-mygreen-500 to-mygreen-300 rounded-lg shadow-lg flex flex-col justify-start items-center lg:gap-4 text-white">
            <h2 id="card-header" className="w-full h-1/6 flex justify-center items-center sm:text-base lg:text-xl roboto-medium-italic mb-3 border-b border-white ">{title}</h2>
            <span className="lg:text-2xl sm:text-base roboto-medium w-full text-center"> {price} </span>
            <ul id="card-body" className="w-full h-auto flex flex-col justify-start items-center gap-3 list-disc sm:text-sm lg:text-base ">
                    {
                        featuresArray.map((feature, idx) => {
                            return <li key={idx}> {feature} </li>
                        })
                    }
            </ul>
            <Link to={`${path}`} className="bg-white px-4 flex justify-center items-center sm:h-12 rounded-md text-black roboto-medium shadow-md active:scale-95 my-2"> {ctaText} </Link>

        </div>
    )
}

function Pricing() {
    const featuresStandard = [
        "Real-time sales tracking", 
        "Personalized metric dashboards", 
        "Campaign-based team management", 
        "Customizable Commission Calculator", 
        "Team-based goal setting", 
        "Access to built-in guides"
    ];

    const featuresEnterprise = [
        "Real-time sales tracking", 
        "Personalized metric dashboards", 
        "Campaign-based team management", 
        "Customizable Commission Calculator", 
        "Team-based goal setting", 
        "Access to built-in guides",
        "Custom pricing"
    ];
    useLogVisit(window.location.href);
  return (
    <main className="w-screen h-screen flex flex-col items-center justifify-center overflow-x-hidden">
        <PublicFacingHeader />
        <div className="py-4 w-full bg-fadedGrayBg flex flex-col justify-center items-center">
            <div className="w-full h-auto roboto-regular flex justify-start gap-4  sm:pl-2 lg:pl-10">
                <Link to={"/"} className=" hover:underline underline-offset-2" >Home</Link>
                <Link to={"/contact"} className="underline underline-offset-2" >Contact</Link>
            </div>
            <h1 className="lg:text-4xl sm:text-xl roboto-bold">Choose the Perfect Plan for Your Team</h1>
        </div>
        <div className="min-h-[32rem] min-w-full py-4 sm:flex sm:flex-col md:flex md:flex-row sm:justify-start md:justify-center items-center bg-white gap-6 overflow-y-scroll">
            <PricingCard title="Standard Plan" price="$10/employee" featuresArray={featuresStandard}/>
            <PricingCard title="Enterprise Plan" price="Over 300 employees" featuresArray={featuresEnterprise} ctaText="Contact Sales" path="/contact"/>
        </div>
        <Footer />
    </main>
  )
}

export default Pricing