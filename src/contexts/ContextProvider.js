import React, { createContext, useContext, useState, useEffect } from "react"
import { getCountriesData } from '../api/malariaAPI'

const StateContext = createContext()

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [isClicked, setIsClicked] = useState(initialState)
    const [screenSize, setScreenSize] = useState(undefined)
    const [countriesData, setCountriesData] = useState([])

    const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true })

    useEffect(() => {
        getCountriesData().then((data) => setCountriesData(data))
    }, [])

    return (
        <StateContext.Provider value={{ activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize, countriesData }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)