import "./NewWorkoutModal.scss"
import close from "../../assets/icons/clear_black_24dp.svg"
import React, {useState} from "react"

const NewWorkoutModal = ({handler, setNewWorkout}) => {
  const closeModal = (e) => {
    e.preventDefault()
    setNewWorkout(false)
  }

  return (
  <>
  <div className="new-workout__overlay" onClick={closeModal}></div>
  <section className="new-workout">
  <div className="new-workout__container">
    <div className="new-workout__top-container">
      <div className="new-workout__empty"></div>
      <h2 className="new-workout__title">New Workout</h2>
      <button onClick={closeModal} className="new-workout__close"><img src={close} alt="" className="new-workout__x" /></button>
    </div>
    <form onSubmit={handler} className="new-workout__form">
      <label htmlFor="" className="new-workout__label">Workout Name:
        <input name="name" type="text" placeholder="Leave blank for freestyle workout!" className="new-workout__name" />
      </label>
      <div className="new-workout__button-container">
        <button onClick={closeModal} className="new-workout__button new-workout__button--cancel">Cancel</button>
        <button type="submit" className="new-workout__button new-workout__button--submit">Start!</button>
      </div>
    </form>
  </div>
  </section>
  </>
  )
}

export default NewWorkoutModal