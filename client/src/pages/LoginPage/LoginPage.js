import "./LoginPage.scss";
import axios from "axios";
import {useState} from "react";
import {NavLink, Navigate, useNavigate} from "react-router-dom"
import Cookie from "js-cookie";


export const LoginPage = () => {
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
    if(!exit) {
      axios.post("http://localhost:8080/account/login", submission)
      .then(response => {
        Cookie.set("token", response.data, {expires: 7})
        navigate("../", {replace: true})
      })
      .catch(error => {
        if(error.status === 404) {
          setFormFields(prevState => ({...prevState, username: {value: submission.username, error: "Username not found!"}}))
          return
        }
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