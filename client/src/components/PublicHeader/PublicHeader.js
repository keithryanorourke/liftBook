import "./PublicHeader.scss"
import { NavLink } from "react-router-dom";

const PublicHeader = () => {
  return (
    <section className="public-header">
        <h1 className="public-header__title">lift<span className="public-header__title--pop">Book</span></h1>
    </section>
  )
}

export default PublicHeader;