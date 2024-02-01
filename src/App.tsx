import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from '../src/pages/home';
import RequireAuth from './components/requireAuth';

function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element ={<Login/>}  />
                <Route path='/signup' element = {<SignUp />} />
                <Route path="/home" element = {<RequireAuth> <Home /> </RequireAuth>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;