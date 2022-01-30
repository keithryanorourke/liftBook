import axios from "axios";
import "./EditLiftModal.scss"
import closeIcon from "../../assets/icons/clear_black_24dp.svg"
import LiftModal from "../AddLiftModal/AddLiftModal";
import { useEffect, useState } from "react";

const EditLiftModal = ({settings, close, lift, exercises, editLiftHandler, setEditLiftModal}) => {
  const closeModal = (e) => {
    e.preventDefault()
    setEditLiftModal(false)
  }

  const [exerciseValue, setExerciseValue] = useState(lift.name)

  useEffect(() => {
    setExerciseValue(lift.name)
  }, [])

  const handleSelect = (e) => {
    e.preventDefault()
    setExerciseValue(e.target.value)
  }

  let difficulty;
  if(lift.metric === "RPE") {
    if (!lift.difficulty) {
      difficulty = ""
    }
    else {
      difficulty = lift.difficulty
    }
  }
  else {
    difficulty = lift.difficulty
  }

  return (
    <>
      <div className="edit-lift__overlay "></div>
      <section className={"edit-lift " + (close ? "edit-lift--closing" : "")}>
        <div className="edit-lift__container">
          <div className="edit-lift__top-container">
            <div className="edit-lift__empty"></div>
            <h2 className="edit-lift__title">Edit {lift.name}</h2>
            <button onClick={closeModal} className="edit-lift__close"><img src={closeIcon} alt="X icon" className="edit-lift__x" /></button>
          </div>
          <div className="edit-lift__scroll-container">
            <form onSubmit={(e) => editLiftHandler(e, lift.id)} className="edit-lift__form">
              <label htmlFor="" className="edit-lift__label">Exercise:
                <select name="exercise" id="" value={exerciseValue} onChange={handleSelect} className="edit-lift__exercise-dropdown"> 
                  {exercises.map(exercise => {
                    return <option key={exercise.id} value={exercise.name} className="edit-lift__exercise-option">{exercise.name}</option>
                  })}
                </select>
              </label>
              <label className="edit-lift__label">Weight:
                <input type="number" step=".01" name="weight" defaultValue={lift.weight || ""} placeholder="Leave blank for bodyweight" className="edit-lift__input" />
              </label>
              <div className="edit-lift__radio-container">
                <div className="edit-lift__separator">
                  <input type="radio" id="lbs" defaultChecked={lift.measure==="lbs"} value="lbs" name="weightMetric" className="edit-lift__radio"/>
                  <label htmlFor="lbs" className="edit-lift__label edit-lift__label--radio">lbs</label>
                </div>
                <div className="edit-lift__separator">
                  <input type="radio" id="kg" defaultChecked={lift.measure==="kg"} value="kg" name="weightMetric" className="edit-lift__radio"/>
                  <label htmlFor="kg" className="edit-lift__label edit-lift__label--radio">kg</label>
                </div>
              </div>
              <label className="edit-lift__label">Reps:
                <input type="number" defaultValue={lift.reps} placeholder="Enter a whole number greater than 0" name="reps" className="edit-lift__input" />
              </label>
              {settings.trackDifficulty ? 
              <label className="edit-lift__label">{lift.metric}:
                <input type="number" defaultValue={difficulty} step=".5" placeholder="untracked" name="difficulty" className="edit-lift__input" />
              </label>
              : null
            }
              {settings.trackPercentageOfMax ? 
              <label className="edit-lift__label">%of1RM:
                <input type="number" step=".5" placeholder="untracked" name="percentage" className="edit-lift__input" />
              </label>
              : null
            }
              <div className="edit-lift__button-container">
                <button className="edit-lift__button edit-lift__button--submit">Save</button>
                <button onClick={closeModal} className="edit-lift__button">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default EditLiftModal;