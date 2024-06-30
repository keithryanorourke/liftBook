import Checkbox from "../Checkbox/Checkbox"
import FieldSet from "../FieldSet/FieldSet"
import RadioButton from "../RadioButton/RadioButton"
import "./AdvancedOptions.scss"

const AdvancedOptions = ({ mode, setMode, showAdvancedMetrics = true, trackDifficulty, trackPercentage, preferredMetric, onChangeDifficulty, onChangePercentage, onChangeMetric }) => {

    return (
        <>
            {mode && setMode && <FieldSet
                label="Mode:"
            >
                <div className="advanced__flex-row">
                    <div className="advanced__flex-item">
                        <RadioButton
                            label="Basic"
                            value="basic"
                            name="mode"
                            onChange={(e) => setMode(e.target.value)}
                            checked={mode === 'basic'}
                            info="Basic mode allows you to only worry about tracking the name of the exercise you're performing, and the amount of weight you used and reps you performed! This mode is preferrable if you'd rather not have a crowded screen and just want to get your lifts tracked!"
                        />
                    </div>
                    <div className="advanced__flex-item">
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
            </FieldSet>}
            {showAdvancedMetrics && <div className="advanced__container">
                <div className="advanced__enabled-container">
                    <FieldSet label="Select enabled metrics:">
                        <div className="advanced__flex-row">
                            <div className="advanced__flex-item">
                                <Checkbox
                                    label="Difficulty"
                                    value="difficulty"
                                    name="difficulty"
                                    onChange={() => onChangeDifficulty(prev => !prev)}
                                    checked={trackDifficulty}
                                    info="Tracking the difficulty of your sets is a good way to ensure that you are neither overworking or underworking your body throughout your workouts. It can also help you to identify potential reasons for a plateau. For example, if the first set you perform on every movement is very difficult, then it is likely to tire you out and affect your recovery."
                                />
                            </div>
                            <div className="advanced__flex-item">
                                <Checkbox
                                    label="Percentage"
                                    name="percentage"
                                    value="percentage"
                                    onChange={() => onChangePercentage(prev => !prev)}
                                    checked={trackPercentage}
                                    info={"%of1RM is a shorthand for \" Percentage of your one rep max\" and is a measure of the percentage of the weight you are using on a given movement relative to the absolute maximum amount of weight that you could use on said movement for a single rep. This metric is often used to help determine what weight to use on any given movement in many popular intermediate and advanced strength training programs"}
                                />
                            </div>
                        </div>
                    </FieldSet>
                </div>
                {trackDifficulty &&
                    <div className="advanced__preferance-container">
                        <FieldSet label="Preferred difficulty metric:">
                            <div className="advanced__flex-row">
                                <div className="advanced__flex-item">
                                    <RadioButton
                                        label="RPE"
                                        name="preferredMetric"
                                        value="RPE"
                                        checked={preferredMetric === "RPE"}
                                        onChange={(e) => onChangeMetric(e.target.value)}
                                        info={"RPE stands for \"rate of perceived exersion\" and is a rough measure of how close you got to failure when performing a set. It is measured on a scale of 1 to 10, where 1 means you were 9 reps away from failure and 10 means you reached failure. Each number in between represents one rep closer to failure. For example, an RPE 7 would mean you were 3 reps away from failure. Some trainees like to track halfway inbetween values, such as value 7.5. This allows for more flexibility and accuracy, but is not neccessary."}
                                    />
                                </div>
                                <div className="advanced__flex-item">
                                    <RadioButton
                                        label="RIR"
                                        name="preferredMetric"
                                        value="RIR"
                                        checked={preferredMetric === "RIR"}
                                        onChange={(e) => onChangeMetric(e.target.value)}
                                        info={"RIR stands for \"reps in reserve\" and is a rough measure of how many more reps you could have potentially gotten after you finished a set. For example, if you performed a set of 8 but felt like you COULD have performed another 3 reps, you would have an RIR of 3."}
                                    />
                                </div>
                            </div>
                        </FieldSet>
                    </div>}
            </div>}
        </>
    )
}

export default AdvancedOptions;