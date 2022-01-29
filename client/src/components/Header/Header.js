import "./Header.scss"
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <section className="header">
      <NavLink to="/" className="header__link">
        <h1 className="header__title">lift<span className="header__title--pop">Book</span></h1>
      </NavLink>
    </section>
  )
}

export default Header;