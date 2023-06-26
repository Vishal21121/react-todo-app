import { createContext, useState } from "react"

export const UserContext = createContext()

export const UserContextProvider = ({children})=>{
    const [err, setError] = useState(false)
    const [userData, setUserData] = useState({})
    return(
        <UserContext.Provider value={{userData,setUserData,err,setError}}>
            { children }
        </UserContext.Provider>
    )
}