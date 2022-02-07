import "./InformativeModal.scss"
import closeIcon from "../../assets/icons/clear_black_24dp.svg"
import { NavLink } from "react-router-dom"
import gitHub from "../../assets/icons/github-icon.svg"
import linkedIn from "../../assets/icons/linkedin-icon.svg"

const InformativeModal = ({title, copy, close}) => {
  return (
    <>
    <div className="informative__overlay" onClick={close}></div>
    <article className="informative">
      <div className="informative__container">
      <div className="informative__top-container">
        <div className="informative__empty"></div>
        <h3 className="informative__title">{title}</h3>
        <button className="informative__back" onClick={close}>
          <img src={closeIcon} alt="X icon" className="informative__close" />
        </button>
      </div>
      <div className="informative__bottom-container">
        <p className="informative__copy">{copy}</p>
        {title.includes("About") ? 
        <div className="informative__contact-container">
          <p className="informative__copy">Feel free to reach out to me on GitHub or LinkedIn!</p>
          <div className="informative__link-container">
            <a href="https://github.com/keithryanorourke" target="_blank" className="informative__link"><img src={gitHub} alt="GitHub icon" className="informative__icon" /></a>
            <a href="https://linkedin.com/in/keith-ryan-orourke" target="_blank" className="informative__link"><img src={linkedIn} alt="GitHub icon" className="informative__icon" /></a>
          </div>
        </div> 
        : null}
      </div>
      </div>
    </article>
    </>
  )
}

export default InformativeModal