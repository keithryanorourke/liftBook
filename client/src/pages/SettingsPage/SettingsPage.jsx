import "./SettingsPage.scss"
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useConfiguredAxios from "../../hooks/useConfiguredAxios"
import { UserSettingsContext } from "../../contexts/UserSettingsContext"
import { UserSettingsSetterContext } from "../../contexts/UserSettingsSetterContext"
import AboutDialog from "../../components/AboutDialog/AboutDialog"
import Checkbox from "../../components/Checkbox/Checkbox"
import RadioButton from "../../components/RadioButton/RadioButton"
import Form from "../../components/Form/Form"
import { useLocalStorage } from "usehooks-ts"
import Button from "../../components/Button/Button"
import FieldSet from "../../components/FieldSet/FieldSet"

const SettingsPage = () => {
  const navigate = useNavigate()
  const settings = useContext(UserSettingsContext);
  const setUserSettings = useContext(UserSettingsSetterContext);
  const [mode, setMode] = useState(null)
  const [trackDifficulty, setTrackDifficulty] = useState(false)
  const [trackPercentage, setTrackPercentage] = useState(false)
  const [preferredMetric, setPreferredMetric] = useState(null)
  const [showAbout, setShowAbout] = useState(false)
  const [formError, setFormError] = useState(null);
  const [, , removeToken] = useLocalStorage("token");
  const axios = useConfiguredAxios();

  useEffect(() => {
    if (settings) {
      setMode(settings.mode);
      setTrackDifficulty(settings.trackDifficulty);
      setTrackPercentage(settings.trackPercentageOfMax);
      setPreferredMetric(settings.preferredMetric)
    }
  }, [settings])

  const submitHandler = async (e) => {
    e.preventDefault()
    setFormError(null)
    const newSettings = {
      mode: mode,
      trackDifficulty: trackDifficulty,
      trackPercentageOfMax: trackPercentage,
      preferredMetric: preferredMetric
    }
    try {
      await axios.put(`/account/settings`, newSettings)
      setUserSettings(newSettings);
      navigate(-1)
    } catch (err) {
      setFormError("Server error encountered")
    }
  }

  const logoutHandler = () => {
    removeToken();
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
        <Form
          onSubmit={submitHandler}
          error={formError}
          buttons={<Button theme="outlined" color="secondary">Save</Button>}
        >
          <FieldSet
            label="Mode:"
          >
            <div className="settings__wrapper">
              <div className="settings__separator">
                <RadioButton
                  label="Basic"
                  value="basic"
                  name="mode"
                  onChange={(e) => setMode(e.target.value)}
                  checked={mode === 'basic'}
                  info="Basic mode allows you to only worry about tracking the name of the exercise you're performing, and the amount of weight you used and reps you performed! This mode is preferrable if you'd rather not have a crowded screen and just want to get your lifts tracked!"
                />
              </div>
              <div className="settings__separator">
                <RadioButton
                  label="Advanced"
                  value="advanced"
                  name="mode"
                  onChange={(e) => setMode(e.target.value)}
                  checked={mode === 'advanced'}
                  info="Advanced mode allows you to customize what you want to track! Preferrable if you want to be as detailed as possible when you're tracking a lift!"
                />
              </div>
            </div>
          </FieldSet>
          {mode === "advanced" &&
            <div className="settings__advanced-container">
              <div className="settings__enabled-container">
                <FieldSet label="Select enabled metrics:">
                  <div className="settings__wrapper">
                    <div className="settings__separator">
                      <Checkbox
                        label="Difficulty"
                        value="difficulty"
                        name="difficulty"
                        onChange={() => setTrackDifficulty(prev => !prev)}
                        checked={trackDifficulty}
                        info="Tracking the difficulty of your sets is a good way to ensure that you are neither overworking or underworking your body throughout your workouts. It can also help you to identify potential reasons for a plateau. For example, if the first set you perform on every movement is very difficult, then it is likely to tire you out and affect your recovery."
                      />
                    </div>
                    <div className="settings__separator">
                      <Checkbox
                        label="Percentage"
                        name="percentage"
                        value="percentage"
                        onChange={() => setTrackPercentage(prev => !prev)}
                        checked={trackPercentage}
                        info={"%of1RM is a shorthand for \" Percentage of your one rep max\" and is a measure of the percentage of the weight you are using on a given movement relative to the absolute maximum amount of weight that you could use on said movement for a single rep. This metric is often used to help determine what weight to use on any given movement in many popular intermediate and advanced strength training programs"}
                      />
                    </div>
                  </div>
                </FieldSet>
              </div>
              {trackDifficulty &&
                <div className="settings__preferance-container">
                  <FieldSet label="Preferred difficulty metric:">
                    <div className="settings__wrapper">
                      <div className="settings__separator">
                        <RadioButton
                          label="RPE"
                          name="preferredMetric"
                          value="RPE"
                          checked={preferredMetric === "RPE"}
                          onChange={(e) => setPreferredMetric(e.target.value)}
                          info={"RPE stands for \"rate of perceived exersion\" and is a rough measure of how close you got to failure when performing a set. It is measured on a scale of 1 to 10, where 1 means you were 9 reps away from failure and 10 means you reached failure. Each number in between represents one rep closer to failure. For example, an RPE 7 would mean you were 3 reps away from failure. Some trainees like to track halfway inbetween values, such as value 7.5. This allows for more flexibility and accuracy, but is not neccessary."}
                        />
                      </div>
                      <div className="settings__separator">
                        <RadioButton
                          label="RIR"
                          name="preferredMetric"
                          value="RIR"
                          checked={preferredMetric === "RIR"}
                          onChange={(e) => setPreferredMetric(e.target.value)}
                          info={"RIR stands for \"reps in reserve\" and is a rough measure of how many more reps you could have potentially gotten after you finished a set. For example, if you performed a set of 8 but felt like you COULD have performed another 3 reps, you would have an RIR of 3."}
                        />
                      </div>
                    </div>
                  </FieldSet>
                </div>}
            </div>}
          <div className="settings__push-save"></div>
        </Form>
        <div className="settings__extra-buttons">
          <Button onClick={logoutHandler} type="button">Logout</Button>
          <Button onClick={() => setShowAbout(true)} type="button">About</Button>
        </div>
      </div >
    </section >
  )
}

export default SettingsPage