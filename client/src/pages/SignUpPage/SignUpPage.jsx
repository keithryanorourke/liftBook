import "./SignUpPage.scss"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useLocalStorage } from "usehooks-ts"
import useConfiguredAxios from "../../hooks/useConfiguredAxios"
import TextInput from "../../components/TextInput/TextInput"
import Button from "../../components/Button/Button"
import Form from "../../components/Form/Form"
import PasswordInput from "../../components/PasswordInput/PasswordInput"
import { ArrowBack } from "@mui/icons-material"

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [, setToken] = useLocalStorage("token", null)
  const axios = useConfiguredAxios();

  const onSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    let exit = false;
    if (!username) {
      setUsernameError("Username is required");
      exit = true;
    }
    if (!password) {
      setPasswordError("Password is required");
      exit = true;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      exit = true;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      exit = true;
    }
    if (exit) {
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    const submission = {
      username: username,
      password: password,
    }
    axios.post(`/account/signup`, submission)
      .then(response => {
        setToken(response.data);
        navigate("/setup");
      })
      .catch(error => {
        setFormError("Server error encountered");
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

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(null);
  }

  return (
    <section className="page">
      <header className="page__header flex-between">
        <NavLink to="/login" className="icon-button"><ArrowBack sx={{ color: "white" }} /></NavLink>
        <h2>Create Account:</h2>
        <div className="signup__empty"></div>
      </header>
      <div className="page__content">
        <Form
          onSubmit={onSubmit}
          buttons={<Button>Sign Up</Button>}
          error={formError}
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
            type="password"
          />
          <PasswordInput
            label="Confirm Password"
            name="password"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            error={confirmPasswordError}
            type="password"
          />
        </Form>
      </div>
    </section>
  )
}