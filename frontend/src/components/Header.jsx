import React from 'react'
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import logo from '../images/view logo - title less.png'

const Header = (props) => {
  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.removeItem('currentUser')
    navigate("/login")
  }
  return (
    <header className="">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 aspect-square border border-black rounded-full">
              <img src={logo} className='w-full max-w-8' alt="" />
            </div>
            <div className="text-left">
              <h1 className="text-base font-bold text-gray-900 sm:text-3xl">Hallo, {props.text}</h1>
              <p className="mt-1.5 text-sm text-gray-500">{props.admin == 'true'?'saatnya melihat aktifitas siswa' : 'saatnya absen brow'}</p>
            </div>
          </div>
          <button onClick={handleLogOut}
            className="block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
            type="button"
            >
            <AiOutlineLogout/>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
