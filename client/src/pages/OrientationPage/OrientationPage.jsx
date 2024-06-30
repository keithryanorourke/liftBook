import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./OrientationPage.scss"
import useConfiguredAxios from '../../hooks/useConfiguredAxios'
import Button from '../../components/Button/Button'
import AboutDialog from '../../components/AboutDialog/AboutDialog'
import Form from '../../components/Form/Form'
import { ArrowBack } from '@mui/icons-material'
import AdvancedOptions from '../../components/AdvancedOptions/AdvancedOptions'

const AdvancedOrientation = ({ onSubmit, setAdvanced, error }) => {
  const [showAbout, setShowAbout] = useState(false)
  const [trackDifficulty, setTrackDifficulty] = useState(false)
  const [trackPercentage, setTrackPercentage] = useState(false)
  const [preferredMetric, setPreferredMetric] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(trackDifficulty, trackPercentage, preferredMetric);
  }

  return (
    <>
      <AboutDialog
        visible={showAbout}
        onClose={() => setShowAbout(false)}
      />
      <section className="page page--fill">
        <header className="page__header flex-between">
          <button className="icon-button" onClick={() => setAdvanced(false)}><ArrowBack sx={{ color: "white" }} /></button>
          <h2>Advanced Mode</h2>
        </header>
        <div className="page__content">
          <Form onSubmit={handleSubmit}
            buttons={<Button>Continue</Button>}
            error={error}
          >
            <AdvancedOptions
              trackDifficulty={trackDifficulty}
              trackPercentage={trackPercentage}
              preferredMetric={preferredMetric}
              onChangeDifficulty={setTrackDifficulty}
              onChangePercentage={setTrackPercentage}
              onChangeMetric={setPreferredMetric}
            />
          </Form>
        </div>

      </section>
    </>
  )
}

const OrientationPage = () => {
  const [advanced, setAdvanced] = useState(false)
  const navigate = useNavigate()
  const axios = useConfiguredAxios();

  const onClickBasic = () => {
    const settings = {
      mode: "basic",
      trackDifficulty: false,
      preferredMetric: "RPE",
      trackPercentageOfMax: false
    }
    axios.put(`/account/settings`, settings)
      .then(response => navigate("../", { replace: true }))
      .catch(error => alert(error))
  }

  const onSubmitAdvanced = (trackDifficulty, trackPercentage, preferredMetric) => {
    const settings = {
      mode: "advanced",
      trackDifficulty,
      trackPercentageOfMax: trackPercentage,
      preferredMetric: preferredMetric || "RPE"
    }
    axios.put(`/account/settings`, settings)
      .then(response => navigate("../", { replace: true }))
      .catch(error => alert(error))
  }

  if (advanced) {
    return (<AdvancedOrientation
      onSubmit={onSubmitAdvanced}
      setAdvanced={setAdvanced}
    />)
  }

  return (
    <section className="orientation">
      <div className="orientation__top-container">
        <h2 className="orientation__title">Welcome to liftBook!</h2>
      </div>
      <p className="orientation__copy">Before you get started, please select a tracking mode:</p>
      <div className="orientation__container">
        <div className='orientation__mode orientation__mode--basic'>
          <Button onClick={onClickBasic} type="button">Basic</Button>
          <li className="orientation__mode-copy">Just track weights and reps!</li>
        </div>
        <div className="orientation__mode orientation__mode--advanced">
          <Button onClick={() => setAdvanced(true)} type="button">Advanced</Button>
          <li className="orientation__mode-copy">Track advanced metrics like RPE and %of1RM!</li>
          <li className="orientation__mode-copy">Customize what metrics you do and don't want to track!</li>
        </div>
        <p className="orientation__disclaimer">You can change your tracking mode and settings at any time!</p>
      </div>
    </section>
  )
}

export default OrientationPage