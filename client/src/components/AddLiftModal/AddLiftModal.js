import axios from "axios";
import muscleList from "../../assets/data/muscleList.json"
import "./AddLiftModal.scss"
import closeIcon from "../../assets/icons/clear_black_24dp.svg"
import uniqid from "uniqid"
import { useState, useEffect } from "react";

const LiftModal = ({settings, close, exercises, addLiftHandler, setAddLiftModal}) => {

  // setInterval(()=>console.log(toggledMuscles), 3000)
  
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
          <h2 className="add-lift__title">Add New Lift</h2>
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
            <select name="exercise" id="" className="add-lift__exercise-dropdown">
              {filteredExercises.map(exercise => {
                return <option key={uniqid()} value={JSON.stringify(exercise)} className="add-lift__exercise-option">{exercise.name}</option>
              })}
            </select>
          </label>
          <label className="add-lift__label">Weight:
            <input type="number" step=".01" name="weight" placeholder="Leave blank for bodyweight" className="add-lift__input" />
          </label>
          <div className="add-lift__radio-container">
            <div className="add-lift__separator">
              <input type="radio" id="lbs" defaultChecked value="lbs" name="weightMetric" className="add-lift__radio"/>
              <label htmlFor="lbs" className="add-lift__label add-lift__label--radio">lbs</label>
            </div>
            <div className="add-lift__separator">
              <input type="radio" id="kg" value="kg" name="weightMetric" className="add-lift__radio"/>
              <label htmlFor="kg" className="add-lift__label add-lift__label--radio">kg</label>
            </div>
          </div>
          <label className="add-lift__label">Reps:
            <input type="number" placeholder="Enter a whole number greater than 0" name="reps" className="add-lift__input" />
          </label>
          {settings.trackDifficulty ? 
          <label className="add-lift__label">{settings.preferredMetric}:
            <input type="number" step=".5" placeholder={settings.preferredMetric === "RPE" ? "Number between 1-10" : "Any non negative number"} name="difficulty" className="add-lift__input" />
          </label>
          : null
          }
          {settings.trackPercentageOfMax ? 
          <label className="add-lift__label">%of1RM:
            <input type="number" name="percentage" className="add-lift__input" />
          </label>
          : null
          }
          <div className="add-lift__button-container">
            <button onClick={closeModal} className="add-lift__button">Cancel</button>
            <button className="add-lift__button add-lift__button--submit">Save</button>
          </div>
        </form>
        </div>
      </div>
    </section>
    </>
  )
}

export default LiftModal;