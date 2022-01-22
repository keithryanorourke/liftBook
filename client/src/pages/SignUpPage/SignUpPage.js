import "./SignUpPage.scss"
import axios from "axios"
import {useState} from "react"
import Cookie from "js-cookie"
import { Navigate } from "react-router-dom"

export const SignUpPage = () => {
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
    if (submission.password !== submission.confirmPassword) {
      setFormFields(prevState => ({...prevState, password: {value: submission.password, error: "Passwords do not match!"}, confirmPassword: {value: submission.confirmPassword, error: "Passwords do not match!"}}))
      exit =true;
    }
    if (!exit) {
      delete submission.confirmPassword
      axios.post("http://localhost:8080/account/signup", submission)
      .then(response => {
        Cookie.set("token", response.data, {expires: 7})
        setRedirect(true)
      })
      .catch(error => {
        setFormFields(prevState => ({...prevState, username: {value: submission.username, error: `Username ${submission.username} is already in use.`}}))
      })
    }
  }

  if (redirect) {
    return <Navigate to="/home"/>
  }

  return (
    <section className="signup">
      <form onSubmit={loginHandler} className="signup-form">
        <label className="signup-label">Username:
          <input type="text" name="username" className="signup-username" />
        </label>
        <label className="signup-label">Password:
          <input type="password" name="password" className="signup-username" />
        </label>
        <label className="signup-label">Confirm Password:
          <input type="password" name="confirmPassword" className="signup-username" />
        </label>
        <button className="signup-submit" type="submit">Log In!</button>
      </form>
    </section>
      )
}