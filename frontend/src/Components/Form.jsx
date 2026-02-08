import React from 'react'

const Form = () => {
  return (
    <>
    <div>
        <form onsubmit="{handlesubmit}">
           <input
           type="week"
           value={week}
           
           />
        </form>
    </div>
    </>
  )
}

export default Form