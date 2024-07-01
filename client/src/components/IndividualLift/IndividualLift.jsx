import "./IndividualLift.scss"
import { useContext } from "react"
import { UserSettingsContext } from "../../contexts/UserSettingsContext"
import ItemActions from "../ItemActions/ItemActions"

const IndividualLift = ({ lift, liftSeparationModifier, setNum, onClickEdit, onClickDelete, date, showDate }) => {
  const settings = useContext(UserSettingsContext);

  const showDifficulty = () => {
    if (lift.metric === "RPE") {
      if (!lift.difficulty) {
        return "untracked"
      }
      return lift.difficulty.toString() + " RPE"
    }
    return lift.difficulty.toString() + " RIR"
  }

  const showPercentage = () => {
    if (lift.percentageOfMax) {
      return lift.percentageOfMax.toString() + "%"
    }
    return "untracked"
  }

  return (
    <article className={"lift " + liftSeparationModifier + (date ? " lift--by-exercise" : "")}>
      {showDate || !date ? <p className={`lift__${date ? 'date' : 'title'}`}>{date || lift.name}</p> : <div className="lift__placeholder"></div>}
      <div className="lift__container">
        {setNum ? <span className="lift__set-number">{`set ${setNum}`}</span> : null}
        <div className="lift__stat-container">
          <span className="lift__specifier">WEIGHT:</span>
          <span className="lift__stat">{lift.weight ? `${lift.weight}${lift.measure}` : 'bodyweight'}</span>
        </div>
        <div className="lift__stat-container">
          <span className="lift__specifier">REPS:</span>
          <span className="lift__stat">{lift.reps}</span>
        </div>
        {settings.trackDifficulty && settings.mode === "advanced"
          ?
          <div className="lift__stat-container">
            <span className="lift__specifier">DIFFICULTY:</span>
            <span className="lift__stat">{showDifficulty()}</span>
          </div>
          :
          null}
        {Boolean(settings.trackPercentageOfMax) && settings.mode === "advanced"
          ?
          <div className="lift__stat-container">
            <span className="lift__specifier">%of1RM:</span>
            <span className="lift__stat">{showPercentage()}</span>
          </div>
          :
          null}
      </div>
      {date && <div className="lift__placeholder"></div>}
      <ItemActions
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
        item={lift}
      />
    </article>
  )
}

export default IndividualLift;