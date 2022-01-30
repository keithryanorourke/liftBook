import "./EditExerciseModal.scss"
import closeIcon from "../../assets/icons/clear_black_24dp.svg"
import muscleList from "../../assets/data/muscleList.json"
import { useState, useEffect } from "react"
import uniqid from "uniqid"

const EditExerciseModal = ({exercise, close, editExerciseHandler, setEditExerciseModal}) => {

  const closeModal = (e) => {
    e.preventDefault()
    setEditExerciseModal(false)
  }

  const formatMusclesIntoArray = (musclesToFormat) => {
    const musclesSpaceRemoved = musclesToFormat.replaceAll(' ', '')
    return musclesSpaceRemoved.split(',')
  }

  const formattedDefault = formatMusclesIntoArray(exercise.muscle)

  const [toggledMuscles, setToggledMuscles] = useState(formattedDefault)

  // WHY IS THIS NECESSARY??? WHY DOES IT WORK???
  const [randomBool, setRandomBool] = useState(false)

  const toggleMuscle = (muscle) => {
    if(toggledMuscles.includes(muscle)) {
      let newArray = toggledMuscles
        const indexToRemove = newArray.indexOf(muscle)
        newArray.splice(indexToRemove, 1)
        setToggledMuscles(newArray)
      } else {
        let newArray = toggledMuscles
        newArray.push(muscle)
        setToggledMuscles(newArray)
      }
      // WHY DOES THIS WORK??????????
      return setRandomBool(!randomBool)
  }

  return (
    <>
      <div onClick={closeModal} className="edit-exercise__overlay"></div>
      <section className={"edit-exercise " + (close ? "edit-exercise--closing" : "")}>
        <div className="edit-exercise__container">
          <div className="edit-exercise__top-container">
            <div className="edit-exercise__empty"></div>
            <h3 className="edit-exercise__title">Edit {exercise.name}:</h3>
            <button onClick={closeModal} className="edit-exercise__close-button"><img src={closeIcon} alt="X shaped icon" className="edit-exercise__close" /></button>
          </div>
          <div className="edit-exercise__bottom-container">
            <p className="edit-exercise__copy">Select all muscles involved in exercise:</p>
            <div className="edit-exercise__muscle-container">
            {muscleList.array.map(muscle => {
              return <button onClick={() => toggleMuscle(muscle)} key={uniqid()} className={"edit-exercise__muscle-button " + (toggledMuscles.includes(muscle) ? "edit-exercise__muscle-button--toggled" : null)}>{muscle}</button>
            })}
            </div>
            <form onSubmit={(e) => editExerciseHandler(e, exercise, toggledMuscles)} className="edit-exercise__form">
              <label htmlFor="" className="edit-exercise__label">Exercise Name:
                <input type="text" defaultValue={exercise.name} placeholder="Exercise name is required" className="edit-exercise__name" name="name" />
              </label>
              <div className="edit-exercise__button-container">
                <button onClick={closeModal} className="edit-exercise__button">Cancel</button>
                <button className="edit-exercise__button edit-exercise__button--submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default EditExerciseModal