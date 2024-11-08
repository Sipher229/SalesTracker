/* eslint-disable react/prop-types */
import DeleteIconX from "../../utils/icons/DeleteIconX"
import './css-files/ErrorDisplayer.css'

function ErrorDiplayer({errorTickets = [], emptyTickets}) {
  return (
    <>
        {
          errorTickets.length === 0
          ? ''  
          :
          <div 
          className='error-display-animation w-2/5 h-1/5 bg-red-200 flex flex-col justify-center items-start px-5 pt-1 rounded-md overflow-scroll scrollbar-hide absolute top-0 right-1/6 shadow-lg'>
            <div className='flex justify-between w-full'>  
              <h1 className='text-red-700 roboto-bold'>Please correct the following errors</h1>
              <button className='text-red-700 '  onClick={emptyTickets}>
                <DeleteIconX />
              </button>
            </div>
            <ul className='list-disc text-red-700 roboto-medium pl-6'>
              {
                errorTickets.map((ticket, idx)=> {
                  return <li key={idx} className='text-sm'>{ticket}</li>
                })
              }
            </ul>
          </div>
        }
    </>
  )
}

export default ErrorDiplayer

