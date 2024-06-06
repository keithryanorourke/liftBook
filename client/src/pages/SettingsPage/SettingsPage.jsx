import "./SettingsPage.scss"
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useConfiguredAxios from "../../hooks/useConfiguredAxios"
import { UserSettingsContext } from "../../contexts/UserSettingsContext"
import { UserSettingsSetterContext } from "../../contexts/UserSettingsSetterContext"
import AboutDialog from "../../components/AboutDialog/AboutDialog"
import RadioButton from "../../components/RadioButton/RadioButton"
import Form from "../../components/Form/Form"
import { useLocalStorage } from "usehooks-ts"
import Button from "../../components/Button/Button"
import FieldSet from "../../components/FieldSet/FieldSet"
import AdvancedOptions from "../../components/AdvancedOptions/AdvancedOptions"

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
      <section className="page">
        <header className="page__header">
          <h2 className="settings__title">Settings</h2>
        </header>
      </section>
    )
  }

  return (
    <section className="page page--fill">
      <AboutDialog
        visible={showAbout}
        onClose={() => setShowAbout(false)}
      />
      <header className="page__header">
        <h2>Settings</h2>
      </header>
      <div className="page__scroll-wrapper">

        <div className="page__content">
          <Form
            onSubmit={submitHandler}
            error={formError}
            buttons={<Button theme="outlined" color="secondary">Save</Button>}
          >
            <AdvancedOptions
              mode={mode}
              setMode={setMode}
              showAdvancedMetrics={mode === "advanced"}
              trackDifficulty={trackDifficulty}
              trackPercentage={trackPercentage}
              preferredMetric={preferredMetric}
              onChangeDifficulty={setTrackDifficulty}
              onChangePercentage={setTrackPercentage}
              onChangeMetric={setPreferredMetric}
            />
          </Form>
          <div className="settings__extra-buttons flex-between">
            <Button onClick={logoutHandler} type="button">Logout</Button>
            <Button onClick={() => setShowAbout(true)} type="button">About</Button>
          </div>
        </div>
      </div >
    </section >
  )
}

export default SettingsPage