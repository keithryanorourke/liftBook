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
import getErrorMessage from "../../functions/getErrorMessage";

export const LoginPage = () => {
  const [showAbout, setShowAbout] = useState(false)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      .catch(err => setFormError(getErrorMessage(err)))
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
    <section className="page">
      <AboutDialog
        visible={showAbout}
        onClose={() => setShowAbout(false)}
      />
      <header className="page__header">
        <h2>Login</h2>
      </header>
      <div className="page__content">
        <div className="login__flex-wrapper">
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
          <Button type="button" onClick={() => setShowAbout(true)}>About liftBook</Button>
        </div>
      </div>
    </section>
  )
}