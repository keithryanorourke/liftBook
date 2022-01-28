import "./DeleteModal.scss"
import closeIcon from "../../assets/icons/clear_black_24dp.svg"

const DeleteModal = ({setDeleteModal, close, title, deleteHandler, id}) => {
  return(
    <>
    <div onClick={() => setDeleteModal(false)} className="delete-modal__overlay"></div>
    <section className={"delete-modal " + (close ? "delete-modal--closing" : "")}>
      <div className="delete-modal__container">
        <div className="delete-modal__top-container">
          <div className="delete-modal__empty"></div>
          <h2 className="delete-modal__title">Delete?</h2>
          <button onClick={() => setDeleteModal(false)} className="delete-modal__close"><img src={closeIcon} alt="X shaped icon" className="delete-modal__close-icon" /></button>
        </div>
        <div className="delete-modal__bottom-container">
          <p className="delete-modal__copy">Are you sure you want to delete {title}? This is permanent and cannot be undone!</p>
          <div className="delete-modal__button-container">
            <button onClick={() => setDeleteModal(false)} className="delete-modal__button">Cancel</button>
            <button onClick={() => deleteHandler(id)} className="delete-modal__button delete-modal__button--delete">Delete</button>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default DeleteModal