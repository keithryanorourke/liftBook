import "./LoginPage.scss";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { useLocalStorage } from "usehooks-ts";
import useConfiguredAxios from "../../hooks/useConfiguredAxios";
import AboutDialog from "../../components/AboutDialog/AboutDialog";
import Form from "../../components/Form/Form";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

export const LoginPage = () => {
  const [showAbout, setShowAbout] = useState(false)
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate()
  const [, setToken] = useLocalStorage("token", null)
  const axios = useConfiguredAxios();

  const loginHandler = (e) => {
    e.preventDefault();
    setFormError(null);
    let exit = false;
    const user = {
      username: username,
      password: password,
    }
    if (!username) {
      setUsernameError("Username is required");
      exit = true;
    }
    if (!password) {
      setPasswordError("Password is required");
      exit = true;
    }
    if (exit) {
      return;
    }

    axios.post(`/account/login`, user)
      .then(response => {
        setToken(response.data)
        navigate("/", { replace: true })
      })
      .catch(error => {
        setFormError("Incorrect username or password");
      })
  }

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    setUsernameError(null);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(null);
  }

  return (
    <section className="login">
      <AboutDialog
        visible={showAbout}
        onClose={() => setShowAbout(false)}
      />
      <div className="login__top-container">
        <h2 className="login__title">Login</h2>
      </div>
      <div className="login__bottom-container">
        <Form
          onSubmit={loginHandler}
          className="login__form"
          error={formError}
          buttons={<Button>Log In</Button>}
        >
          <TextInput
            label="Username"
            name="username"
            value={username}
            onChange={onChangeUsername}
            error={usernameError}
          />
          <PasswordInput
            label="Password"
            name="password"
            value={password}
            onChange={onChangePassword}
            error={passwordError}
          />
        </Form>
        <NavLink className="login__link" to="/signup">Need an account? Sign up here!</NavLink>
        <p className="login__disclaimer">DISCLAIMER: liftBook uses cookies to keep you logged in! By logging in or creating an account, you are agreeing to allow this website to store cookies in your browser.</p>
        <button onClick={() => setShowAbout(true)} className="login__about">About liftBook</button>
      </div>
    </section>
  )
}