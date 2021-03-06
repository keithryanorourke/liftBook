import "./IndividualExercise.scss"
import deleteIcon from "../../assets/icons/delete_black_24dp.svg"
import edit from "../../assets/icons/edit_black_24dp.svg"
import uniqid from "uniqid"
import { NavLink } from "react-router-dom"


const IndividualExercise = ({exercise, index, setEditModal, setDeleteModal}) => {
  
  const muscleList=exercise.muscle.split(",")
  const mappedList = muscleList.map((exercise, index) => {
    return exercise.replaceAll(" ", "")
  })

  const exerciseColor = (muscle) => {
    if(muscle === "Triceps" || muscle === "Chest" || muscle === "Shoulders") {
      return "exercise__muscle--push"
    }
    if(muscle === "Back" || muscle === "Biceps") {
      return "exercise__muscle--pull"
    }
    if(muscle === "Quadriceps" || muscle === "Hamstrings" || muscle === "Calves" || muscle === "Glutes") {
      return "exercise__muscle--legs"
    }
  }

  return (
    <article className={"exercise " + ((index+1) % 2 === 0 ? "exercise--even" : "")}>
      <NavLink to={`/exercise/${exercise.id}`} className="exercise__container">
        <h4 className="exercise__title">{exercise.name}{setEditModal ? null : ' (default)'}</h4>
        <div className="exercise__muscle-container">
          {mappedList.map(muscle => {
            if(muscle) {
              return (
                <div key={uniqid()} className="exercise__muscle-separator">
                <p  className={"exercise__muscle " + exerciseColor(muscle)}>{muscle}</p>
              </div>
              )
            }
            return null
            })}
        </div>
      </NavLink>
      {setEditModal && setDeleteModal ? <div className="exercise__button-container">
        <button onClick={() => setEditModal(exercise)} className="exercise__button"><img src={edit} alt="Pencil Icon" className="exercise__icon" /></button>
        <button onClick={() => setDeleteModal(exercise)} className="exercise__button"><img src={deleteIcon} alt="Waste bin Icon" className="exercise__icon" /></button>
      </div> : null}
    </article>
    )
}

export default IndividualExercise