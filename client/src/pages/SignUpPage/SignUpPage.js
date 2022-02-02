import "./SignUpPage.scss"
import axios from "axios"
import {useState} from "react"
import Cookie from "js-cookie"
import { Navigate, NavLink } from "react-router-dom"
import back from "../../assets/icons/arrow_back_black_24dp.svg"
const {REACT_APP_BACKEND_URL} = process.env

export const SignUpPage = () => {
  // formFields will be implemented as a manner to render conditional error messages in a future sprint
  const [formFields, setFormFields] = useState({
    username: {},
    password: {},
    confirmPassword: {}
  })
  const [redirect, setRedirect] = useState(false)

  const loginHandler = (e) => {
    e.preventDefault();
    let exit = false;
    const submission = {
      username: e.target.username.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value
    }
    Object.keys(submission).forEach(key => {
      if (!submission[key]) {
        exit = true;
        setFormFields(prevState => ({...prevState, [key]: {value: "", error: "blank"}}))
      } 
    })
    if(exit) {
      return alert("Please make sure to fill out the Username, Password, and Confirm Password fields before continuing.")
    }
    if (submission.password !== submission.confirmPassword) {
      alert("Password and Confirm Password do no match! Please make sure that you have typed the same password into both fields!")
      setFormFields(prevState => ({...prevState, password: {value: submission.password, error: "Passwords do not match!"}, confirmPassword: {value: submission.confirmPassword, error: "Passwords do not match!"}}))
      exit =true;
    }
    if (!exit) {
      delete submission.confirmPassword
      axios.post(`${REACT_APP_BACKEND_URL}/account/signup`, submission)
      .then(response => {
        Cookie.set("token", response.data, {expires: 7})
        setRedirect(true)
      })
      .catch(error => {
        alert(`Username ${submission.username} is already in use. Please select another username.`)
        setFormFields(prevState => ({...prevState, username: {value: submission.username, error: `Username ${submission.username} is already in use.`}}))
      })
    }
  }

  if (redirect) {
    return <Navigate to="/setup"/>
  }

  return (
    <section className="signup">
        <div className="signup__top-container">
          <NavLink to="/login" className="signup__back-button"><img src={back} alt="Arrow icon pointing left" className="signup__back" /></NavLink>
          <h2 className="signup__title">Create Account:</h2>
          <div className="signup__empty"></div>
        </div>
        <form onSubmit={loginHandler} className="signup__form">
          <label className="signup__label">Username:
            <input type="text" name="username" className="signup__field" />
          </label>
          <label className="signup__label">Password:
            <input type="password" name="password" className="signup__field" />
          </label>
          <label className="signup__label">Confirm Password:
            <input type="password" name="confirmPassword" className="signup__field" />
          </label>
          <button className="signup__submit" type="submit">Sign Up</button>
        </form>
    </section>
  )
}