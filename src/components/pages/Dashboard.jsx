import Header from "../page-compontents/header/Header.jsx"
import SideNav from "../page-compontents/side-nav/SideNav.jsx"

function Dashboard() {
  return (
    <article className="w-full h-full flex flex-col">
      <div className="w-full h-14">
        <Header />

      </div>
      <div className="w-full h-full flex">
        <div className="w-72 h-full ">
          <SideNav />
        </div>
        <div className="h-full w-11/12"></div>
      </div>
    </article>
  )
}

export default Dashboard