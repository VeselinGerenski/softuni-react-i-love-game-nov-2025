import { Route, Routes } from "react-router";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./components/home/Home.jsx";
import Catalog from "./components/catalog/Catalog.jsx";
import Details from "./components/details/Details.jsx";
import GameCreate from "./components/game-create/GameCreate.jsx";
import GameEdit from "./components/game-edit/GameEdit.jsx";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import { useState } from "react";

function App() {
    const [registeredUsers, setRegisteredUsers] = useState([])
    const [user, setUser] = useState(null);

    const registerHandler = (email, password) => {
        if (registeredUsers.some(user => user.email === email)) {
            throw new Error("Email is already used");
        }

        setRegisteredUsers((state) => [...state, { email, password }])
        //TODO login user after register

    }

    const loginHandler = (email, password) => {
        const user = registeredUsers.find(u => u.email === email && u.password === password)
        if (!user) {
            throw new Error('Invalid username or password');
        }

        if (email !== user.email || password !== user.password) {
            throw new Error('Invalid email or password');
        }


    }
    return (
        <>
            <Header user={user} />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Catalog />} />
                <Route path="/games/:gameId/details" element={<Details />} />
                <Route path="/games/create" element={<GameCreate />} />
                <Route path="/games/:gameId/edit" element={<GameEdit />} />
                <Route path="/register" element={<Register user={user} onRegister={registerHandler} />} />
                <Route path="/login" element={<Login onLogin={loginHandler} />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App;
