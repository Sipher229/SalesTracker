/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"
import ChevronUp from "../../utils/icons/ChevronUp.jsx"
import ChevronDown from "../../utils/icons/ChevronDown.jsx"
import { useEffect, useState, } from "react"
import './css-files/FoldingLinkWrapper.css'
function FoldingLinkWrapper({name='', subLinks=[]}) {

    const [isFolded, setIsFolded] = useState(true)

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') setIsFolded(false)
        })
        return () => {
            removeEventListener('keydown', (e) => {
                if (e.key === 'Tab') setIsFolded(false)
            })
        }
    }, [])
    

    return (
        <>
            <span 
            className={ `w-full min-w-full pl-10 py-3 min-h-10 flex flex-col ${isFolded ? 'fold' : 'unfold'} h-8 overflow-hidden justify-start items-start outline-white`}>
                
                <button 
                className="w-full text-start flex justify-between items-center h-4 pr-20 hover:underline hover:decoration-mygreen-100 hover:underline-offset-2 my-2 outline-white"
                onClick={() => setIsFolded(!isFolded)}
                >
                    <span className="text-mygreen-100 w-full roboto-light outline-white">{name}</span>
                    {isFolded? <ChevronUp /> : <ChevronDown />}
                     
                </button>
                
                {subLinks.map((child, idx) => {
                    return (
                        <span className="ml-7 " key={idx}> <NavLink className={({isActive})=> [isActive? 'text-white roboto-bold':'text-mygreen-100 roboto-light outline-white']} to={child.url}>{child.name}</NavLink></span>
                    )
                })}
            </span>
        </>
    )
}


export default FoldingLinkWrapper