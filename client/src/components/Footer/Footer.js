import "./Footer.scss"
import { NavLink } from "react-router-dom"
import home from "../../assets/icons/home_black_24dp.svg"
import settings from "../../assets/icons/manage_accounts_black_24dp.svg"
import workout from "../../assets/icons/fitness_center_black_24dp.svg"

const Footer = () => {
  return(
    <section className="footer">
      <NavLink className="footer__link" to="/"><img src={workout} alt="" className="footer__icon" /></NavLink>
      <NavLink className="footer__link" to="/"><img src={home} alt="" className="footer__icon footer__icon--home" /></NavLink>
      <NavLink className="footer__link" to="/settings"><img src={settings} alt="" className="footer__icon" /></NavLink>
    </section>
  )
}

export default Footer;