import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from "react-router-dom"
import "./OrientationPage.scss"
import AdvancedOrientation from '../../components/AdvancedOrientation/AdvancedOrientation'
const {REACT_APP_BACKEND_URL} = process.env

const OrientationPage = ({token}) => {
  const [advanced, setAdvanced] = useState(false)
  const [trackDifficulty, setTrackDifficulty] = useState(false)
  const navigate = useNavigate()

  const basicHandler = () => {
    const settings = {
      mode: "basic",
      trackDifficulty: false,
      preferredMetric: "RPE",
      trackPercentageOfMax: false
    }
    axios.put(`${REACT_APP_BACKEND_URL}/account/settings`, settings, {
      headers: {Authorization: `Bearer: ${token}`}
    })
    .then(response => navigate("../", {replace: true}))
    .catch(error => alert(error))
  }

  const advancedHandler = (e) => {
    e.preventDefault()
    const settings = {
      mode: "advanced",
      trackDifficulty: e.target.difficulty.checked,
      trackPercentageOfMax: e.target.percentage.checked,
      preferredMetric: (e.target.difficultyMetric ? e.target.difficultyMetric.value : "RPE")
    }
    axios.put(`${REACT_APP_BACKEND_URL}/account/settings`, settings, {
      headers: {Authorization: `Bearer: ${token}`}
    })
    .then(response => navigate("../", {replace: true}))
    .catch(error => alert(error))
  }

  const difficultyHandler = (e) => {
    if(e.target.checked) {
      return setTrackDifficulty(true)
    }
    return setTrackDifficulty(false)
  }

  if(advanced) {
    return(<AdvancedOrientation 
      advancedHandler={advancedHandler} 
      setAdvanced={setAdvanced} 
      difficultyHandler={difficultyHandler} 
      trackDifficulty={trackDifficulty} /> )
  }
  return (
    <section className="orientation">
      <div className="orientation__top-container">
        <h2 className="orientation__title">Welcome to liftBook!</h2>
      </div>
      <p className="orientation__copy">Before you get started, please select a tracking mode:</p>
      <div className="orientation__container">
        <div className='orientation__mode orientation__mode--basic'>
          <button onClick={basicHandler} className="orientation__button">Basic</button>
          <li className="orientation__mode-copy">Just track weights and reps!</li>
        </div>
        <div className="orientation__mode orientation__mode--advanced">
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