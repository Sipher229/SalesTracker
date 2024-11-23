/* eslint-disable react/prop-types */
import DeleteIconX from "../utils/icons/DeleteIconX"
import './css-files/ErrorDisplayer.css'
import { useSelector } from "react-redux"

function ErrorDiplayer({emptyTickets, positionForHeader=false}) {
  const {errorTickets, error} = useSelector((state) => state.errorTickets)
  return (
    <>
        {
          errorTickets.length === 0
          ? ''  
          :
          <div 
          className={`error-display-animation w-2/6 min-h-24 ${error? 'bg-red-200': 'bg-mylightgreen-100'} flex flex-col justify-center items-start px-5 rounded-md overflow-scroll scrollbar-hide absolute top-0 ${positionForHeader? 'right-1/4' : 'right-1/6'} shadow-lg`}>
            <div className='flex justify-end w-full gap-10'>  
              { error? <h1 className="text-red-700 roboto-bold w-5/6 text-left">Please correct the following errors</h1>: ''}
              <button className={`${error?'text-red-700': 'text-mygreen-700 self-end'}`}  onClick={emptyTickets}>
                <DeleteIconX />
              </button>
            </div>
            <ul className={`list-disc ${error? "text-red-700" : "text-mygreen-700"}  roboto-medium pl-6`}>
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

