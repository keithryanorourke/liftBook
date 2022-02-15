import './App.scss';
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header';

import Private from './components/Private/Private';
import {LoginPage} from './pages/LoginPage/LoginPage';
import {SignUpPage} from './pages/SignUpPage/SignUpPage';
import HomePage from "./pages/HomePage/HomePage"
import OrientationPage from "./pages/OrientationPage/OrientationPage"
import WorkoutPage from './pages/WorkoutPage/WorkoutPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import ExercisesPage from './pages/ExercisesPage/ExercisesPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/login" element={<main><LoginPage /></main>}></Route>
            <Route path="/signup" element={<main><SignUpPage /></main>}></Route>
            <Route exact path="/" element={<Private><HomePage /></Private>}></Route>
            <Route path="/workout/:workoutId" element={<Private><WorkoutPage /></Private>}></Route>
            <Route exact path="/exercises" element={<Private><ExercisesPage /></Private>}></Route>
            <Route path="/setup" element={<Private><OrientationPage /></Private>}></Route>
            <Route path="/settings" element={<Private><SettingsPage /></Private>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
