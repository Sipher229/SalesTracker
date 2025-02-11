import transparentLogo from "../image-assets/logo-transparent-png.png"

function Logo(){
  return (
    <>
        <span className= {`bg-inherit w-auto h-16 flex flex-col justify-center items-center `}>
            <img src={transparentLogo} width={250} height={250} alt="salesverse logo" className="max-96 max-h-44 object-cover" />
            {/* <span className={`roboto-light text-sm text-center text-white`}>Winning Mode</span> */}
        </span>
    </>
  )
}
export default Logo