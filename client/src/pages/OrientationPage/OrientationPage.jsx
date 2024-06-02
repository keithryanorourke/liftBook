import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./OrientationPage.scss"
import useConfiguredAxios from '../../hooks/useConfiguredAxios'
import Button from '../../components/Button/Button'
import AboutDialog from '../../components/AboutDialog/AboutDialog'
import back from "../../assets/icons/arrow_back_black_24dp.svg"
import Checkbox from '../../components/Checkbox/Checkbox'
import FieldSet from '../../components/FieldSet/FieldSet'
import RadioButton from '../../components/RadioButton/RadioButton'
import Form from '../../components/Form/Form'

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
      <section>
        <div>
          <div>
            <button onClick={() => setAdvanced(false)}><img src={back} alt="Arrow icon pointing left" /></button>
            <h2>Advanced Mode</h2>
          </div>
          <Form onSubmit={handleSubmit}
            buttons={<Button>Continue</Button>}
            error={error}
          >
            <FieldSet label="Select enabled metrics:">
              <div>
                <div>
                  <Checkbox
                    label="Difficulty"
                    value="difficulty"
                    name="difficulty"
                    onChange={() => setTrackDifficulty(prev => !prev)}
                    checked={trackDifficulty}
                    info="Tracking the difficulty of your sets is a good way to ensure that you are neither overworking or underworking your body throughout your workouts. It can also help you to identify potential reasons for a plateau. For example, if the first set you perform on every movement is very difficult, then it is likely to tire you out and affect your recovery."
                  />
                </div>
                <div>
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
            {trackDifficulty &&
              <div>
                <FieldSet label="Preferred difficulty metric:">
                  <div>
                    <div>
                      <RadioButton
                        label="RPE"
                        name="preferredMetric"
                        value="RPE"
                        checked={preferredMetric === "RPE"}
                        onChange={(e) => setPreferredMetric(e.target.value)}
                        info={"RPE stands for \"rate of perceived exersion\" and is a rough measure of how close you got to failure when performing a set. It is measured on a scale of 1 to 10, where 1 means you were 9 reps away from failure and 10 means you reached failure. Each number in between represents one rep closer to failure. For example, an RPE 7 would mean you were 3 reps away from failure. Some trainees like to track halfway inbetween values, such as value 7.5. This allows for more flexibility and accuracy, but is not neccessary."}
                      />
                    </div>
                    <div>
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