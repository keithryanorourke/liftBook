import "./Footer.scss"
import { NavLink } from "react-router-dom"
import { FitnessCenter, Home, ManageAccounts } from "@mui/icons-material"

const Footer = () => {
  return (
    <section className="footer">
      <NavLink className="footer__link" to="/exercises">
        <div className="footer__icon">
          <FitnessCenter sx={{ color: "white" }} fontSize="large" />
        </div>
      </NavLink>
      <NavLink className="footer__link" to="/">
        <div className="footer__icon">
          <Home sx={{ color: "white" }} fontSize="large" />
        </div>
      </NavLink>
      <NavLink className="footer__link" to="/settings">
        <div className="footer__icon">
          <ManageAccounts sx={{ color: "white" }} fontSize="large" />
        </div>
      </NavLink>
    </section>
  )
}

export default Footer;