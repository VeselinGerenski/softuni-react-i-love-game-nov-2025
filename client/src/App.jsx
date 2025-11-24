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


function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Catalog />} />
                <Route path="/games/:gameId/details" element={<Details />} />
                <Route path="/games/create" element={<GameCreate />} />
                <Route path="/games/:gameId/edit" element={<GameEdit />} />
                <Route path="/register" element={<Register />} />

            </Routes>

            <Footer />
        </>
    )
}

export default App;
