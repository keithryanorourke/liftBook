import "./Footer.scss"
import { NavLink } from "react-router-dom"
import home from "../../assets/icons/home_black_24dp.svg"
import settings from "../../assets/icons/manage_accounts_black_24dp.svg"
import workout from "../../assets/icons/fitness_center_black_24dp.svg"

const Footer = () => {
  return(
    <section className="footer">
      <NavLink className="footer__link" to="/exercises"><img src={workout} alt="Barbell Icon" className="footer__icon" /></NavLink>
      <NavLink className="footer__link" to="/"><img src={home} alt="Home Icon" className="footer__icon footer__icon--home" /></NavLink>
      <NavLink className="footer__link" to="/settings"><img src={settings} alt="Icon of a settings cog superimposed on an outline of a person" className="footer__icon" /></NavLink>
    </section>
  )
}

export default Footer;