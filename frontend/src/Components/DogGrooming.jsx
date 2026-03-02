import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Components(props){
  const [trigger,setTrigger]=useState(false);
  const Navigate=useNavigate();
  
  return(
    <>
   <div className='card'>
    <p className='title'>{props.title}</p>
    <img src={props.img}/>
    <p>{props.text}</p>
    <button onClick={()=>{setTrigger(true)
                          Navigate("/Popup",{state:{servicename:props.title}})
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
      <Components title="Paw trim"
                  img="../../public/Images/dog hair cut_groom.webp" 
                  text="Expert trimming for a clean and stylish coat.
Keeps your dog cool, neat, and comfortable.🐶"
          />
      <Components img="../../public/Images/cat haircut.jpg"
                  text="Gentle grooming tailored for your feline friend.
Soft, smooth, and perfectly shaped fur.🐱"
                  title="kitty cut"
          />
      <Components img="../../public/Images/vet3.jpeg"
                  text="Safe, pet-friendly colors for a bold new look.
Adds shine and fun to your dog’s coat.🐾"
                  title="Paw tint"
          />
        
        <br/>
        <Components img="../../public/Images/c1.jpg"
                  text="Carefully applied color for a graceful finish.
Enhances your cat’s natural elegance.🍃"
                  title="kitty tint"
          />
        <Components img="../../public/Images/vet2.jpeg"
                  text="Includes a refreshing bath and gentle nail trimming.
A complete clean-up for a polished, adorable look.✨."
                  title="Pet Glow-Up"
          />
          <Components img="../../public/Images/petcaaresitter.webp"
                  text="Loving supervision and attention throughout the day.
Playtime, comfort, and proper care while you're away.💕"
                  title="Pet Caretaker"
          />
      </div>
      </div>

    </>
  )
}

export default DogGrooming