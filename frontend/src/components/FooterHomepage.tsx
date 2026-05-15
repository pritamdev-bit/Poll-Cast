import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function FooterHomepage() {
  const navigate = useNavigate();

  return (
    <footer className='w-full p-3 mt-2 sm:mt-0'>
        <div className='flex bg-[#f5f8e5] py-4 items-center justify-center flex-col gap-1 border sm:w-[82vw] w-full rounded-md lg:mx-auto'>
            <h3 className='text-2xl font-extrabold'>Ready to get started?</h3>
            <p className='text-[12px] font-bold text-[#1A1A1A]/60'>Join thousands of teams and creators using PollCast.</p>
            <button
              onClick={() => {
                navigate('/sign-up');
              }} 
              className='px-8 py-2 text-[12px] bg-[#C6EF8C] font-bold border rounded-full hover:shadow-[3px_3px_0px_0px_#000] shadow-none transition-all duration-500 cursor-pointer'>SIGN UP FREE</button>
            <p className='text-[12px] font-bold text-[#1A1A1A]/60'>No credit card required</p>
        </div>
    </footer>
  )
}
