import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";

export const AuthContext  = createContext();

export function AuthProvider({children}) {

    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser? JSON.parse(storedUser) : null; 
    });

    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        navigate('/');
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}