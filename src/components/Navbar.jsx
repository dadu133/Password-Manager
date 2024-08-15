import React from 'react'
import { FaGithub } from 'react-icons/fa'
export default function Navbar() {
  return (
    <nav className='bg-slate-800 '>
        <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">

        <div className='logo font-bold text-white text-2xl'>
         <span className='text-green-800'>&lt;</span>Pass
         <span className='text-green-800'>OP&gt;</span>
          </div>
      <ul className='flex gap-4 text-white'>
        <li><a className='hover:font-bold' href='/'>Home</a> </li>
        <li><a className='hover:font-bold' href='/'>About</a> </li>
        <li><a className='hover:font-bold' href='/'>Contact</a> </li>
    </ul>
<button className='text-white bg-green-700 rounded-full my-5 flex  justify-between items-center ring-white ring-1'>
<FaGithub className='text-3xl p-1'></FaGithub>
<span className='font-bold px-4'>GitHub</span>
</button>
        </div>
    </nav>
  )
}