import axios from "axios";
import "./AddLiftModal.scss"
import closeIcon from "../../assets/icons/clear_black_24dp.svg"

const LiftModal = ({settings, close, exercises, addLiftHandler, setAddLiftModal}) => {
  const closeModal = (e) => {
    e.preventDefault()
    setAddLiftModal(false)
  }

  console.log(settings)

  return (
    <>
    <div onClick={() => setAddLiftModal(false)} className={"add-lift__overlay "  + (close ? "add-lift__closing" : "")}></div>
    <section className={"add-lift " + (close ? "add-lift__closing" : "")}>
      <div className="add-lift__container">
        <div className="add-lift__top-container">
          <div className="add-lift__empty"></div>
          <h2 className="add-lift__title">Add New Lift</h2>
          <button onClick={closeModal} className="add-lift__close"><img src={closeIcon} alt="X icon" className="add-lift__x" /></button>
        </div>
        <form onSubmit={addLiftHandler} className="add-lift__form">
          <label htmlFor="" className="add-lift__label">Exercise:
            <select name="exercise" id="" className="add-lift__exercise-dropdown">
              {exercises.map(exercise => {
                return <option key={exercise.id} value={JSON.stringify(exercise)} className="add-lift__exercise-option">{exercise.name}</option>
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
    </section>
    </>
  )
}

export default LiftModal;