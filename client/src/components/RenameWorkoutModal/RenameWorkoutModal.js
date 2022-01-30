import "./RenameWorkoutModal.scss"
import closeIcon from "../../assets/icons/clear_black_24dp.svg"
import React, {useState} from "react"

const RenameWorkoutModal = ({handler, setRenameWorkout, workout, close}) => {
  const closeModal = (e) => {
    e.preventDefault()
    setRenameWorkout(false)
  }

  console.log(workout)

  return (
  <>
  <div className="rename-workout__overlay" onClick={closeModal}></div>
  <section className={"rename-workout " + (close ? "rename-workout--closing" : "")}>
  <div className="rename-workout__container">
    <div className="rename-workout__top-container">
      <div className="rename-workout__empty"></div>
      <h3 className="rename-workout__title">Rename Workout</h3>
      <button onClick={closeModal} className="rename-workout__close"><img src={closeIcon} alt="" className="rename-workout__x" /></button>
    </div>
    <form onSubmit={(e) => handler(e, workout)} className="rename-workout__form">
      <label htmlFor="" className="rename-workout__label">Workout Name:
        <input name="name" type="text" defaultValue={workout.name} placeholder="Leave blank for freestyle workout!" className="new-workout__name" />
      </label>
      <div className="rename-workout__button-container">
        <button type="submit" className="rename-workout__button rename-workout__button--submit">Save</button>
        <button onClick={closeModal} className="rename-workout__button rename-workout__button--cancel">Cancel</button>
      </div>
    </form>
  </div>
  </section>
  </>
  )
}

export default RenameWorkoutModal