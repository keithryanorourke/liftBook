import axios from "axios";
import muscleList from "../../assets/data/muscleList.json"
import "./AddLiftModal.scss"
import closeIcon from "../../assets/icons/clear_black_24dp.svg"
import uniqid from "uniqid"
import { useState, useEffect } from "react";

const LiftModal = ({settings, close, exercises, addLiftHandler, setAddLiftModal, previousLift}) => {

  const closeModal = (e) => {
    e.preventDefault()
    setAddLiftModal(false)
  }

  const [toggledMuscles, setToggledMuscles] = useState([])
  const [filteredExercises, setFilteredExercises] = useState(exercises)

  const toggleMuscle = (muscle) => {
    if(toggledMuscles.includes(muscle)) {
      let newArray = toggledMuscles
        const indexToRemove = newArray.indexOf(muscle)
        newArray.splice(indexToRemove, 1)
        setToggledMuscles(newArray)
        if(!newArray.length) {
          return setFilteredExercises(exercises)
        }
      } else {
        let newArray = toggledMuscles
        newArray.push(muscle)
        setToggledMuscles(newArray)
      }
      const filterByMuscles = exercises.filter(exercise => {
        const musclesSpaceRemoved = exercise.muscle.replaceAll(' ', '')
        const splitMuscles = musclesSpaceRemoved.split(',')
        return splitMuscles.some(muscle => toggledMuscles.includes(muscle))
      })
    setFilteredExercises(filterByMuscles)
  }

  return (
    <>
    <div onClick={() => setAddLiftModal(false)} className="add-lift__overlay"></div>
    <section className={"add-lift " + (close ? "add-lift--closing" : "")}>
      <div className="add-lift__container">
        <div className="add-lift__top-container">
          <div className="add-lift__empty"></div>
          <h3 className="add-lift__title">Add Lift</h3>
          <button onClick={closeModal} className="add-lift__close"><img src={closeIcon} alt="X icon" className="add-lift__x" /></button>
        </div>
        <div className="add-lift__scroll-container">
        <p className="add-lift__subtitle">Filter exercises by muscles:</p>
        <div className="add-lift__muscle-container">
          {muscleList.array.map((muscle, index) => {
            return <button onClick={() => toggleMuscle(muscle)} key={uniqid()} className={"add-lift__muscle-button " + (toggledMuscles.includes(muscle) ? "add-lift__muscle-button--toggled" : "")}>{muscle}</button>
          })}
        </div>
        <form onSubmit={addLiftHandler} className="add-lift__form">
          <label htmlFor="" className="add-lift__label">Exercise:
            <select name="exercise" defaultValue={previousLift ? previousLift.name : "Squat"} id="" className="add-lift__exercise-dropdown">
              {filteredExercises.map(exercise => {
                return <option key={uniqid()} value={exercise.name} className="add-lift__exercise-option">{exercise.name}</option>
              })}
            </select>
          </label>
          <label className="add-lift__label">Weight:
            <input type="number" step=".01" name="weight" defaultValue={previousLift ? (previousLift.weight || "") : ""} placeholder="Leave blank for bodyweight" className="add-lift__input" />
          </label>
          <div className="add-lift__radio-container">
            <div className="add-lift__separator">
              <input type="radio" id="lbs" defaultChecked={previousLift ? (previousLift.measure === "lbs") : true} value="lbs" name="weightMetric" className="add-lift__radio"/>
              <label htmlFor="lbs" className="add-lift__label add-lift__label--radio">lbs</label>
            </div>
            <div className="add-lift__separator">
              <input type="radio" id="kg" defaultChecked={previousLift ? (previousLift.measure === "kg") : false} value="kg" name="weightMetric" className="add-lift__radio"/>
              <label htmlFor="kg" className="add-lift__label add-lift__label--radio">kg</label>
            </div>
          </div>
          <label className="add-lift__label">Reps:
            <input type="number" defaultValue={previousLift ? previousLift.reps : ""} placeholder="Enter a whole number greater than 0" name="reps" className="add-lift__input" />
          </label>
          {settings.trackDifficulty && settings.mode==="advanced" ? 
          <label className="add-lift__label">{settings.preferredMetric} (optional):
            <input type="number" step=".5" defaultValue={previousLift ? (settings.preferredMetric === "RIR" ? previousLift.difficulty : previousLift.difficulty || "") : ""} placeholder={settings.preferredMetric === "RPE" ? "Number between 1.0-10.0" : "Any non negative number"} name="difficulty" className="add-lift__input" />
          </label>
          : null
          }
          {settings.trackPercentageOfMax && settings.mode==="advanced" ? 
          <label className="add-lift__label">%of1RM (optional):
            <input type="number" defaultValue={previousLift ? (previousLift.percentageOfMax || "") : ""} name="percentage" step=".5" placeholder="Any number between 1.0 and 100.0" className="add-lift__input" />
          </label>
          : null
          }
          <div className="add-lift__button-container">
            <button className="add-lift__button add-lift__button--submit">Save</button>
            <button onClick={closeModal} className="add-lift__button">Cancel</button>
          </div>
        </form>
        </div>
      </div>
    </section>
    </>
  )
}

export default LiftModal;