import React, { createContext, useState } from "react";


export const UserContext = createContext();


export function UserContextProvider({ children }) {
    const [display,setDisplay]=useState(false)
    const [currency, setCurrency] = useState({
      country:localStorage.getItem('country') || 'Australian Dollar',
    
      code:localStorage.getItem('code') || 'AUD'

    });



  return (
    <UserContext.Provider value={{ display,setDisplay,currency, setCurrency}}>
      {children}
    </UserContext.Provider>
  );
}
