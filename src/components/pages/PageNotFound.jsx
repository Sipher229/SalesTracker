import { Link } from "react-router-dom"

function PageNotFound() {
  return (
    <>
      <main className="w-full h-full bg-green-landscape-hd bg-no-repeat bg-cover flex justify-center items-center">
        <div className="bg-white w-1/2 h-[16rem] p-6 rounded-md shadow-lg flex flex-col justify-center items-center">
          <h1 className="text-6xl roboto-bold">404</h1>
          <p className="roboto-medium text-lg">Page not found</p>
          <Link to={'/layout/dashboard'} className="text-mylightgreen-300 underline active:no-underline underline-offset-2 roboto-medium">To Dashboard </Link>
        </div>
      </main>
    </>
  )
}

export default PageNotFound