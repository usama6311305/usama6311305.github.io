import React, { useState } from 'react'

const Test = () => {
    const [count, setCount]= useState();
  return (
    <div>
       <div onClick={()=>setCount(count + 1)}>
        incrment
        
        </div>   
    </div>
  )
}

export default Test