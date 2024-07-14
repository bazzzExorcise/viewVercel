import React from 'react'
import { Link } from 'react-router-dom'

export const ButtonCardBg = (props) => {
  return (
    <Link to={props.to} className='w-full items-center flex-row-reverse flex justify-center gap-2 text-sm bg-black text-white hover:scale-105 duration-300 rounded-md border border-black p-2'>  
      {props.text}
      {props.icon}
    </Link>
  )
}

export const ButtonCardBorder = (props) => {
  return (
    <Link to={props.to} className='w-full items-center flex-row-reverse flex justify-center gap-2 text-sm bg-white text-black hover:scale-105 duration-300 rounded-md border border-black p-2'>  
      {props.text}
      {props.icon}
    </Link>
  )
}