import React from 'react'
import logofruit from '../assets/fruit logo.png';
import user from '../assets/user.png'

export default function Navbar(props) {
  return (
    <div className='w-[100%] px-14 py-5 bg-gray-700 flex justify-between items-center'>
        <div className='flex items-center'>
            <img src={logofruit} className="w-[6%] rounded-full" />
            <h2 className='text-white text-3xl font-semibold ml-4'>Fruits</h2>
        </div>
        <img src={user} onClick={()=>{props.setLogin(true)}} alt="" className="user w-[3.5%] h-[3%] cursor-pointer hover:w-[3.9%]" />
    </div>
  )
}
