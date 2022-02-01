import "./LoginPage.scss";
import axios from "axios";
import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom"
import Cookie from "js-cookie";


export const LoginPage = () => {
  // formFields will be implemented as a manner to render conditional error messages in a future sprint
  const [formFields, setFormFields] = useState({
    username: {},
    password: {},
  })
  const navigate = useNavigate()

  const loginHandler = (e) => {
    e.preventDefault();
    let exit = false;
    const submission = {
      username: e.target.username.value,
      password: e.target.password.value,
    }
    Object.keys(submission).forEach(key => {
      if (!submission[key]) {
        exit = true;
        setFormFields(prevState => ({...prevState, [key]: {value: "", error: "blank"}}))
      } 
    })
    if(exit) {
      return alert("Please enter your username and password in order to login!")
    }
    if(!exit) {
      axios.post("http://localhost:8080/account/login", submission)
      .then(response => {
        Cookie.set("token", response.data, {expires: 7})
        navigate("../", {replace: true})
      })
      .catch(error => {
        if(error.response.status === 404) {
          alert(`There is no account with the username ${e.target.username.value}. Please make sure you have typed your username correctly.`)
          setFormFields(prevState => ({...prevState, username: {value: submission.username, error: "Username not found!"}}))
          return
        }
        alert(`The password you have typed is not correct. Please ensure that you have typed your password correctly.`)
        setFormFields(prevState => ({...prevState, password: {value: submission.password, error: "Incorrect password."}}))
      })
    }
    return null;
  }

  return (
    <section className="login">
      <div className="login__top-container">
        <h2 className="login__title">Login</h2>
      </div>
      <form onSubmit={loginHandler} className="login__form">
        <label className="login__label">Username:
          <input type="text" name="username" className="login__field" />
        </label>
        <label className="login__label">Password:
          <input type="password" name="password" className="login__field" />
        </label>
        <button className="login__submit">Log In</button>
        <NavLink className="login__link" to="/signup">Need an account? Sign up here!</NavLink>
      </form>
    </section>
    )
}