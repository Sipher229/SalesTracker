/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import RightFacingArrow from "../utils/icons/RightFacingArrow";
import remoteTeamsImg from "../../remote-teamsCollage.jpg";
import salesAndCommissionsImg from "../../sales-commission.jpg";
import campaignsAndGoalsImg from "../../goals-camapaigns.jpg";
import Bolt from "../utils/icons/Bolt";
import QuestionMarkCircle from "../utils/icons/QuestionMarkCircle";
import BriefCase from "../utils/icons/BriefCase";
import { Link } from "react-router-dom";
import Footer from "../page-compontents/Footer/Footer";
import { useState } from "react";
import CloseMenu from "../utils/icons/CloseMenu";
import MenuIcon from "../utils/icons/MenuIcon";
import transparentLogo from "../page-compontents/image-assets/logo-transparent-png.png";
import CookieBanner from "../page-compontents/CookieBanner";


// Framer Motion Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

function DropDownMenu({ handleMenuIsOpen, menuIsOpen = false }) {
  return (
    <motion.div
      initial={{ x: 200, opacity: 0 }}
      animate={menuIsOpen ? { x: 0, opacity: 1 } : { x: 200, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-52 h-auto overflow-hidden sm:${menuIsOpen ? "" : "hidden"} lg:hidden bg-gradient-to-br from-mygreen-750 to-mygreen-500 sm:flex flex-col justify-start items-start absolute top-0 right-0 text-white roboto-regular`}
    >
      <span className="w-full h-12 pt-8 bg-transparent border-y-0 border-white p-3 flex justify-end pr-2">
        <button
          onClick={() => handleMenuIsOpen()}
          className="w-auto lg:hover:cursor-default h-auto flex justify-start items-center gap-3"
        >
          <CloseMenu />
        </button>
      </span>
      <Link to={"/login"} className="w-full hover:scale-105 bg-transparent border-y-0 border-white p-3 text-center hover:cursor-pointer hover:bg-mygreen-300">Log In</Link>
      <Link to={"/register"} className="w-full hover:scale-105 bg-transparent border-y-0 border-white p-3 text-center hover:cursor-pointer hover:bg-mygreen-300">Sign Up</Link>
      <Link to={"/pricing"} className="w-full bg-transparent hover:scale-105 border-y-0 border-white p-3 text-center hover:cursor-pointer hover:bg-mygreen-300">Pricing</Link>
      <Link to={"/contact"} className="w-full bg-transparent hover:scale-105 border-y-0 border-white p-3 text-center hover:cursor-pointer hover:bg-mygreen-300">Contact</Link>
    </motion.div>
  );
}

function Hero() {
  const [menuIsOpen, setmenuIsOpen] = useState(false);

  const handleMenuIsOpen = () => {
    setmenuIsOpen(false);
  };

  return (
    <motion.section
      className="w-screen min-h-[38rem] bg-gradient-to-br bg-green-analytics bg-no-repeat bg-cover flex flex-col"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <header className="w-full h-16 bg-transparent mb-8">
        <nav className="w-full h-full flex justify-between items-center lg:pl-0 lg:pr-8 sm:px-4 relative">
          <motion.img
            src={transparentLogo}
            width={250}
            height={250}
            alt="salesverse logo"
            className="max-96 max-h-44 object-cover"
            whileHover={{ scale: 1.05 }}
          />
          <div className="w-96 lg:flex gap-5 h-auto justify-center items-center sm:hidden">
            <Link to={"/pricing"} className=" text-white roboto-medium hover:border-b-2 hover:border-white hover:pb-1">Pricing</Link>
            <Link to={"/contact"} className="text-white roboto-medium hover:border-b-2 hover:border-white hover:pb-1">Contact</Link>
            <Link to={"/register"} className="bg-white flex justify-center items-center rounded-md w-20 h-9 font-semibold active:scale-95">Sign up</Link>
            <Link to={"/login"} className="flex justify-center items-center rounded-md w-20 h-9 roboto-medium border-2 border-white text-white active:scale-95">Log in</Link>
          </div>
          <button onClick={() => setmenuIsOpen(true)} className={`w-auto sm:${!menuIsOpen ? "" : "hidden"} h-auto flex justify-start items-center gap-3 lg:hidden`}>
            <MenuIcon />
          </button>
          <DropDownMenu menuIsOpen={menuIsOpen} handleMenuIsOpen={handleMenuIsOpen} />
        </nav>
      </header>
      <motion.div
        className="flex flex-col justify-center items-center w-full h-auto gap-4"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={fadeUp} className="text-white text-center roboto-medium sm:text-2xl lg:text-3xl lg:mb-6">
          Simplify Sales and Performance Tracking with SalesVerse
        </motion.h2>
        <motion.p variants={fadeUp} className="roboto-regular text-mygreen-100 max-w-[26] text-center sm:text-lg lg:text-xl px-2">
          Boost productivity and gain real-time insights into your {"workforce's"} performance.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link to={"/register"} className="bg-white hover:gap-2 hover:duration-100 w-28 h-11 flex justify-center items-center rounded-md gap-1 active:scale-95">
            <span className="font-semibold">Free Trial</span>
            <span><RightFacingArrow /></span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
function ServicesOffered() {
    const services = [
        {
            title: "Campaign-based team management",
            description: "Organize campaigns, assign tasks, and keep everyone aligned effortlessly."
        },
        {
            title: "Team-based goal setting",
            description: "Set measurable, achievement-driven goals for better performance tracking."
        },
        {
            title: "Performance metrics dashboard",
            description: "Get real-time visibility into KPIs and make data-driven decisions faster."
        },
        {
            title: "Centralized company communications",
            description: "Keep everyone informed and connected with a single communication hub."
        },
        {
            title: "Built-in user guides",
            description: "Onboard your team quickly with intuitive and easy-to-follow guides."
        }
    ];

    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full min-h-[36rem] bg-gradient-to-bl from-mygreen-750 via-mygreen-500 to-mygreen-300 flex flex-col lg:flex-row justify-center items-center lg:items-start sm:p-6 lg:p-12 gap-10"
        >
            {/* LEFT SECTION */}
            <motion.div
                variants={fadeUp}
                className="lg:w-1/3 sm:w-full flex flex-col justify-start items-start text-white sm:text-center lg:text-left sm:mb-6 lg:mb-0"
            >
                <h1 className="roboto-bold sm:text-2xl lg:text-4xl mb-4">Our Services</h1>
                <p className="roboto-regular sm:text-base lg:text-lg max-w-md leading-relaxed">
                    SalesVerse provides powerful tools to manage campaigns, track performance, and improve collaboration.
                </p>
                <Link
                    to={"/register"}
                    className="mt-8 bg-white hover:gap-2 hover:duration-100 w-32 h-12 flex justify-center items-center rounded-md gap-1 active:scale-95"
                >
                    <span className="font-semibold text-black">Free Trial</span>
                    <spa className="text-black"><RightFacingArrow /></spa>
                </Link>
            </motion.div>

            {/* RIGHT SECTION */}
            <div className="lg:w-2/3 sm:w-full grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        variants={fadeUp}
                        className="p-5 rounded-md shadow-lg bg-white bg-opacity-10 backdrop-blur-md border border-white/20 hover:scale-105 hover:shadow-xl transition-all duration-200"
                    >
                        <h3 className="roboto-bold sm:text-lg lg:text-xl mb-2 text-white">
                            {service.title}
                        </h3>
                        <p className="roboto-regular sm:text-sm lg:text-base text-white/90">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}


function RemoteTeams() {
    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full min-h-[32rem] bg-fadedGrayBg flex flex-col lg:flex-row items-center justify-between sm:p-6 lg:p-12 gap-10"
        >

            {/* RIGHT */}
            <motion.div
                variants={fadeUp}
                className="lg:w-1/2"
            >
                <img
                    src={remoteTeamsImg}
                    alt="Remote Teams"
                    className="w-full h-auto rounded-lg shadow-xl"
                />
            </motion.div>
            {/* LEFT */}
            <motion.div
                variants={fadeUp}
                className="lg:w-1/2 sm:w-full sm:h-1/2 lg:h-full flex flex-col sm:justify-start lg:justify-center items-center sm:gap-2 lg:gap-10 sm:p-4 lg:p-10"
            >
                <h2 className="roboto-bold sm:text-2xl lg:text-4xl mb-4">Empower Your Sales Team Anywhere</h2>
                <p className="roboto-regular sm:text-base lg:text-lg leading-relaxed">
                    Enable your remote teams to work smarter with real-time insights, collaboration tools, and centralized communication channels.
                </p>
            </motion.div>


        </motion.section>
    );
}


function SalesAndCommission() {
    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full min-h-[32rem] bg-mygreen-100 flex flex-col lg:flex-row items-center justify-between sm:p-6 lg:p-12 gap-10"
        >
            {/* LEFT */}
            <motion.div
                variants={fadeUp}
                className="lg:w-1/2 sm:w-full lg:h-full sm:h-1/2 flex flex-col sm:justify-start lg:justify-center items-center sm:gap-2 lg:gap-10 lg:p-10 sm:p-4"
            >
                <h2 className="roboto-bold sm:text-2xl lg:text-4xl mb-4">Track Success, Earn Confidence</h2>
                <p className="roboto-regular sm:text-base lg:text-lg leading-relaxed">
                    Automate sales tracking and commission calculations effortlessly with real-time reports and dashboards to stay ahead of targets.
                </p>
            </motion.div>

            {/* RIGHT */}
            <motion.div
                variants={fadeUp}
                className="lg:w-1/2"
            >
                <img
                    src={salesAndCommissionsImg}
                    alt="Sales and Commission"
                    className="w-full h-auto rounded-lg shadow-xl"
                />
            </motion.div>
        </motion.section>
    );
}

function CampaignsAndGoals() {
    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full min-h-[32rem] bg-gradient-to-bl from-mygreen-750 via-mygreen-500 to-mygreen-300 flex flex-col lg:flex-row items-center justify-between sm:p-6 lg:p-12 gap-10"
        >

            {/* RIGHT */}
            <motion.div
                variants={fadeUp}
                className="lg:w-1/2"
            >
                <img
                    src={campaignsAndGoalsImg}
                    alt="Campaigns and Goals"
                    className="w-full h-auto rounded-lg shadow-xl"
                />
            </motion.div>

            {/* LEFT */}
            <motion.div
                variants={fadeUp}
                className="text-white lg:w-1/2 sm:w-full sm:h-1/2 lg:h-full flex flex-col justify-start items-center lg:gap-10 sm:gap-4 lg:p-10 sm:p-4"
            >
                <h2 className="roboto-bold sm:text-2xl lg:text-4xl mb-4">Drive Team Success Together</h2>
                <p className="roboto-regular sm:text-base lg:text-lg leading-relaxed">
                    Plan campaigns, set goals, and track performance seamlessly — all in one place. Boost accountability and transparency across teams.
                </p>
            </motion.div>
        </motion.section>
    );
}

function StandOut() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="w-full min-h-[32rem] flex flex-col items-center sm:gap-1 lg:gap-3 justify-center bg-fadedGrayBg overflow-hidden"
        >
            {/* Title */}
            <motion.h1
                variants={fadeUp}
                className="roboto-bold sm:text-2xl lg:text-4xl text-center sm:mb-0 lg:mb-10"
            >
                Why SalesVerse Stands Out
            </motion.h1>

            {/* Features Container */}
            <div
                name="featureWrapper"
                className="w-full h-[20rem] sm:overflow-x-scroll lg:overflow-x-auto overflow-y-hidden flex sm:justify-start lg:justify-center items-center sm:gap-4 lg:gap-7 p-3"
            >
                {/* First Feature */}
                <motion.div
                    variants={fadeUp}
                    name="firstFeature"
                    className="lg:basis-64 flex-grow-0 flex-shrink-0 sm:h-64 sm:w-52 flex flex-col justify-center items-start p-3 rounded-md shadow-lg bg-gradient-to-bl from-mygreen-750 via-mygreen-500 to-mygreen-300 text-white overflow-hidden"
                >
                    <Bolt />
                    <h3 className="lg:text-xl sm:text-base roboto-bold sm:my-1 lg:my-5">
                        Intuitive and Effortless
                    </h3>
                    <p className="roboto-regular sm:text-sm">
                        Say goodbye to complexity. SalesVerse features a simplified user interface
                        that’s easy to navigate—no steep learning curve, just seamless productivity
                        from day one.
                    </p>
                </motion.div>

                {/* Second Feature */}
                <motion.div
                    variants={fadeUp}
                    name="secondFeature"
                    className="lg:basis-64 flex-grow-0 flex-shrink-0 sm:h-64 sm:w-52 flex flex-col justify-center items-start p-3 rounded-md shadow-lg bg-gradient-to-bl from-mygreen-750 via-mygreen-500 to-mygreen-300 text-white overflow-hidden"
                >
                    <QuestionMarkCircle />
                    <h3 className="lg:text-xl sm:text-base roboto-bold sm:my-1 lg:my-3">
                        Guided Every Step of the Way
                    </h3>
                    <p className="roboto-regular sm:text-sm">
                        Need help?{" We've"} got you covered. Access built-in guides that make
                        accomplishing tasks straightforward and stress-free, ensuring everyone stays
                        on track.
                    </p>
                </motion.div>

                {/* Third Feature */}
                <motion.div
                    variants={fadeUp}
                    name="thirdFeature"
                    className="lg:basis-64 flex-grow-0 flex-shrink-0 sm:h-64 sm:w-52 h-72 flex flex-col justify-center items-start p-3 rounded-md shadow-lg bg-gradient-to-bl from-mygreen-750 via-mygreen-500 to-mygreen-300 text-white overflow-hidden"
                >
                    <BriefCase />
                    <h3 className="lg:text-xl sm:text-base roboto-bold sm:my-1 lg:my-3">
                        Clear Communication, Better Results
                    </h3>
                    <p className="roboto-regular sm:text-sm">
                        Enhance efficiency with memos and job aids designed to assist your team
                        while they work. Keep communication clear and ensure every task is done
                        right the first time.
                    </p>
                </motion.div>
            </div>

            {/* Free Trial Button */}
            <motion.div variants={fadeUp}>
                <Link
                    to={"/register"}
                    className="bg-mygreen-700 hover:gap-2 hover:duration-100 w-28 h-11 flex justify-center items-center rounded-md gap-1 active:scale-95 text-white mt-4"
                >
                    <span className="font-semibold text-white">Free Trial</span>
                    <span>
                        <RightFacingArrow />
                    </span>
                </Link>
            </motion.div>
        </motion.section>
    );
}



function Home() {
  return (
    <>
      <main className="w-screen h-screen overflow-y-scroll overflow-x-hidden">
        <CookieBanner />
        <Hero />
        <ServicesOffered />
        <RemoteTeams />
        <SalesAndCommission />
        <CampaignsAndGoals />
        <StandOut />
        <Footer />
      </main>
    </>
  );
}

export default Home;