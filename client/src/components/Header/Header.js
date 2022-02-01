import "./Header.scss"
import PublicHeader from "../PublicHeader/PublicHeader";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation()

  if(location.pathname === "/login" || location.pathname === "/signup") {
    return <PublicHeader />
  }
  return (
    <section className="header">
      <NavLink to="/" className="header__link">
        <h1 className="header__title">lift<span className="header__title--pop">Book</span></h1>
      </NavLink>
    </section>
  )
}

export default Header;