import "./AddExerciseModal.scss"
import closeIcon from "../../assets/icons/clear_black_24dp.svg"
import muscleList from "../../assets/data/muscleList.json"
import { useState, useEffect } from "react"
import uniqid from "uniqid"

const AddExerciseModal = ({close, addExerciseHandler, setAddExerciseModal}) => {

  const [toggledMuscles, setToggledMuscles] = useState([])

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

  const closeModal = (e) => {
    e.preventDefault()
    setAddExerciseModal(false)
  }

  return (
    <>
      <div onClick={closeModal} className="add-exercise__overlay"></div>
      <section className={"add-exercise " + (close ? "add-exercise--closing" : "")}>
        <div className="add-exercise__container">
          <div className="add-exercise__top-container">
            <div className="add-exercise__empty"></div>
            <h3 className="add-exercise__title">New Exercise</h3>
            <button onClick={closeModal} className="add-exercise__close-button"><img src={closeIcon} alt="X shaped icon" className="add-exercise__close" /></button>
          </div>
          <div className="add-exercise__bottom-container">
            <p className="add-exercise__copy">Select all muscles involved in exercise:</p>
            <div className="add-exercise__muscle-container">
            {muscleList.array.map(muscle => {
              return <button onClick={() => toggleMuscle(muscle)} key={uniqid()} className={"add-exercise__muscle-button " + (toggledMuscles.includes(muscle) ? "add-exercise__muscle-button--toggled" : null)}>{muscle}</button>
            })}
            </div>
            <form onSubmit={(e) => addExerciseHandler(e, toggledMuscles)} className="add-exercise__form">
              <label htmlFor="" className="add-exercise__label">Exercise Name:
                <input type="text" placeholder="Exercise name is required" className="add-exercise__name" name="name" />
              </label>
              <div className="add-exercise__button-container">
                <button className="add-exercise__button add-exercise__button--submit">Submit</button>
                <button onClick={closeModal} className="add-exercise__button">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddExerciseModal;