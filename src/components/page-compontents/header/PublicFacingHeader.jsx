import { Link } from "react-router-dom"
import transparentLogo from "../image-assets/logo-transparent-png.png"

function PublicFacingHeader() {
  return (
            <header className="w-full h-16 bg-gradient-to-tl from-mygreen-750 to-mygreen-500">
                <nav className="w-full h-full flex justify-between items-center lg:pl-0 lg:pr-8 sm:p-4">
                    <img src={transparentLogo} width={250} height={250} alt="salesverse logo" className="max-96 max-h-44 object-cover" />
                    <div className="w-48 flex gap-5 h-auto justify-end items-center">
                        <Link to={'/login'} className="flex justify-center items-center rounded-md w-20 h-9 roboto-medium border-2 border-white text-white active:scale-95">Log in</Link>
                    </div>
                </nav>
            </header>
  )
}

export default PublicFacingHeader