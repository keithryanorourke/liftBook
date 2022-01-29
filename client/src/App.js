import './App.scss';
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from './components/Header/Header';
import Private from './components/Private/Private';
import {LoginPage} from './pages/LoginPage/LoginPage';
import {SignUpPage} from './pages/SignUpPage/SignUpPage';
import HomePage from "./pages/HomePage/HomePage"
import OrientationPage from "./pages/OrientationPage/OrientationPage"
import WorkoutPage from './pages/WorkoutPage/WorkoutPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/workouts" element={<Private><HomePage /></Private>}></Route>
          <Route path="/workouts/:workoutId" element={<Private><WorkoutPage /></Private>}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/setup" element={<Private><OrientationPage /></Private>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
