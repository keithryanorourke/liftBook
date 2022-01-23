import axios from 'axios'
import {useState, useEffect} from 'react'
import back from "../../assets/icons/arrow_back_black_24dp.svg"
import help from "../../assets/icons/help_outline_black_24dp.svg"
import "./OrientationPage.scss"
import Cookie from "js-cookie"

const OrientationPage = () => {
  const [advanced, setAdvanced] = useState(false)
  const [trackDifficulty, setTrackDifficulty] = useState(false)

  const token = Cookie.get("token")

  const basicHandler = () => {
    const settings = {
      mode: "basic",
      trackDifficulty: false,
      preferredMetric: "RPE",
      trackPercentageOfMax: false
    }
    axios.put("http://localhost:8080/account/settings", settings, {
      headers: {Authorization: `Bearer: ${token}`}
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  const advancedHandler = (e) => {

  }

  if(advanced) {
    return (
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
            <div className="advanced__check-wrapper">
              <div className="advanced__check-separator">
                <input type="checkbox" id="difficulty" name="difficulty" value="difficulty" className="advanced__check" />
                <label htmlFor="difficulty" className="advanced__check-label">Difficulty</label>
                <button className="advanced__help-button">
                  <img src={help} alt="Question mark icon" className="advanced__help" />
                </button>
              </div>
              <div className="advanced__check-separator">
                <input type="checkbox" id="difficulty" name="difficulty" value="Percentage" className="advanced__check" />
                <label htmlFor="difficulty" className="advanced__check-label">%of1RM</label>
                <button className="advanced__help-button">
                  <img src={help} alt="Question mark icon" className="advanced__help" />
                </button>
              </div>
            </div>
            <p className="advanced__prefer">Preferred difficulty metric:</p>
            <div className="advanced__radio-wrapper">
              <div className="advanced__radio-separator">
                <input type="radio" id="rpe" name="difficultyMetric" value="RPE" disabled={trackDifficulty ? false : true} className="advanced__radio" />
                <label htmlFor="rpe" className="advanced__radio-label">RPE</label>
                <button className="advanced__help-button">
                  <img src={help} alt="Question mark icon" className="advanced__help" />
                </button>
              </div>
              <div className="advanced__radio-separator">
                <input type="radio" id="rir" name="difficultyMetric" value="RIR" disabled={trackDifficulty ? false : true} className="advanced__radio" />
                <label htmlFor="rir" className="advanced__radio-label">RIR</label>
                <button className="advanced__help-button">
                  <img src={help} alt="Question mark icon" className="advanced__help" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  }
  return (
    <section className="orientation">
      <div className="orientation__top-container">
        <h1 className="orientation__title">Welcome to liftBook!</h1>
      </div>
      <p className="orientation__copy">Before you get started, please select a tracking mode:</p>
      <div className="orientation__container">
        <div className='orientation__mode'>
          <button onClick={basicHandler} className="orientation__button">Basic</button>
          <li className="orientation__mode-copy">Just track weights and reps!</li>
        </div>
        <div className="orientation__mode">
          <button onClick={() => setAdvanced(true)} className="orientation__button">Advanced</button>
          <li className="orientation__mode-copy">Track advanced metrics like RPE and %of1RM!</li>
          <li className="orientation__mode-copy">Customize what metrics you do and don't want to track!</li>
        </div>
        <p className="orientation__disclaimer">You can change your tracking mode and settings at any time!</p>
      </div>
    </section>
  )
}

export default OrientationPage