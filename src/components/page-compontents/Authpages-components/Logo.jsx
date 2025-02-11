import { Link } from "react-router-dom"
import logo from "../image-assets/logo-png.png"
function Logo(){

    return (
      <>
        <Link to={"/"}>

          <span className= {`bg-inherit w-auto h-16 flex flex-col justify-center items-center rounded-lg overflow-hidden `}>
              <img src={logo} width={200} height={200} alt="salesverse logo" className="max-96 max-h-44 object-cover " />
              {/* <span className={`roboto-light text-sm text-center text-white`}>Winning Mode</span> */}
          </span>
        </Link>
      </>
    )
  }

  export default Logo