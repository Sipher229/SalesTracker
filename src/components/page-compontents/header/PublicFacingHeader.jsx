import { Link } from "react-router-dom"

function PublicFacingHeader() {
  return (
            <header className="w-full h-16 bg-gradient-to-tl from-mygreen-750 to-mygreen-500">
                <nav className="w-full h-full flex justify-between items-center lg:p-8 sm:p-4">
                    <h1 name="logo" className="roboto-bold lg:text-4xl sm:text-3xl text-center text-myyellow">SalesVerse</h1>
                    <div className="w-48 flex gap-5 h-auto justify-end items-center">
                        <Link to={'/login'} className="flex justify-center items-center rounded-md w-20 h-9 roboto-medium border-2 border-white text-white active:scale-95">Log in</Link>
                    </div>
                </nav>
            </header>
  )
}

export default PublicFacingHeader