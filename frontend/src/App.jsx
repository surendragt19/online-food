import Home from "./pages/Home"
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";

import {CardProvider} from "./components/ContextReducer";
import MyOrders from "./pages/MyOrders";


function App() {


  return (
    <>
    <CardProvider>
  <BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/myorder" element={<MyOrders/>}/>
    
    </Routes>
  </BrowserRouter>
  </CardProvider>
    </>
  )
}

export default App
