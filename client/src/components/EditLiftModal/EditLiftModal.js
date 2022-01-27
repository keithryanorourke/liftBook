import axios from "axios";
import "./LiftModal.scss"
import close from "../../assets/icons/clear_black_24dp.svg"

const LiftModal = ({settings, exercises, addLiftHandler, setOpenLiftModal}) => {
  const closeModal = (e) => {
    e.preventDefault()
    setOpenLiftModal(false)
  }

  console.log(settings)

  return (
    <>
    <div className="edit-lift__overlay"></div>
    <section className="edit-lift">
      <div className="edit-lift__container">
        <div className="edit-lift__top-container">
          <div className="edit-lift__empty"></div>
          <h2 className="edit-lift__title">Add New Lift</h2>
          <button onClick={closeModal} className="edit-lift__close"><img src={close} alt="X icon" className="edit-lift__x" /></button>
        </div>
        <form onSubmit={addLiftHandler} className="edit-lift__form">
          <label htmlFor="" className="edit-lift__label">Exercise:
            <select name="exercise" id="" className="edit-lift__exercise-dropdown">
              {exercises.map(exercise => {
                return <option key={exercise.id} value={JSON.stringify(exercise)} className="edit-lift__exercise-option">{exercise.name}</option>
              })}
            </select>
          </label>
          <label className="edit-lift__label">Weight:
            <input type="number" step=".01" name="weight" placeholder="Leave blank for bodyweight" className="edit-lift__input" />
          </label>
          <div className="edit-lift__radio-container">
            <div className="edit-lift__separator">
              <input type="radio" id="lbs" defaultChecked value="lbs" name="weightMetric" className="edit-lift__radio"/>
              <label htmlFor="lbs" className="edit-lift__label edit-lift__label--radio">lbs</label>
            </div>
            <div className="edit-lift__separator">
              <input type="radio" id="kg" value="kg" name="weightMetric" className="edit-lift__radio"/>
              <label htmlFor="kg" className="edit-lift__label edit-lift__label--radio">kg</label>
            </div>
          </div>
          <label className="edit-lift__label">Reps:
            <input type="number" placeholder="Enter a whole number greater than 0" name="reps" className="edit-lift__input" />
          </label>
          {settings.trackDifficulty ? 
          <label className="edit-lift__label">{settings.preferredMetric}:
            <input type="number" step=".5" placeholder={settings.preferredMetric === "RPE" ? "Number between 1-10" : "Any non negative number"} name="difficulty" className="edit-lift__input" />
          </label>
          : null
          }
          {settings.trackPercentageOfMax ? 
          <label className="edit-lift__label">%of1RM:
            <input type="number" name="percentage" className="edit-lift__input" />
          </label>
          : null
          }
          <div className="edit-lift__button-container">
            <button onClick={closeModal} className="edit-lift__button">Cancel</button>
            <button className="edit-lift__button edit-lift__button--submit">Save</button>
          </div>
        </form>
      </div>
    </section>
    </>
  )
}

export default LiftModal;