import "./LandingPage.scss"
import "axios"
import {Navigate} from "react-router-dom"
import {useEffect, useState} from 'react'

const LandingPage = () => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('token') ? true : false)

  if (!loggedIn) {
    return (
      <Navigate to="/login" />
    )
  }

  return (
    <main>
      <h1>
      LandingPage

      </h1>
    </main>)
}
export default LandingPage