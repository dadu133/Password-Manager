import React from 'react'
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
<div className='bg-slate-800 w-full text-white flex flex-col justify-center items-center'>
<div className='logo font-bold text-white text-2xl'>
         <span className='text-green-800'>&lt;</span>Pass
         <span className='text-green-800'>OP&gt;</span>
          </div>
    <div className='flex justify-center items-center'>
      Created with  <FaHeart className='mx-2 text-red-700 text-2xl'></FaHeart> by Code with Harry
    </div>
</div>
  )
}
