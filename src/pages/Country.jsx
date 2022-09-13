import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoIosPeople, IoIosCloudOutline } from 'react-icons/io'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { BiWorld, BiMapPin } from 'react-icons/bi'
import { GiAmberMosquito } from 'react-icons/gi'

import Map from './Map'

import { useStateContext } from '../contexts/ContextProvider'

const Country = () => {
  const { countryId } = useParams()
  const { countriesData } = useStateContext()
  const [isShown, setIsShown] = useState(false)

  const countryDetails = (countriesData, countryId) => {
    return countriesData.find((country) => {
      return country.cca3.toLowerCase() === countryId
    })
  }

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const country = countryDetails(countriesData, countryId)

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between p-2 md:ml-6 md:mr-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{country.name.common}</h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <FaMapMarkerAlt className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              {country.capital}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BiWorld className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              {country.region}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <IoIosPeople className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              {country.population}
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="hidden sm:block">
            <button type='button' onClick={handleClick} className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
              <BiMapPin className='-ml-1 mr-2 h-5 w-5 text-gray-500' />
              Near Me
            </button>
          </span>

          <span className="ml-3 hidden sm:block">
            <button type="button" className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
              <IoIosCloudOutline className='-ml-1 mr-2 h-5 w-5 text-gray-500' />
              Weather Forecast
            </button>
          </span>

          <span className="sm:ml-3">
            <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
              <GiAmberMosquito className='-ml-1 mr-2 h-5 w-5' />
              Malaria Updates
            </button>
          </span>
        </div>
      </div>
      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
          <Map />
        </div>
      </div>
    </>
  )
}

export default Country