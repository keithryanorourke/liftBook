import "./ExercisesPage.scss"
import axios from "axios"
import { useState, useEffect } from "react"
import add from "../../assets/icons/add_black_24dp.svg"
import AddExerciseModal from "../../components/AddExerciseModal/AddExerciseModal"

const ExercisesPage = ({token}) => {

  const [addExerciseModal, setAddExerciseModal] = useState(false)
  const [closeModalAnimation, setCloseModalAnimation] = useState(false)
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8080/exercises/user`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      console.log(response.data)
      setExercises(response.data)
    })
    .catch(error => alert(error))
  }, [])

  const addHandler = (e) => {
    console.log(e)
  }

  return (
    <>
    {addExerciseModal ? <AddExerciseModal 
    setAddExerciseModal={setAddExerciseModal}
    addExerciseHandler={addHandler}
    close={closeModalAnimation}
    />
    : null}
    <section className="exercises">
      <button onClick={() => setAddExerciseModal(true)} className="exercises__add-button"><img src={add} alt="Plus sign icon" className="exercises__add" /></button>
      <div className="exercises__top-container">
        <h2 className="exercises__title">Exercises</h2>
      </div>
      <div className="exercises__bottom-container">
        <p className="exercises__copy">Not finding the exercise you want in our list? You can add any exercise you want to our database! Each exercise you add is only accessible to you, so it's like you're getting your own personalized exercise database!</p>
        <button onClick={() => setAddExerciseModal(true)} className="exercises__button">Add first exercise!</button>
      </div>
    </section>
    </>
  )
}

export default ExercisesPage