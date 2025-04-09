"use client";

import { api } from "@/services/axios";
import { UserDataType } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    user: UserDataType | null;
    isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserDataType | null>(null);
    const isAuthenticated = !!user;

    const getSession = async () => {
        const response = await api.get("auth/session");
        const user: UserDataType = response.data;
        console.log("usuario" + user)
        setUser(user);
    }

    useEffect(() => {
        getSession()
    },[])

    return (
        <AuthContext.Provider value={{ user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useSession = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error("useSession deve ser usado dentro de um AuthProvider");
    };

    return context;
};