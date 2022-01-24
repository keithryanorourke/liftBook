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
    return <Navigate to="/setup"/>
  }

  return (
    <section className="signup">
        <div className="signup__top-container">
          <h2 className="signup__title">Create Account:</h2>
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