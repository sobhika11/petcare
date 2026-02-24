import React from 'react'
function Components(props){
  return(
    <>
   <div className='card'>
    <img src={props.img} />
    <p>{props.text}</p>
    <button>Book Now</button>
   </div>
  </>
  )
   
}
const DogGrooming = () => {
  return (
    <>
    <div >
    

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
      </div>
      </div>

    </div>
    </>
  )
}

export default DogGrooming