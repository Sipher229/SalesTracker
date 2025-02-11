/* eslint-disable react/prop-types */
import RightFacingArrow from "../utils/icons/RightFacingArrow";
import remoteTeamsImg from "../../remote-teamsCollage.jpg";
import salesAndCommissionsImg from "../../sales-commission.jpg";
import campaignsAndGoalsImg from "../../goals-camapaigns.jpg"
import Bolt from "../utils/icons/Bolt";
import QuestionMarkCircle from "../utils/icons/QuestionMarkCircle";
import BriefCase from "../utils/icons/BriefCase";
import {Link} from "react-router-dom"
import Footer from "../page-compontents/Footer/Footer";
import { useState } from "react";
import CloseMenu from "../utils/icons/CloseMenu";
import MenuIcon from "../utils/icons/MenuIcon";
import transparentLogo from "../page-compontents/image-assets/logo-transparent-png.png"
import CookieBanner from "../page-compontents/CookieBanner";

function DropDownMenu ({handleMenuIsOpen, menuIsOpen=false}) {
    return (
        <div className={`w-52 h-auto overflow-hidden sm:${menuIsOpen ? "": "hidden"} lg:hidden bg-gradient-to-br from-mygreen-750 to-mygreen-500 sm:flex flex-col justify-start items-start absolute top-0 right-0 text-white roboto-regular sm:scale-x-100 sm:duration-100 sm:ease-in-out sm:origin-right`}>
            <span className="w-full h-12 pt-8 bg-transparent border-y-0 border-white p-3 flex justify-end pr-2">

                <button onClick={()=> handleMenuIsOpen()} className="w-auto lg:hover:cursor-default h-auto flex justify-start items-center gap-3">
                    <CloseMenu /> 

                </button>
            </span>
            <Link to={'/login'} className="w-full hover:scale-105 bg-transparent border-y-0 border-white p-3 text-center hover:cursor-pointer hover:bg-mygreen-300">Log In</Link>
            <Link to={'/register'} className="w-full hover:scale-105 bg-transparent border-y-0 border-white p-3 text-center hover:cursor-pointer hover:bg-mygreen-300">Sign Up</Link>
            <Link to={'/pricing'} className="w-full bg-transparent hover:scale-105 border-y-0 border-white p-3 text-center hover:cursor-pointer hover:bg-mygreen-300">Pricing</Link>
            <Link to={'/contact'} className="w-full bg-transparent hover:scale-105 border-y-0 border-white p-3 text-center hover:cursor-pointer hover:bg-mygreen-300">Contact</Link>
        </div>
    )
}

function Hero() {
    const [menuIsOpen, setmenuIsOpen] = useState(false)

    const handleMenuIsOpen = () =>{
        setmenuIsOpen(false)
    }

    return (
        <section className="w-screen min-h-96 bg-gradient-to-br bg-green-analytics bg-no-repeat bg-cover flex flex-col">
            <header className="w-full h-16 bg-transparent mb-8">
                <nav className="w-full h-full flex justify-between items-center lg:pl-0 lg:pr-8 sm:px-4 relative">
                    <img src={transparentLogo} width={250} height={250} alt="salesverse logo" className="max-96 max-h-44 object-cover" />
                    <div className="w-96 lg:flex gap-5 h-auto justify-center items-center sm:hidden">
                        <Link to={'/pricing'} className=" text-white roboto-medium hover:border-b-2 hover:border-white hover:duration-100 hover:ease-in-out hover:pb-1">Pricing</Link>
                        <Link to={'/contact'} className="text-white roboto-medium hover:border-b-2 hover:border-white hover:duration-100 hover:ease-in-out hover:pb-1">Contact</Link>
                        <Link to={"/register"} className="bg-white flex justify-center items-center rounded-md w-20 h-9 font-semibold active:scale-95">Sign Up</Link>
                        <Link to={'/login'} className="flex justify-center items-center rounded-md w-20 h-9 roboto-medium border-2 border-white text-white active:scale-95">Log in</Link>
                    </div>
                    <button onClick={()=> setmenuIsOpen(true)} className={`w-auto sm:${!menuIsOpen ? "": "hidden"} h-auto flex justify-start items-center gap-3 lg:hidden`}>
                        <MenuIcon />
                    </button>
                    <DropDownMenu menuIsOpen={menuIsOpen} handleMenuIsOpen={handleMenuIsOpen} />
                </nav>
            </header>
            <div className="flex flex-col justify-center items-center w-full h-auto gap-4">
                <h2 className="text-white text-center roboto-medium sm:text-2xl lg:text-3xl lg:mb-6">Simplify Sales and Performance Tracking with SalesVerse </h2>
                <p className="roboto-regular text-mygreen-100 max-w-[26] text-center sm:text-lg lg:text-xl px-2">Boost productivity and gain real-time insights into your {"workforce's"} performance.</p>
                <Link to={"/register"} className="bg-white hover:gap-2 hover:duration-100 w-32 h-11 flex justify-center items-center rounded-md gap-1 active:scale-95">
                    <span className="font-semibold">Get Started</span>
                    <span><RightFacingArrow /></span>
                </Link>
            </div>
        </section>
    )
}

