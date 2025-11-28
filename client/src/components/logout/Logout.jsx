import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import UserContext from "../../contexts/userContext.jsx"

export default function Logout() {
    const { logoutHandler } = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {

        logoutHandler()
        navigate('/')

    }, [logoutHandler, navigate]);

    return null;
};