import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useUserContext } from "../../contexts/userContext.jsx";

export default function Logout() {
    const { logoutHandler } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {

        logoutHandler()
        navigate('/')

    }, [logoutHandler, navigate]);

    return null;
};