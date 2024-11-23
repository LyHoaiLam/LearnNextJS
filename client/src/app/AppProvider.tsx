'use client'
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext({
    sessionToken: '',
    setSessionToken: (sessionToken: string) => {}//khởi tạo như một function cho dưới không bị error
})

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider')
    }

    return context
}

export default function AppProvider({
    children,
    initialSesseionToken = ''

}:  {
        children: React.ReactNode,
        initialSesseionToken?: string
    }) {

    const [sessionToken, setSessionToken] = useState(initialSesseionToken)

    console.log('sessionToken lấy từ layout root qua initialSessionToken', sessionToken)

    return (
        <AppContext.Provider value={{ sessionToken, setSessionToken }}>
            {children}
        </AppContext.Provider>
    )

}