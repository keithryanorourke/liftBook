import './App.scss';
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import {LoginPage} from './pages/LoginPage/LoginPage';
import {SignUpPage} from './pages/SignUpPage/SignUpPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
