import React from 'react'

const Input = (props) => {
  return (
    <input type={props.type} name={props.name} placeholder={props.placeholder} className='w-full flex justify-center gap-2 text-black hover:scale-105 text-sm duration-300 rounded-md border border-neutral-200 p-4'/>  
  )
}

export default Input