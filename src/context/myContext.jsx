import { createContext}  from 'react'
import { doctors }       from '../assets/assets'

// using useContext in order {doctors} be available in every components
export const AppContext = createContext()

const AppContextProvider = ({children}) => {
  
     const value = { doctors }


return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
    )

}
export default AppContextProvider 