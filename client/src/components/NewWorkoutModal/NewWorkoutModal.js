import "./NewWorkoutModal.scss"
import close from "../../assets/icons/clear_black_24dp.svg"
import help from "../../assets/icons/help_outline_black_24dp.svg"
import InformativeModal from "../InformativeModal/InformativeModal"
import React, {useState} from "react"

const NewWorkoutModal = ({handler, setNewWorkout}) => {
  const submitHandler = (e) => {

  }

  const closeModal = (e) => {
    e.preventDefault()
    setNewWorkout(false)
  }

  return (
  <section className="new-workout">
    <div className="new-workout__top-container">
      <h2 className="new-workout__title">New Workout:</h2>
    </div>
    <form onSubmit={submitHandler} className="new-workout__form">
      <label htmlFor="" className="new-workout__label">Workout Name:
        <input type="text" placeholder="Leave blank for freestyle workout!" className="new-workout__name" />
      </label>
      <div className="new-workout__button-container">
        <button onClick={closeModal} className="new-workout__button new-workout__button--cancel">Cancel</button>
        <button type="submit" className="new-workout__button new-workout__button--submit">Start!</button>
      </div>
    </form>
  </section>
  )
}

export default NewWorkoutModal