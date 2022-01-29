import "./AddExerciseModal.scss"
import closeIcon from "../../assets/icons/clear_black_24dp.svg"

const AddExerciseModal = ({close, exercises, addExerciseHandler, setAddExerciseModal}) => {
  return (
    <>
      <div onClick={() => setAddExerciseModal(false)} className="add-exercise__overlay"></div>
      <section className="add-exercise">
        <div className="add-exercise__container">
          <div className="add-exercise__top-container">
            <div className="add-exercise__empty"></div>
            <h3 className="add-exercise__title">New Exercise:</h3>
            <button onClick={() => setAddExerciseModal(false)} className="add-exercise__close-button"><img src={closeIcon} alt="X shaped icon" className="add-exercise__close" /></button>
          </div>
          <form className="add-exercise__form">
            <label htmlFor="" className="add-exercise__label">Exercise Name:
              <input type="text" className="add-exercise__name" name="name" />
            </label>
          </form>
        </div>
      </section>
    </>
  )
}

export default AddExerciseModal;