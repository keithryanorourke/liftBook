import "./SettingsPage.scss"
import { useEffect, useState, useCallback, useContext } from "react"
import { useNavigate } from "react-router-dom"
import help from "../../assets/icons/help_outline_black_24dp.svg"
import useConfiguredAxios from "../../hooks/useConfiguredAxios"
import { UserSettingsSetterContext } from "../../contexts/UserSettingsSetterContext"
import AboutDialog from "../../components/AboutDialog/AboutDialog"
import InfoButton from "../../components/InfoButton/InfoButton"

const SettingsPage = () => {
  const navigateCallback = useNavigate()
  const navigate = useCallback((path, obj) => navigateCallback(path, obj), [navigateCallback])
  const [mode, setMode] = useState(null)
  const [trackDifficulty, setTrackDifficulty] = useState(false)
  const [settings, setSettings] = useState(null)
  const [showAbout, setShowAbout] = useState(false)
  const axios = useConfiguredAxios();
  const setUserSettings = useContext(UserSettingsSetterContext);

  useEffect(() => {
    axios.get(`/account/settings`)
      .then(response => {
        setSettings(response.data)
        setMode(response.data.mode)
        setTrackDifficulty(response.data.trackDifficulty)
      })
      .catch(error => {
        alert(`${error}.\nUser settings not retrieved! You will now be logged out.`)
        navigate('../login', { replace: true })
      })
  }, [navigate, axios])

  const submitHandler = async (e) => {
    e.preventDefault()
    const newSettings = {
      mode: e.target.mode.value,
      trackDifficulty: e.target.difficulty ? e.target.difficulty.checked : settings.trackDifficulty,
      trackPercentageOfMax: e.target.percentage ? e.target.percentage.checked : settings.trackPercentageOfMax,
      preferredMetric: e.target.difficultyMetric ? e.target.difficultyMetric.value : settings.preferredMetric
    }
    try {
      await axios.put(`/account/settings`, newSettings)
      setUserSettings(newSettings);
      navigate(-1)
    } catch (err) {
      alert(err);
    }
  }

  const difficultyHandler = (e) => {
    if (e.target.checked) {
      return setTrackDifficulty(true)
    }
    return setTrackDifficulty(false)
  }

  const modeHandler = (e) => {
    return setMode(e.target.value)
  }

  const logoutHandler = () => {
    navigate('../login', { replace: true })
  }


  if (!settings) {
    return (
      <section className="settings">
        <div className="settings__top-container">
          <h2 className="settings__title">Settings</h2>
        </div>
      </section>
    )
  }

  return (
    <section className="settings">
      <AboutDialog
        visible={showAbout}
        onClose={() => setShowAbout(false)}
      />
      <div className="settings__top-container">
        <h2 className="settings__title">Settings</h2>
      </div>
      <div className="settings__bottom-container">
        <form onSubmit={submitHandler} className="settings__form">
          <div className="settings__mode-container">
            <p className="settings__prefer">Mode:</p>
            <div className="settings__wrapper">
              <div className="settings__separator">
                <input type="radio" id="basic" name="mode" value="basic" onClick={modeHandler} defaultChecked={settings.mode === "basic"} className="settings__option" />
                <label htmlFor="basic" className="settings__label">Basic</label>
                <InfoButton
                  title="Basic"
                  label="Basic mode allows you to only worry about tracking the name of the exercise you're performing, and the amount of weight you used and reps you performed! This mode is preferrable if you'd rather not have a crowded screen and just want to get your lifts tracked!"
                />
              </div>
              <div className="settings__separator">
                <input type="radio" id="advanced" name="mode" value="advanced" onClick={modeHandler} defaultChecked={settings.mode === "advanced"} className="settings__option" />
                <label htmlFor="advanced" className="settings__label">Advanced</label>
                <InfoButton
                  title="Advanced"
                  info="Advanced mode allows you to customize what you want to track! Preferrable if you want to be as detailed as possible when you're tracking a lift!"
                />
              </div>
            </div>
          </div>
          {mode === "advanced" ?
            <div className="settings__advanced-container">
              <div className="settings__enabled-container">
                <p className="settings__prompt">Select enabled metrics:</p>
                <div className="settings__wrapper">
                  <div className="settings__separator">
                    <input type="checkbox" id="difficulty" defaultChecked={settings.trackDifficulty} name="difficulty" onClick={difficultyHandler} value="difficulty" className="settings__option" />
                    <label htmlFor="difficulty" className="settings__label">Difficulty</label>
                    <InfoButton
                      title="Difficulty"
                      info="Tracking the difficulty of your sets is a good way to ensure that you are neither overworking or underworking your body throughout your workouts. It can also help you to identify potential reasons for a plateau. For example, if the first set you perform on every movement is very difficult, then it is likely to tire you out and affect your recovery."
                    />
                  </div>
                  <div className="settings__separator">
                    <input type="checkbox" id="percentage" defaultChecked={settings.trackPercentageOfMax} name="percentage" value="percentage" className="settings__option" />
                    <label htmlFor="difficulty" className="settings__label">%of1RM</label>
                    <InfoButton
                      title="%of1RM"
                      info={"%of1RM is a shorthand for \" Percentage of your one rep max\" and is a measure of the percentage of the weight you are using on a given movement relative to the absolute maximum amount of weight that you could use on said movement for a single rep. This metric is often used to help determine what weight to use on any given movement in many popular intermediate and advanced strength training programs"}
                    />
                  </div>
                </div>
              </div>
              {trackDifficulty ?
                <div className="settings__preferance-container">
                  <p className="settings__prefer">Preferred difficulty metric:</p>
                  <div className="settings__wrapper">
                    <div className="settings__separator">
                      <input type="radio" defaultChecked={settings.preferredMetric === "RPE"} id="rpe" name="difficultyMetric" value="RPE" className="settings__option" />
                      <label htmlFor="rpe" className="settings__label">RPE</label>
                      <InfoButton
                        title="RPE"
                        info={"RPE stands for \"rate of perceived exersion\" and is a rough measure of how close you got to failure when performing a set. It is measured on a scale of 1 to 10, where 1 means you were 9 reps away from failure and 10 means you reached failure. Each number in between represents one rep closer to failure. For example, an RPE 7 would mean you were 3 reps away from failure. Some trainees like to track halfway inbetween values, such as value 7.5. This allows for more flexibility and accuracy, but is not neccessary."}
                      />
                    </div>
                    <div className="settings__separator">
                      <input type="radio" defaultChecked={settings.preferredMetric === "RIR"} id="rir" name="difficultyMetric" value="RIR" className="settings__option" />
                      <label htmlFor="rir" className="settings__label">RIR</label>
                      <InfoButton
                        title="RIR"
                        info={"RIR stands for \"reps in reserve\" and is a rough measure of how many more reps you could have potentially gotten after you finished a set. For example, if you performed a set of 8 but felt like you COULD have performed another 3 reps, you would have an RIR of 3."}
                      />
                    </div>
                  </div>
                </div>
                : null}
            </div>
            : null}
          <div className="settings__push-save"></div>
          <button className="settings__button settings__button--submit">Save</button>
        </form>
        <div className="settings__extra-buttons">
          <button onClick={logoutHandler} className="settings__button">Logout</button>
          <button onClick={() => setShowAbout(true)} className="settings__button">About</button>
        </div>
      </div>
    </section>
  )
}

export default SettingsPage