import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../imgs/Logo.png'

const Home = () => {
  return (
    <div className="bg-[#292929] min-h-screen w-full flex justify-center">
      <div className="flex w-[672px] justify-center flex-col">
        <div className="w-full flex items-end mb-[22px] flex-col">
          <span className="font-sans text-gray-700 text-[16px] mb-3">
            created by AndreyR1se |
          </span>
          <img src={logo} alt="Logo" />
        </div>
        <span className=" flex font-sans text-white text-[18px] font-[700] h-[56px] w-[147px] bg-[#15B743] items-center justify-center rounded mb-[32px]">
          TEST TASK
        </span>
        <span className="text-[#292929] bg-white flex font-sans text-[64px] font-[700] h-[109px] w-full  items-center justify-center rounded mb-[25px]">
          JUNIOR FRONTEND
        </span>
        <div className="flex justify-end">
          <Link to="/calendar" className="flex font-sans text-white text-[18px] font-[700] h-[56px] w-[147px] bg-[#27A1FF] items-center justify-center rounded  cursor-pointer hover:scale-[1.16] transition-all">
            CALENDAR
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home