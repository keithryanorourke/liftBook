import "./NewWorkoutModal.scss"
import closeIcon from "../../assets/icons/clear_black_24dp.svg"
import React, {useState} from "react"

const NewWorkoutModal = ({handler, setNewWorkout, close}) => {
  const closeModal = (e) => {
    e.preventDefault()
    setNewWorkout(false)
  }

  return (
  <>
  <div className="new-workout__overlay" onClick={closeModal}></div>
  <section className={"new-workout " + (close ? "new-workout--closing" : "")}>
    <div className="new-workout__container">
      <div className="new-workout__top-container">
        <div className="new-workout__empty"></div>
        <h3 className="new-workout__title">New Workout</h3>
        <button onClick={closeModal} className="new-workout__close"><img src={closeIcon} alt="X shaped icon" className="new-workout__x" /></button>
      </div>
      <form onSubmit={handler} className="new-workout__form">
        <label htmlFor="" className="new-workout__label">Workout Name:
          <input name="name" type="text" placeholder="Leave blank for freestyle workout!" className="new-workout__name" />
        </label>
        <div className="new-workout__button-container">
          <button type="submit" className="new-workout__button new-workout__button--submit">Start!</button>
          <button onClick={closeModal} className="new-workout__button new-workout__button--cancel">Cancel</button>
        </div>
      </form>
    </div>
  </section>
  </>
  )
}

export default NewWorkoutModal