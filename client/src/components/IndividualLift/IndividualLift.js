import "./IndividualLift.scss"
import deleteIcon from "../../assets/icons/delete_black_24dp.svg"
import edit from "../../assets/icons/edit_black_24dp.svg"

const IndividualLift = ({lift, settings, index, setNum, setEditLiftModal, setDeleteModal}) => {

  const showDifficulty = () => {
    if (lift.metric === "RPE") {
      if(!lift.difficulty) {
        return "untracked"
      }
      return lift.difficulty.toString() + " RPE"
    }
    return lift.difficulty.toString() +" RIR"
  }

  const showPercentage = () => {
    if (lift.percentageOfMax) {
      return lift.percentageOfMax.toString() + "%"
    }
    return "untracked"
  }

  return (
    <article className={"lift " + (index % 2 === 0 ? "lift--even" : null)}>
      <h4 className="lift__title">{lift.name}</h4>
      <div className="lift__container">
        <span className="lift__set-number">{`set ${setNum}`}</span>
        <div className="lift__stat-container">
          <span className="lift__specifier">WEIGHT:</span>
          <span className="lift__stat">{lift.weight ? `${lift.weight}${lift.measure}` : 'bodyweight'}</span>
        </div>
        <div className="lift__stat-container">
          <span className="lift__specifier">REPS:</span>
          <span className="lift__stat">{lift.reps}</span>
        </div>
        {settings.trackDifficulty && settings.mode==="advanced"
        ? 
        <div className="lift__stat-container">
          <span className="lift__specifier">DIFFICULTY:</span>
          <span className="lift__stat">{showDifficulty()}</span>
        </div>
        :
        null}
        {settings.trackPercentageOfMax && settings.mode==="advanced"
        ?
        <div className="lift__stat-container">
          <span className="lift__specifier">%of1RM:</span>
          <span className="lift__stat">{showPercentage()}</span>
        </div>
        :
        null}
      </div>
      <div className="lift__button-container">
        <button className="lift__button" onClick={() => setEditLiftModal(lift)}><img src={edit} alt="Pencil Icon" className="lift__edit-icon" /></button>
        <button className="lift__button" onClick={() => setDeleteModal(lift, setNum)}><img src={deleteIcon} alt="Trash bin Icon" className="lift__delete-icon" /></button>
      </div>
    </article>
    )
}

export default IndividualLift;