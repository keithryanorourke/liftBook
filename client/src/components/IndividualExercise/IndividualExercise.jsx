import "./IndividualExercise.scss"
import uniqid from "uniqid"
import { NavLink } from "react-router-dom"
import ItemActions from "../ItemActions/ItemActions"

// TODO: Refactor to always accept onClick functions and base their rendering on whether exercise is default or not internally as opposed to externally.
const IndividualExercise = ({ exercise, index, onClickEdit, onClickDelete }) => {

  const muscleList = exercise.muscle.split(",")
  const mappedList = muscleList.map((exercise, index) => {
    return exercise.replaceAll(" ", "")
  })

  const exerciseColor = (muscle) => {
    if (muscle === "Triceps" || muscle === "Chest" || muscle === "Shoulders") {
      return "exercise__muscle--push"
    }
    if (muscle === "Back" || muscle === "Biceps") {
      return "exercise__muscle--pull"
    }
    if (muscle === "Quadriceps" || muscle === "Hamstrings" || muscle === "Calves" || muscle === "Glutes") {
      return "exercise__muscle--legs"
    }
  }

  return (
    <article className={"exercise " + ((index + 1) % 2 === 0 ? "exercise--even" : "")}>
      <NavLink to={`/exercise/${exercise.id}`} className="exercise__container">
        <h4 className="exercise__title">{exercise.name}{onClickEdit ? null : ' (default)'}</h4>
        <div className="exercise__muscle-container">
          {mappedList.map(muscle => {
            if (muscle) {
              return (
                <div key={uniqid()} className="exercise__muscle-separator">
                  <p className={"exercise__muscle " + exerciseColor(muscle)}>{muscle}</p>
                </div>
              )
            }
            return null
          })}
        </div>
      </NavLink>
      <ItemActions
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
        item={exercise}
      />
    </article>
  )
}

export default IndividualExercise