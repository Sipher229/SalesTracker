import { useNavigate } from "react-router-dom"

function PageNotFound() {
  const navigate = useNavigate()
  return (
    <>
      <main className="w-full h-full bg-green-landscape-hd bg-no-repeat bg-cover flex justify-center items-center">
        <div className="bg-white w-1/2 h-[16rem] p-6 rounded-md shadow-lg flex flex-col justify-center items-center">
          <h1 className="text-6xl roboto-bold">404</h1>
          <p className="roboto-medium text-lg">Page not found</p>
          <button 
          onClick={() => navigate(-1)}
          className="text-mylightgreen-300 underline active:no-underline underline-offset-2 roboto-medium">Back </button>
        </div>
      </main>
    </>
  )
}

export default PageNotFound