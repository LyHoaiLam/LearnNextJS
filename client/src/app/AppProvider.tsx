'use client'
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext({
    sessionToken: '',
    setSessionToken: (sessionToken: string) => {//khởi tạo như một function cho dưới không bị error

    }
})

const useAppContext = () => {
    const context = useContext(AppContext)
    if (context) {
        throw new Error('useAppContext must be used within an AppProvider')
    }

    return context
}

export default function AppProvider({ children }: { children: React.ReactNode }) {

    const [sessionToken, setSessionToken] = useState('')

    return (
        <AppContext.Provider value={{ sessionToken, setSessionToken }}>
            {children}
        </AppContext.Provider>
    )

}