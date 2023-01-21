import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminCom from './components/Admin/AdminCom';
import AdminLogin from './components/Admin/AdminLogin';
import BusList from './components/BusList';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Owner from './components/Owner/Owner';
import OwnerLogin from './components/Owner/OwnerLogin';
import Register from './components/User/Register';
import UserLogin from './components/User/UserLogin';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="buslist" element={<BusList button="book" />} />
          <Route exact path="userlogin" element={<UserLogin />} />
          <Route exact path="ownerlogin" element={<OwnerLogin />} />
          <Route exact path="adminlogin" element={<AdminLogin />} />
          <Route exact path="register" element={<Register />} />
          <Route exact path="admincom" element={<AdminCom />} />
          <Route exact path="ownercom" element={<Owner />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
