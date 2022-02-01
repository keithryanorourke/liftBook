import "./SettingsPage.scss"
import axios from "axios"
import { useEffect, useState, useCallback } from "react"
import Cookie from "js-cookie"
import { useNavigate } from "react-router-dom"
import InformativeModal from "../../components/InformativeModal/InformativeModal"
import help from "../../assets/icons/help_outline_black_24dp.svg"

const SettingsPage = ({token}) => {
  const navigate = useCallback(() =>useNavigate())
  const [mode, setMode] = useState(null)
  const [trackDifficulty, setTrackDifficulty] = useState(false)
  const [settings, setSettings] = useState(null)
  const [helpInformation, setHelpInformation] = useState({
    title: false,
    copy: false
  })
  const [modal, setModal] = useState(false)

  useEffect(()=> {
    axios.get(`http://localhost:8080/account/settings`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      setSettings(response.data)
      setMode(response.data.mode)
      setTrackDifficulty(response.data.trackDifficulty)
    })
    .catch(error =>{
      alert(`${error}.\nUser settings not retrieved! You will now be logged out.`)
      Cookie.remove('token')
      navigate('../login', {replace: true})
    })
  }, [navigate, token])

  const submitHandler = (e) => {
    e.preventDefault()
    const newSettings = {
      mode: e.target.mode.value,
      trackDifficulty: e.target.difficulty ? e.target.difficulty.checked : settings.trackDifficulty,
      trackPercentageOfMax: e.target.percentage ? e.target.percentage.checked : settings.trackPercentageOfMax,
      preferredMetric: e.target.difficultyMetric ? e.target.difficultyMetric.value : settings.preferredMetric
    }
    axios.put("http://localhost:8080/account/settings", newSettings, {
      headers: {Authorization: `Bearer: ${token}`}
    })
    .then(response => navigate(-1))
    .catch(error => alert(error))
  }

  const difficultyHandler = (e) => {
    if(e.target.checked) {
      return setTrackDifficulty(true)
    }
    return setTrackDifficulty(false)
  }

  const modeHandler = (e) => {
    return setMode(e.target.value)
  }

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
    if(subject === "basic") {
      setHelpInformation({
        title: "Basic",
        copy: "Basic mode allows you to only worry about tracking the name of the exercise you're performing, and the amount of weight you used and reps you performed! This mode is preferrable if you'd rather not have a crowded screen and just want to get your lifts tracked!"
      })
    }
    if(subject === "advanced") {
      setHelpInformation({
        title: "Advanced",
        copy: "Advanced mode allows you to customize what you want to track! Preferrable if you want to be as detailed as possible when you're tracking a lift!"
      })
    }
    if(subject === "about") {
      setHelpInformation({
        title: "About liftBook",
        copy: "liftBook is a passion project web app made by Keith Ryan O'Rourke! The concept of the app is to provide people at various stages of fitness with a tool to track their workouts and give THEM the option to choose how much they want to track and how much they want to see in their logs. liftBook is currently in its first stages of development, I hope to implement more advanced tracking features and chart based progress data for users in the future."
      })
    }
    setModal(true)
  }

  const logoutHandler = () => {
    Cookie.remove('token')
    navigate('../login', {replace: true})
  }
  

  if(!settings){
    return (
      <section className="settings">
        <div className="settings__top-container">
          <h2 className="settings__title">Settings</h2>
        </div>
      </section>
    )
  } 

  return (
    <>
      {modal ? <InformativeModal 
      title={helpInformation.title} 
      copy={helpInformation.copy} 
      close={closeModal}
      /> 
      : null}
      <section className="settings">
        <div className="settings__top-container">
          <h2 className="settings__title">Settings</h2>
        </div>
        <form onSubmit={submitHandler} className="settings__form">
        <p className="settings__prefer">Mode:</p>
            <div className="settings__wrapper">
              <div className="settings__separator">
                <input type="radio" id="basic" name="mode" value="basic" onClick={modeHandler} defaultChecked={settings.mode === "basic"} className="settings__option" />
                <label htmlFor="basic" className="settings__label">Basic</label>
                <button onClick={(e) => openModal(e, "basic")} className="settings__help-button">
                  <img src={help} alt="Question mark icon" className="settings__help" />
                </button>
              </div>
              <div className="settings__separator">
                <input type="radio" id="advanced" name="mode" value="advanced" onClick={modeHandler} defaultChecked={settings.mode === "advanced"} className="settings__option" />
                <label htmlFor="advanced" className="settings__label">Advanced</label>
                <button onClick={(e) => openModal(e, "advanced")} className="settings__help-button">
                  <img src={help} alt="Question mark icon" className="settings__help" />
                </button>
              </div>
            </div> 
            {mode === "advanced" ? 
            <div className="settings__advanced-container">
            <p className="settings__prompt">Please select which advanced metrics you would like to track:</p>
            <div className="settings__wrapper">
              <div className="settings__separator">
                <input type="checkbox" id="difficulty" defaultChecked={settings.trackDifficulty} name="difficulty" onClick={difficultyHandler} value="difficulty" className="settings__option" />
                <label htmlFor="difficulty" className="settings__label">Difficulty</label>
                <button onClick={(e) => openModal(e, "Difficulty")} className="settings__help-button">
                  <img src={help} alt="Question mark icon" className="settings__help" />
                </button>
              </div>
              <div className="settings__separator">
                <input type="checkbox" id="percentage" defaultChecked={settings.trackPercentageOfMax} name="percentage" value="percentage" className="settings__option" />
                <label htmlFor="difficulty" className="settings__label">%of1RM</label>
                <button onClick={(e) => openModal(e, "PercentageOfMax")} className="settings__help-button">
                  <img src={help} alt="Question mark icon" className="settings__help" />
                </button>
              </div>
            </div>
            {trackDifficulty ? 
            <div className="settings__preferance-container">
            <p className="settings__prefer">Preferred difficulty metric:</p>
            <div className="settings__wrapper">
              <div className="settings__separator">
                <input type="radio" defaultChecked={settings.preferredMetric === "RPE"} id="rpe" name="difficultyMetric" value="RPE" className="settings__option" />
                <label htmlFor="rpe" className="settings__label">RPE</label>
                <button onClick={(e) => openModal(e, "RPE")} className="settings__help-button">
                  <img src={help} alt="Question mark icon" className="settings__help" />
                </button>
              </div>
              <div className="settings__separator">
                <input type="radio" defaultChecked={settings.preferredMetric === "RIR"} id="rir" name="difficultyMetric" value="RIR" className="settings__option" />
                <label htmlFor="rir" className="settings__label">RIR</label>
                <button onClick={(e) => openModal(e, "RIR")} className="settings__help-button">
                  <img src={help} alt="Question mark icon" className="settings__help" />
                </button>
              </div>
            </div> 
            </div>
            : null}
            </div>
            : null}
            <button className="settings__button settings__button--submit">Save</button>
          </form>
          <div className="settings__extra-buttons">
            <button onClick={logoutHandler} className="settings__button">Logout</button>
            <button onClick={(e) => openModal(e, "about")} className="settings__button">About</button>
          </div>
      </section>
    </>
  )
}

export default SettingsPage