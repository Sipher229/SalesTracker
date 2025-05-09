import './css-files/SideNav.css'
import FoldingLinkWrapper from './FoldingLinkWrapper.jsx'
import { NavLink, Link } from 'react-router-dom'
import allLinks from './allLinks.js'
function SideNav() {
  return (
    <>
      <aside className='flex flex-col justify-start py-10 items-start w-72 gap-8 overflow-y-scroll bg-gradient-to-br from-mygreen-750 via-mygreen-500 to-mygreen-300 h-full'>
        <div className='flex justify-center w-full h-2 my-5 outline-white'>  
          <Link to={'/layout/newsale'} className='outline-none'><button className=' shadow-md rounded-md w-36 h-10 bg-mylightgreen-300 text-white active:scale-95 outline-white'>New Sale</button></Link>    
        </div>
        <NavLink
        to={'/layout/dashboard'} 
        className={({isActive})=>`${isActive ? 'h-2 text-white roboto-bold':'text-mygreen-100 roboto-light'} w-full text-start pl-10 flex justify-between items-center text-mygreen-100 h-4 hover:underline hover:decoration-mygreen-100 hover:underline-offset-2 mt-4 outline-white`}>
          Dashboard
        </NavLink>
        {
          allLinks.map((link, idx) => {
              return (
                <div key={idx} className='h-auto min-w-full flex flex-col gap-3'>

                  <FoldingLinkWrapper key={idx} name={link.name} subLinks={link.children} />
                </div>
              )
          })
        }
      </aside>

    </>
  )
}

export default SideNav

//TODO: create an object to  contain all the nav names and links
//TODO: create side nav and add background
//TODO: add the rest of the links