import "./AdvancedOrientation.scss"
import back from "../../assets/icons/arrow_back_black_24dp.svg"
import help from "../../assets/icons/help_outline_black_24dp.svg"

const AdvancedOrientation = ({advancedHandler, difficultyHandler, setAdvanced, trackDifficulty}) => {
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
          <div className="advanced__wrapper">
            <div className="advanced__separator">
              <input type="checkbox" id="difficulty" name="difficulty" onClick={difficultyHandler} value="difficulty" className="advanced__option" />
              <label htmlFor="difficulty" className="advanced__label">Difficulty</label>
              <button className="advanced__help-button">
                <img src={help} alt="Question mark icon" className="advanced__help" />
              </button>
            </div>
            <div className="advanced__separator">
              <input type="checkbox" id="percentage" name="percentage" value="percentage" className="advanced__option" />
              <label htmlFor="difficulty" className="advanced__label">%of1RM</label>
              <button className="advanced__help-button">
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
              <button className="advanced__help-button">
                <img src={help} alt="Question mark icon" className="advanced__help" />
              </button>
            </div>
            <div className="advanced__separator">
              <input type="radio" id="rir" name="difficultyMetric" value="RIR" disabled={trackDifficulty ? false : true} className="advanced__option" />
              <label htmlFor="rir" className="advanced__label">RIR</label>
              <button className="advanced__help-button">
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
  )
}

export default AdvancedOrientation