import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {




    const [authData, setAuthData] = useState(() => {
        const savedAuth = localStorage.getItem('authData');
        return savedAuth ? JSON.parse(savedAuth) : {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            remember: false,
            isLoggedIn: false,
        }
    });

    useEffect(() => {
        if (authData.remember) {
            localStorage.setItem('authData', JSON.stringify(authData))
        }
    }, [authData])


    const logout = () => {
        setAuthData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            remember: false,
            isLoggedIn: false,
        });

        localStorage.removeItem("authData");
    }
    return (
        <AuthContext.Provider value={{ authData, setAuthData ,logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};