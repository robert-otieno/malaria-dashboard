import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SiIndeed } from 'react-icons/si'
import { MdOutlineCancel } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { useStateContext } from '../contexts/ContextProvider'

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, countriesData } = useStateContext()
  const [q, setQ] = useState("")
  const [filterParam, setFilterParam] = useState(["All"])

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  }

  const search = (countries) => {
    return countries.filter((country) => {
      if (country.region == filterParam) {
        return (
          country.name.common.toLowerCase().includes(q.toLowerCase())
        )
      } else if (filterParam == "All") {
        return (
          country.name.common.toLowerCase().includes(q.toLowerCase())
        )
      }
    })
  }

  const activeLink = 'flex items-center gap-5 pl-3 pt-1 pb-1 rounded-lg bg-teal-700 text-white text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-3 pt-1 pb-1 rounded-lg text-md text-teal-700 dark:text-teal-200 dark:hover:text-black hover:bg-light-teal m-2';

  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      {activeMenu && (<>
        <div className='flex justify-between items-center'>
          <Link to="/" onClick={handleCloseSideBar} className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'>
            <SiIndeed /> <span>IMalaria</span>
          </Link>

          <TooltipComponent content="Menu" position="bottomCenter">
            <button type='button' onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} className='text-xl rounded-full p-3 hover:bg-light-teal mt-4 block md:hidden'>
              <MdOutlineCancel />
            </button>
          </TooltipComponent>
        </div>

        <div className="mt-4">
          <p className="text-teal-500 m-2 font-semibold">Countries</p>

          <div className='bg-white space-y-4 px-3 py-2'>
            <form className="relative">
              <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-teal-500" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
              </svg>
              <input className="focus:ring-teal-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter countries" placeholder="Filter countries..." value={q} onChange={(e) => setQ(e.target.value)} />
              <span className="sr-only">Filter countries here</span>
            </form>

            <select onChange={(e) => { setFilterParam(e.target.value) }} className="mt-1 block w-full rounded-md ring-1 ring-slate-200 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-teal-500 sm:text-sm" aria-label="Filter Countries By Region">
              <option value="All">Filter By Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>

          {search(countriesData).map((country) => (
            <NavLink to={`/${country.cca3.toLowerCase()}`} key={country.cca3} onClick={handleCloseSideBar} className={({ isActive }) => isActive ? activeLink : normalLink} >
              <span className="capitalize">{country.name.common}</span>
            </NavLink>
          ))}
        </div>
      </>)}
    </div>
  )
}

export default Sidebar