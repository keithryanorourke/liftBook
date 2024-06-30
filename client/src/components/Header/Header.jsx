import "./Header.scss"
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation()

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return (
      <header className="header">
        <h1 className="header__title">lift<span className="header__title--pop">Book</span></h1>
      </header>
    )
  }
  return (
    <header className="header">
      <NavLink to="/" className="header__link">
        <h1 className="header__title">lift<span className="header__title--pop">Book</span></h1>
      </NavLink>
    </header>
  )
}

export default Header;