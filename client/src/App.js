import './App.scss';
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Private from './components/Private/Private';
import LandingPage from './pages/LandingPage/LandingPage';
import {LoginPage} from './pages/LoginPage/LoginPage';
import {SignUpPage} from './pages/SignUpPage/SignUpPage';
import HomePage from "./pages/HomePage/HomePage"
import OrientationPage from "./pages/OrientationPage/OrientationPage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Private><HomePage /></Private>}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/setup" element={<Private><OrientationPage /></Private>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