function RemoteTeams() {
    return (
        <section className="w-full min-h-[32rem] flex lg:flex-row sm:flex-col-reverse justify-center bg-fadedGrayBg">
            <div className="lg:w-1/2 sm:w-full sm:h-1/2 lg:h-full sm:p-4 lg:p-8">
                <img src={remoteTeamsImg} className="w-full h-full object-cover" width={400} height={300} alt="my team and employee pages screen shoot" />
            </div>
            <div className="lg:w-1/2 sm:w-full sm:h-1/2 lg:h-full flex flex-col sm:justify-start lg:justify-center items-center sm:gap-2 lg:gap-10 sm:p-4 lg:p-10">
                <h1 className="roboto-bold sm:text-2xl lg:text-4xl text-center lg:mt-20">Empower Your Sales Team Anywhere</h1>
                <p className="roboto-regular text-center lg:text-lg sm:text-base sm:p-0">
                    Gain real-time insights into your remote sales {"team's"} performance. <br /> Make informed decisions, boost productivity, and lead  with confidence—no matter where your team works.
                </p>
                <Link to={'/register'} className=" bg-mygreen-700 hover:gap-2 hover:duration-100 w-28 h-11 flex justify-center items-center rounded-md gap-1 active:scale-95 text-white">
                    <span className="font-semibold text-white">Free Trial</span>
                    <span><RightFacingArrow /></span>
                </Link>
            </div>
        </section>
    )
}

function SalesAndCommission() {
    return (
        <section className="w-full min-h-[32rem] flex sm:flex-col-reverse lg:flex-row justify-center bg-mygreen-100">
            <div className="lg:w-1/2 sm:w-full lg:h-full sm:h-1/2 flex flex-col sm:justify-start lg:justify-center items-center sm:gap-2 lg:gap-10 lg:p-10 sm:p-4">
                <h1 className="roboto-bold text-2xl text-center lg:mt-20">Track Success, Earn Confidence</h1>
                <p className="roboto-regular text-center lg:text-lg sm:text-base sm:p-0">
                    Empower your team to monitor their sales and commissions <br /> effortlessly.
                    Boost motivation and drive individual performance <br /> with real-time tracking.
                </p>
                <Link to={'/register'} className=" bg-mygreen-700 hover:gap-2 hover:duration-100 w-32 h-11 flex justify-center items-center rounded-md gap-1 active:scale-95 text-white">
                    <span className="font-semibold text-white">Get Started</span>
                    <span><RightFacingArrow /></span>
                </Link>
            </div>
            <div className="lg:w-1/2 sm:w-full sm:h-1/2 lg:h-full sm:p-4 lg:p-8">
                <img src={salesAndCommissionsImg} className="w-full h-full object-cover" width={400} height={300} alt="my team and employee pages screen shoot" />
            </div>
        </section>
    )
}

