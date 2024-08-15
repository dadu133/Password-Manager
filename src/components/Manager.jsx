import React, { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { BsBuildingAdd } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { MdEdit,MdDelete } from 'react-icons/md';
export default function Manager() {
 async function getpassword(){

   let req=await fetch('http://localhost:3000')
   let passwords = await req.json();
   console.log(passwords)
     setPasswordarray(passwords) 
 }
  let ref=useRef();
  useEffect(() => {
    getpassword();
  }, [])
  let [passwordarray, setPasswordarray] = useState([]);
  let [form, setForm] = useState({});
  function showpassword() {
  if(ref.current.type==='text'){
    ref.current.type="password";
  }
  else{
    ref.current.type='text'
  }
  }
  function copytext(data){
    alert("copies the text");
    navigator.clipboard.writeText(data);
  }
 async function deletepassword(id){
    let c=confirm("Do you really want to delete the password ?");
    if(c){
      let req=await fetch('http://localhost:3000',{
        method:"DELETE",
        headers:{
          "Content-type":'application/json',
        
        },
        body:JSON.stringify({id})        
      })
      console.log(req)
      setPasswordarray(passwordarray.filter(item=>item.id!=id))
      localStorage.setItem("passwords", JSON.stringify(passwordarray.filter(item=>item.id!=id)))
      console.log("deleting the password with id "+id);
    }else{

    }
  }
  function editpassword(id){   
    setForm({...passwordarray.filter(item=>item.id===id)[0],id:id})
    setPasswordarray(passwordarray.filter(item=>item.id!=id))
  }
 async function savepassword() {
  let res=await fetch('http://localhost:3000',{
    method:"DELETE",
    headers:{
      "Content-type":'application/json',
    
    },
    body:JSON.stringify({id:form.id})        
  }) 
  let req=await fetch('http://localhost:3000',{
          method:"post",
          headers:{
            "Content-type":'application/json',
          
          },
          body:JSON.stringify({...form,id:uuidv4()})        
        })
        console.log(req)
      setPasswordarray([...passwordarray, {...form,id:uuidv4()}])
      //localStorage.setItem("passwords", JSON.stringify([...passwordarray,{...form,id:uuidv4()}]))
      setForm({site:"",username:"",password:""})
  }
  function handlechange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
      <div className='md:mycontainer'>

        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-800'>&lt;</span>Pass
          <span className='text-green-800'>OP&gt;</span></h1>
        <p className='text-green-700 text-lg text-center'>Your own pasword manager</p>

        <div className=' flex flex-col p-4 text-black items-center'>

          <input value={form.site} onChange={handlechange} placeholder='Enter the website URL' className='rounded-full border-green-400 w-full border-2 my-4 px-4 py-2' type="text" name="site" />
          <input value={form.username} onChange={handlechange} placeholder='Enter the username' className='rounded-full border-green-400 w-full border-2 my-4 px-4 py-2' type="text" name="username" />
          <div className='relative w-full'>

            <input type='password' ref={ref} value={form.password} onChange={handlechange} placeholder='Enter the password' className='rounded-full border-green-400 w-full border-2 my-4 px-4 py-2' name="password" />
            <span className='absolute right-3 top-6 cursor-pointer' onClick={showpassword}><IoEyeSharp className='text-3xl'></IoEyeSharp></span>
          </div>

          <button onClick={savepassword} className='border border-green-900 flex items-center justify-center bg-green-400 rounded-full p-2 w-fit hover:bg-green-200'><BsBuildingAdd className='mx-2'></BsBuildingAdd>Add Password</button>
                </div>
        <div className="passwords">
          <h2 className='font-bold text-3xl py-5'>Your Passwords</h2>
  {passwordarray.length==0 && <div>No passwords to show</div>}
  {passwordarray.length!=0 && <table className='table-auto w-full rounded-2xl overflow-hidden'>
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-3'>Site</th>
                <th className='py-3'>Username</th>
                <th className='py-3'>Password</th>
                <th className='py-3'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordarray.map((item,index)=>{
              return <tr key={index}>
                <td className='py-2 border-2 border-white text-center min-w-32'>{item.site}<FaRegCopy className='inline-block mx-2 cursor-pointer' onClick={()=>{copytext(item.site)}}></FaRegCopy></td>
                <td className='py-2 border-2 border-white text-center min-w-32'>{item.username}<FaRegCopy className='inline-block mx-2 cursor-pointer' onClick={()=>{copytext(item.username)}}></FaRegCopy></td>
                <td className='py-2 border-2 border-white text-center min-w-32'>{"*".repeat(item.password.length)}<FaRegCopy className='inline-block mx-2 cursor-pointer' onClick={()=>{copytext(item.password)}}></FaRegCopy></td>
                <td className='py-2 border-2 border-white text-center min-w-32'><MdDelete onClick={()=>{deletepassword(item.id)}} className='cursor-pointer inline-block mx-2 text-2xl'></MdDelete><MdEdit className='inline-block mx-2 text-2xl cursor-pointer' onClick={()=>{editpassword(item.id)}}></MdEdit></td>
              </tr>
              })}
              
            </tbody>
          </table>}
        </div>
      </div>

    </>
  )
}
