import Header from "../page-compontents/header/Header.jsx"
import SideNav from "../page-compontents/side-nav/SideNav.jsx"
import { Outlet } from "react-router-dom"

function Dashboard() {
  

 
  return (
    <article className="w-full h-full flex flex-col">
      <div className="w-full h-16">
        <Header />

      </div>
      <div className="w-full h-full flex overflow-hidden">
        <div className="w-72 h-full ">
          <SideNav />
        </div>
        <div className='w-full h-full'>
          <Outlet />
        </div>
      </div>
    </article>
  )
}

export default Dashboard