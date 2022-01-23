import {useState, useEffect} from 'react'
import back from "../../assets/icons/arrow_back_black_24dp.svg"
import "./OrientationPage.scss"

const OrientationPage = () => {
  const [advanced, setAdvanced] = useState(false)

  const basicHandler = (e) => {
    
  }

  if(advanced) {
    return (
      <section className="advanced">
        <button onClick={() => setAdvanced(false)} className="advanced__back"><img src={back} alt="" className="advanced__arrow" /></button>
      </section>
    )
  }
  return (
    <section className="orientation">
      <div className="orientation__top-container">
        <h1 className="orientation__title">Welcome to liftBook!</h1>
      </div>
      <div className="orientation__container">
        <p className="orientation__copy">Before you get started, please select a tracking mode:</p>
        <div className='orientation__mode'>
          <button className="orientation__button">BASIC</button>
          <li className="orientation__mode-copy">Just track weights and reps!</li>
        </div>
        <div className="orientation__mode">
          <button onClick={() => setAdvanced(true)} className="orientation__button">ADVANCED</button>
          <li className="orientation__mode-copy">Track advanced metrics like RPE and %of1RM!</li>
          <li className="orientation__mode-copy">Customize what metrics you do and don't want to track!</li>
        </div>
        <p className="orientation__disclaimer">You can change your tracking mode and settings at any time!</p>
      </div>
    </section>
  )
}

export default OrientationPage