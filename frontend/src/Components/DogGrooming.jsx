import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Components(props){
  const [trigger,setTrigger]=useState(false);
  const Navigate=useNavigate();
  
  return(
    <>
   <div className='card'>
    <img src={props.img}/>
    <p>{props.text}</p>
    <button onClick={()=>{setTrigger(true)
                          Navigate("/Popup")
    }}>Book Now</button>
   </div>
  </>
  )
}
   

const DogGrooming = () => {
  return (
    <>
    
      <div className='booking'>
      <div className='booking-inner-div'>
      <Components img="../../public/Images/anidcare2.jpg" 
                  text="In Java, the long data type is a 64-bit signed integer that uses two’s complement representation "
          />
      <Components img="../../public/Images/anidcare3.avif"
                  text="In Java, the long data type is a 64-bit signed integer that uses two’s complement representation."
          />
      <Components img="../../public/Images/anidcare3.avif"
                  text="In Java, the long data type is a 64-bit signed integer that uses two’s complement representation."
          />
        
        <br/>
        <Components img="../../public/Images/anidcare3.avif"
                  text="In Java, the long data type is a 64-bit signed integer that uses two’s complement representation."
          />
        <Components img="../../public/Images/anidcare3.avif"
                  text="In Java, the long data type is a 64-bit signed integer that uses two’s complement representation."
          />
          <Components img="../../public/Images/anidcare3.avif"
                  text="In Java, the long data type is a 64-bit signed integer that uses two’s complement representation."
          />
      </div>
      </div>

    </>
  )
}

export default DogGrooming