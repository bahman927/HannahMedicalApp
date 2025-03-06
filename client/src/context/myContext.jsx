import React, {createContext, useState}  from 'react'
import { doctors }       from '../assets/assets.js'

// using useContext in order {doctors} be available in every components
export const AppContext = createContext()

const AppContextProvider = ({children}) => {
  
     const [user, setUser] = useState(null)
      const [isLoggedIn, setIsLoggedIn] = useState(false)


return (
    <AppContext.Provider value={{doctors, user, setUser, isLoggedIn, setIsLoggedIn}}>
      {children}
    </AppContext.Provider>
    )

}
export default AppContextProvider 