import React from 'react'

const Care = (props) => {
  return (
    <>
    <div className="care">
        <img src={props.img} ></img>
        <p>{props.text}</p>
    </div>
    </>
  )
}

export default Care