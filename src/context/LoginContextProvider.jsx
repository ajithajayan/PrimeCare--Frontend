import { useState } from 'react'
import React, { useState } from 'react'
import { createContext } from 'react'

function LoginContextProvider({children}) {
    const LoginContext = createContext()
    const [userId,setUserId]=useState(null)
  return (
    <div>
        <LoginContext.Provider value={userId}>
            {children}
        </LoginContext.Provider>
    </div>
  )
}

export default LoginContextProvider