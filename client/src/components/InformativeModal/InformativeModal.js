import "./InformativeModal.scss"
import closeIcon from "../../assets/icons/clear_black_24dp.svg"

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
      </div>
      </div>
    </article>
    </>
  )
}

export default InformativeModal