import { useContext, useEffect } from "react"
import { Navigate, useNavigate } from "react-router"
import UserContext from "../../contexts/userContext.js"

export default function Logout() {
    const { logoutHandler } = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        
        logoutHandler()
        navigate('/')

    }, [logoutHandler, navigate]);

    return null;
};