function CampaignsAndGoals() {
    return (
        <section className="w-full min-h-[32rem] flex sm:flex-col-reverse lg:flex-row justify-center bg-gradient-to-bl from-mygreen-750 via-mygreen-500 to-mygreen-300">
            <div className="lg:w-1/2 sm:w-full sm:h-1/2 lg:h-full sm:p-4 lg:p-8">
                <img src={campaignsAndGoalsImg} className="w-full h-full object-cover" width={400} height={300} alt="my team and employee pages screen shoot" />
            </div>
            <div className="lg:w-1/2 sm:w-full sm:h-1/2 lg:h-full flex flex-col justify-start items-center lg:gap-10 sm:gap-4 lg:p-10 sm:p-4">
                <h1 className="roboto-bold sm:text-2xl lg:text-4xl text-white text-center lg:mt-20">
                    Drive Team Success Together
                </h1>
                <p className="roboto-regular text-center sm:text-base lg:text-lg sm:p-0 text-white">
                    Foster collaboration with tailored campaigns <br /> and clear goals. Empower leaders to inspire their teams <br /> and achieve success, one campaign at a time.
                </p>
                <Link to={'/register'} className=" bg-white hover:gap-2 hover:duration-100 w-32 h-11 flex justify-center items-center rounded-md gap-1 active:scale-95">
                    <span className="font-semibold">Get Started</span>
                    <span><RightFacingArrow /></span>
                </Link>
            </div>
        </section>
    )
}

function StandOut() {
    return (
        <section className="w-full min-h-[32rem] flex flex-col items-center sm:gap-1 lg:gap-3 justify-center bg-fadedGrayBg overflow-hidden">
            <h1 className="roboto-bold sm:text-2xl lg:text-4xl text-center sm:mb-0 lg:mb-10">
                Why SalesVerse Stands Out
            </h1>
            <div name="featureWrapper" className=" w-full h-[20rem] sm:overflow-x-scroll lg:overflow-x-auto overflow-y-hidden flex sm:justify-start lg:justify-center items-center sm:gap-4 lg:gap-7 p-3">
                <div name="firstFeature" className="lg:basis-64 flex-grow-0 flex-shrink-0 sm:h-64 sm:w-52 flex flex-col justify-center items-start p-3 rounded-md shadow-lg bg-gradient-to-bl from-mygreen-750 via-mygreen-500 to-mygreen-300 text-white overflow-hidden">
                    <Bolt />
                    <h3 className="lg:text-xl sm:text-base roboto-bold sm:my-1 lg:my-5">Intuitive and Effortless</h3>
                    <p className="roboto-regular sm:text-sm">
                        Say goodbye to complexity. SalesVerse features a simplified user interface 
                        {" that’s"} easy to navigate—no steep learning curve, just seamless productivity
                        from day one.
                    </p>
                </div>
                <div name="secondFeature" className="lg:basis-64 flex-grow-0 flex-shrink-0 sm:h-64 sm:w-52 flex flex-col justify-center items-start p-3 rounded-md shadow-lg bg-gradient-to-bl from-mygreen-750 via-mygreen-500 to-mygreen-300 text-white overflow-hidden">
                    <QuestionMarkCircle />
                    <h3 className="lg:text-xl sm:text-base roboto-bold sm:my-1 lg:my-3">Guided Every Step of the Way</h3>
                    <p className="roboto-regular sm:text-sm">
                        Need help? {"We've"} got you covered. Access built-in 
                        guides that make accomplishing tasks straightforward 
                        and stress-free, ensuring everyone stays on track.
                    </p>
                </div>
                <div name="thirdFeature" className="lg:basis-64 flex-grow-0 flex-shrink-0 sm:h-64 sm:w-52 h-72 flex flex-col justify-center items-start p-3 rounded-md shadow-lg bg-gradient-to-bl from-mygreen-750 via-mygreen-500 to-mygreen-300 text-white overflow-hidden">
                    <BriefCase />
                    <h3 className="lg:text-xl sm:text-base roboto-bold sm:my-1 lg:my-3">Clear Communication, Better Results</h3>
                    <p className="roboto-regular sm:text-sm">
                        Enhance efficiency with memos and job aids designed
                        to assist your team while they work. 
                        Keep communication clear and ensure every task 
                        is done right the first time.
                    </p>
                </div>

            </div>
            <Link to={'/register'} className=" bg-mygreen-700 hover:gap-2 hover:duration-100 w-28 h-11 flex justify-center items-center rounded-md gap-1 active:scale-95 text-white">
                <span className="font-semibold text-white">Free Trial</span>
                <span><RightFacingArrow /></span>
            </Link>

        </section>
    )
}

function Home() {
  return (
    <>
        <main className=" w-screen h-screen overflow-y-sroll overflow-x-hidden">
            <CookieBanner />
            <Hero />
            <RemoteTeams />
            <SalesAndCommission />
            <CampaignsAndGoals />
            <StandOut />
            <Footer />
        </main>
    </>
  )
}

export default Home