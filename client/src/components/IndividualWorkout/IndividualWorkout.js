import "./IndividualWorkout.scss"
import convertDate from "../../functions/dateConversion";
import {NavLink} from "react-router-dom"
import deleteIcon from "../../assets/icons/delete_black_24dp.svg"
import edit from "../../assets/icons/edit_black_24dp.svg"
import listIcon from "../../assets/icons/post_add_black_24dp.svg"

const IndividualWorkout = ({workout, index, handleSetDeleteModal, handleSetRenameModal}) => {
  return (
    <article key={workout.id} 
    className={"individual-workout " + (index % 2 === 0 ? "individual-workout--even " : "")}
    >
      <NavLink to={`/workouts/${workout.id}`} className="individual-workout__open-workout">
        <span className="individual-workout__name">{workout.name}</span>
        <span className="individual-workout__date">{convertDate(workout.timestamp)}</span>
      </NavLink>
      <div className="individual-workout__button-container">
        <button onClick={() => handleSetRenameModal(workout)} className="individual-workout__button"><img src={edit} alt="Pencil icon" className="individual-workout__icon" /></button>
        <NavLink to={`/workouts/${workout.id}`} className="individual-workout__button">
          <img src={listIcon} alt="Paper document icon" className="individual-workout__icon" />
        </NavLink>
        <button onClick={() => handleSetDeleteModal(workout)} className="individual-workout__button"><img src={deleteIcon} alt="Trash bin icon" className="individual-workout__icon" /></button>
      </div>
    </article>
  )
}

export default IndividualWorkout