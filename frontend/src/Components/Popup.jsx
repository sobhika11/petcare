import React from 'react'
import { useNavigate } from 'react-router-dom'
export const Popup = (props) => {
const Navigate=useNavigate();
  return (
    <>
    <div className='popup-overlay'>
        <div className='popup'>
        
        <button onClick={()=> {props.setTrigger(false)
                             Navigate("/Receipt",{replace:true})}
        }>Confirm</button>
    </div>
    </div>
    </>
  )
}
