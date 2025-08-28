import { Link } from "react-router-dom"
import transparentLogo from "../image-assets/logo-transparent-png.png"

function Footer() {
  return (
    <footer className="w-full h-auto flex flex-col bg-gradient-to-br from-mygreen-750 to-mygreen-500 lg:px-8 sm:pr-4 lg:pt-10 sm:pt-4 pb-5">
        <div className="w-full min-h-18 flex items-start justify-between  mb-2">
            <img src={transparentLogo} width={300} height={300} alt="salesverse logo" className="max-96 max-h-44 object-cover" />

            <div className="w-auto h-auto text-white flex sm:flex-col lg:flex-row  justify-center gap-3">
                <Link to={"/pricing"} className="underline active:no-underline">Pricing</Link>
                <Link to={"/contact"} className="underline active:no-underline">Contact</Link>
                <Link to={"/terms-of-use"} target="_blank" className="underline active:no-underline">Terms & Conditions</Link>
                <Link to={"/privacy-policy"} target="_blank" className="underline active:no-underline">Privacy Policy</Link>
            </div>
        </div>
        <p className="w-full text-white text-center">SalesVerse Inc. Copyright © {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer