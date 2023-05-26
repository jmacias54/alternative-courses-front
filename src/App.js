import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingIn from './components/SingIn';
import SingUp from './components/SingUp';
import Profile from './components/Profile';
import Index from './components/Index';


function App() {


  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/signIn" element={ <SingIn /> } />  4
          <Route path="/singUp" element={ <SingUp /> } />  
          <Route path="/" element={ <Index /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
