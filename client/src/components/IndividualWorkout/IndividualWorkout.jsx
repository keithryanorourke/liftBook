import "./IndividualWorkout.scss"
import convertDate from "../../functions/dateConversion";
import {NavLink} from "react-router-dom"
import ItemActions from "../ItemActions/ItemActions";

const IndividualWorkout = ({workout, index, onClickDelete, onClickEdit}) => {
  return (
    <article key={workout.id} 
    className={"individual-workout " + (index % 2 === 0 ? "individual-workout--even " : "")}
    >
      <NavLink to={`/workout/${workout.id}`} className="individual-workout__open-workout">
        <span className="individual-workout__name">{workout.name}</span>
        <span className="individual-workout__date">{convertDate(workout.timestamp)}</span>
      </NavLink>
      <ItemActions
        onClickEdit={onClickEdit}
        href={`/workout/${workout.id}`}
        onClickDelete={onClickDelete}
        item={workout}
      />
    </article>
  )
}

export default IndividualWorkout