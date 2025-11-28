import { createContext, useState } from "react";
import useRequest from "../hooks/useRequest.js";

const UserContext = createContext({
    isAuthenticated: false,

    user: {
        email: '',
        password: '',
        _createdOn: 0,
        _id: '',
        accessToken: '',
    },
    registerHandler: async () => { },
    loginHandler: async () => { },
    logoutHandler: async () => { },
})

export function UserProvider({
    children,
}) {
    const [user, setUser] = useState(null);
    const { request } = useRequest();

    const registerHandler = async (email, password) => {
        const newUser = { email, password };

        // Register API call
        const result = await request('/users/register', 'POST', newUser)

        // Log user after registration
        setUser(result);
    }

    const loginHandler = async (email, password) => {
        const result = await request('/users/login', 'POST', { email, password })

        console.log(result);

        setUser(result);
    }

    const logoutHandler = async () => {
        try {
            await request('/users/logout');
        } catch (err) {
            alert(err.message)
        }
        finally {
            setUser(null)
        }
    };


    const userContextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        registerHandler,
        loginHandler,
        logoutHandler,
    }

    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;