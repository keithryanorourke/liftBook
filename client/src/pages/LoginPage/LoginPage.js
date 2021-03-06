import "./LoginPage.scss";
import InformativeModal from "../../components/InformativeModal/InformativeModal";
import axios from "axios";
import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom"
import Cookie from "js-cookie";
const {REACT_APP_BACKEND_URL} = process.env

export const LoginPage = () => {
  // formFields will be implemented as a manner to render conditional error messages in a future sprint
  const [formFields, setFormFields] = useState({
    username: {},
    password: {},
  })
  const [informativeModal, setInformativeModal] = useState(false)
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
      axios.post(`${REACT_APP_BACKEND_URL}/account/login`, submission)
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
      {informativeModal ? 
    <InformativeModal
      title="About liftBook"
      copy="Welcome to liftBook! liftBook is a customizable workout tracker, and was made by myself (Keith Ryan O'Rourke) as my capstone project for my bootcamp at BrainStation! You do need to sign up for an account so that your workouts can be saved privately, where only you have access to them. That beings said, absolutely no contact or private information is needed whatsoever, you just need a username and password!"
      close={() => setInformativeModal(false)}
    />
    : null
    }
      <div className="login__top-container">
        <h2 className="login__title">Login</h2>
      </div>
      <div className="login__bottom-container">
        <form onSubmit={loginHandler} className="login__form">
          <label className="login__label">Username:
            <input type="text" name="username" className="login__field" />
          </label>
          <label className="login__label">Password:
            <input type="password" name="password" className="login__field" />
          </label>
          <button className="login__submit">Log In</button>
        </form>
        <NavLink className="login__link" to="/signup">Need an account? Sign up here!</NavLink>
        <p className="login__disclaimer">DISCLAIMER: liftBook uses cookies to keep you logged in! By logging in or creating an account, you are agreeing to allow this website to store cookies in your browser.</p>
        <button onClick={() => setInformativeModal(true)} className="login__about">About liftBook</button>
      </div>
    </section>
    )
}