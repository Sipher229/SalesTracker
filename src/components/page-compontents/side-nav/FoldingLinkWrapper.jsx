/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"
import ChevronUp from "../../utils/icons/ChevronUp.jsx"
import ChevronDown from "../../utils/icons/ChevronDown.jsx"
import { useState, } from "react"
import './css-files/FoldingLinkWrapper.css'
function FoldingLinkWrapper({name='', subLinks=[]}) {

    const [isFolded, setIsFolded] = useState(true)
    

    return (
        <>
            <span 
            className={ `w-full min-w-full pl-10 py-3 box-border min-h-12 flex flex-col ${isFolded ? '' : 'unfold'} h-10 overflow-hidden justify-start items-start`}>
                
                <button 
                className="w-full text-start flex justify-between items-center h-4 pr-16 my-3"
                onClick={()=> setIsFolded((prev) => !prev)}
                >
                    <span className="text-mygreen-100 w-full roboto-light ">{name}</span>
                    {isFolded? <ChevronUp /> : <ChevronDown />}
                     
                </button>
                
                {subLinks.map((child, idx) => {
                    return (
                        <span className="ml-7 my-1" key={idx}> <NavLink className={({isActive})=> [isActive? 'text-white roboto-medium':'text-mygreen-100 roboto-light']} to={child.url}>{child.name}</NavLink></span>
                    )
                })}
            </span>
        </>
    )
}


export default FoldingLinkWrapper