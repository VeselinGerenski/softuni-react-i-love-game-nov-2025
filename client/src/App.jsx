import { Route, Routes } from "react-router";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./components/home/Home.jsx";

function App() {
    return (
        <>
           <Header/>
          
          <Routes>
              <Route path="/" element={<Home />}/>

          </Routes>
          
           <Footer />
        </>
    )
}

export default App;
