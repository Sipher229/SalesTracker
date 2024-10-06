import './css-files/SideNav.css'
import FoldingLinkWrapper from './FoldingLinkWrapper.jsx'
import allLinks from './allLinks.js'
function SideNav() {
  return (
    <>
      <aside className='flex flex-col justify-start pt-8 items-start w-72 gap-12 overflow-y-scroll scrollbar-hide box-border side-nav-height bg-gradient-to-br from-mygreen-750 via-mygreen-500 to-mygreen-300'>
        <div className='flex justify-center w-full min-h-2 min-width-0 '>  
          <button className=' shadow-md rounded-md w-36 h-10 bg-mylightgreen-300 text-white'>New Sale</button>
        </div>
        {
          allLinks.map((link, idx) => {
              return (
                <div key={idx} className='min-h-0 min-w-full'>
                  <FoldingLinkWrapper name={link.name} subLinks={link.children} />

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