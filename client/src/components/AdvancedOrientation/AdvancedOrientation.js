import "./AdvancedOrientation.scss"
import back from "../../assets/icons/arrow_back_black_24dp.svg"
import help from "../../assets/icons/help_outline_black_24dp.svg"
import InformativeModal from "../InformativeModal/InformativeModal"
import React, {useState} from "react"

const AdvancedOrientation = ({advancedHandler, difficultyHandler, setAdvanced, trackDifficulty}) => {
  const [helpInformation, setHelpInformation] = useState({
    title: false,
    copy: false
  })
  const [modal, setModal] = useState(false)

  const closeModal = () => {
    setModal(false)
  }

  const openModal = (e, subject) => {
    e.preventDefault()
    if(subject === "RPE") {
      setHelpInformation({
        title: "RPE",
        copy: "RPE stands for \"rate of perceived exersion\" and is a rough measure of how close you got to failure when performing a set. It is measured on a scale of 1 to 10, where 1 means you were 9 reps away from failure and 10 means you reached failure. Each number in between represents one rep closer to failure. For example, an RPE 7 would mean you were 3 reps away from failure. Some trainees like to track halfway inbetween values, such as value 7.5. This allows for more flexibility and accuracy, but is not neccessary."
      })
    }
    if(subject === "RIR") {
      setHelpInformation({
        title: "RIR",
        copy: "RIR stands for \"reps in reserve\" and is a rough measure of how many more reps you could have potentially gotten after you finished a set. For example, if you performed a set of 8 but felt like you COULD have performed another 3 reps, you would have an RIR of 3."
      })
    }
    if(subject === "PercentageOfMax") {
      setHelpInformation({
        title: "%of1RM",
        copy: "%of1RM is a shorthand for \"Percentage of your one rep max\" and is a measure of the percentage of the weight you are using on a given movement relative to the absolute maximum amount of weight that you could use on said movement for a single rep. This metric is often used to help determine what weight to use on any given movement in many popular intermediate and advanced strength training programs"
      })
    }
    if(subject === "Difficulty") {
      setHelpInformation({
        title: "Difficulty",
        copy: "Tracking the difficulty of your sets is a good way to ensure that you are neither overworking or underworking your body throughout your workouts. It can also help you to identify potential reasons for a plateau. For example, if the first set you perform on every movement is very difficult, then it is likely to tire you out and affect your recovery."
      })
    }
    setModal(true)
  }

  return (
    <>
    {modal ? <InformativeModal title={helpInformation.title} copy={helpInformation.copy} close={closeModal}/> : null}
    <section className="advanced">
      <h1 className="advanced__title">Welcome to liftBook!</h1>
      <div className="advanced__container">
        <div className="advanced__top-container">
          <button onClick={() => setAdvanced(false)} className="advanced__back"><img src={back} alt="" className="advanced__arrow" /></button>
          <h2 className="advanced__subtitle">Advanced Mode:</h2>
          <div className="advanced__empty"></div>
        </div>
        <form onSubmit={advancedHandler} className="advanced__form">
          <p className="advanced__prompt">Please select which advanced metrics you would like to track:</p>
          <div className="advanced__wrapper">
            <div className="advanced__separator">
              <input type="checkbox" id="difficulty" name="difficulty" onClick={difficultyHandler} value="difficulty" className="advanced__option" />
              <label htmlFor="difficulty" className="advanced__label">Difficulty</label>
              <button onClick={(e) => openModal(e, "Difficulty")} className="advanced__help-button">
                <img src={help} alt="Question mark icon" className="advanced__help" />
              </button>
            </div>
            <div className="advanced__separator">
              <input type="checkbox" id="percentage" name="percentage" value="percentage" className="advanced__option" />
              <label htmlFor="difficulty" className="advanced__label">%of1RM</label>
              <button onClick={(e) => openModal(e, "PercentageOfMax")} className="advanced__help-button">
                <img src={help} alt="Question mark icon" className="advanced__help" />
              </button>
            </div>
          </div>
          {trackDifficulty ? 
          <>
          <p className="advanced__prefer">Preferred difficulty metric:</p>
          <div className="advanced__wrapper">
            <div className="advanced__separator">
              <input type="radio" defaultChecked id="rpe" name="difficultyMetric" value="RPE" disabled={trackDifficulty ? false : true} className="advanced__option" />
              <label htmlFor="rpe" className="advanced__label">RPE</label>
              <button onClick={(e) => openModal(e, "RPE")} className="advanced__help-button">
                <img src={help} alt="Question mark icon" className="advanced__help" />
              </button>
            </div>
            <div className="advanced__separator">
              <input type="radio" id="rir" name="difficultyMetric" value="RIR" disabled={trackDifficulty ? false : true} className="advanced__option" />
              <label htmlFor="rir" className="advanced__label">RIR</label>
              <button onClick={(e) => openModal(e, "RIR")} className="advanced__help-button">
                <img src={help} alt="Question mark icon" className="advanced__help" />
              </button>
            </div>
          </div> 
          </>
          : null}
          <button className="advanced__submit">Continue</button>
        </form>
      </div>
    </section>
    </>
  )
}

export default AdvancedOrientation