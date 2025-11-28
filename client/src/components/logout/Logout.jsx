import { useContext, useEffect } from "react"
import { Navigate } from "react-router"
import UserContext from "../../contexts/userContext.js"

export default function Logout() {
    const { logoutHandler } = useContext(UserContext)

    useEffect(() => {
        logoutHandler();
    }, [logoutHandler]);

    return (
        <Navigate to='/' />
    )
};