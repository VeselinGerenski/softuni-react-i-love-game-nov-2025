import { createContext } from "react";

const UserContext = createContext({
    isAuthenticated: false,

    user: {
        email: '',
        password: '',
        _createdOn: 0,
        _id: '',
        accessToken: '',
    },
   async registerHandler() { },
    loginHandler() { },
    logoutHandler() { },
})

export default UserContext;