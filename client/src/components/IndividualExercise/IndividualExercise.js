import "./IndividualExercise.scss"
import deleteIcon from "../../assets/icons/delete_black_24dp.svg"
import edit from "../../assets/icons/edit_black_24dp.svg"
import uniqid from "uniqid"


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
      <div className="exercise__container">
        <h4 className="exercise__title">{exercise.name}</h4>
        <div className="exercise__muscle-container">
          {mappedList.map(muscle => {
            return (
              <div key={uniqid()} className="exercise__muscle-separator">
                <p  className={"exercise__muscle " + exerciseColor(muscle)}>{muscle}</p>
              </div>
              )
            })}
        </div>
      </div>
      <div className="exercise__button-container">
        {setEditModal ? <button onClick={() => setEditModal(exercise)} className="exercise__button"><img src={edit} alt="Pencil Icon" className="exercise__icon" /></button> : null}
        {setDeleteModal ? <button onClick={() => setDeleteModal(exercise)} className="exercise__button"><img src={deleteIcon} alt="Waste bin Icon" className="exercise__icon" /></button> : null}
      </div>
    </article>
    )
}

export default IndividualExercise