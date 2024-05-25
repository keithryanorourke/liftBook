import './App.scss';
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header';

import Private from './components/Private/Private';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import HomePage from "./pages/HomePage/HomePage"
import OrientationPage from "./pages/OrientationPage/OrientationPage"
import WorkoutPage from './pages/WorkoutPage/WorkoutPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import ExercisesPage from './pages/ExercisesPage/ExercisesPage';
import SingleExercisePage from './pages/SingleExercisePage/SingleExercisePage';
import { UserSettingsContext } from './contexts/UserSettingsContext';
import { UserSettingsSetterContext } from './contexts/UserSettingsSetterContext';
import axios from 'axios';
import { useReadLocalStorage } from 'usehooks-ts';
const { REACT_APP_BACKEND_URL } = process.env

function App() {
  const [userSettings, setUserSettings] = useState(null)
  const token = useReadLocalStorage("token")

  useEffect(() => {
    const fetchUserSettings = async () => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/account/settings`, {
        headers:
        {
          Authorization: `Bearer: ${token}`
        }
      });
      setUserSettings(response.data);
    }

    if (token) {
      fetchUserSettings();
    } else {
      setUserSettings(null);
    }
  }, [token])

  return (
    <div className="App">
      <UserSettingsContext.Provider value={userSettings} >
        <UserSettingsSetterContext.Provider value={setUserSettings} >
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/login" element={<main><LoginPage /></main>}></Route>
              <Route path="/signup" element={<main><SignUpPage /></main>}></Route>
              <Route exact path="/" element={<Private><HomePage /></Private>}></Route>
              <Route path="/workout/:workoutId" element={<Private><WorkoutPage /></Private>}></Route>
              <Route exact path="/exercises" element={<Private><ExercisesPage /></Private>}></Route>
              <Route exact path="/exercise/:exerciseId" element={<Private><SingleExercisePage /></Private>}></Route>
              <Route path="/setup" element={<Private><OrientationPage /></Private>}></Route>
              <Route path="/settings" element={<Private><SettingsPage /></Private>}></Route>
            </Routes>
          </BrowserRouter>
        </UserSettingsSetterContext.Provider>
      </UserSettingsContext.Provider>
    </div>
  );
}

export default App;
