import "./ExercisesPage.scss"
import axios from "axios"
import { useState, useEffect } from "react"
import add from "../../assets/icons/add_black_24dp.svg"
import AddExerciseModal from "../../components/AddExerciseModal/AddExerciseModal"
import IndividualExercise from "../../components/IndividualExercise/IndividualExercise"
import DeleteModal from "../../components/DeleteModal/DeleteModal"

const ExercisesPage = ({token}) => {

  const [addExerciseModal, setAddExerciseModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [closeModalAnimation, setCloseModalAnimation] = useState(false)
  const [exercises, setExercises] = useState([])
  const [currentExercise, setCurrentExercise] = useState(false)

  const getUserExercises = () => {
    axios.get(`http://localhost:8080/exercises/user`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => setExercises(response.data))
    .catch(error => alert(error))
  }

  useEffect(() => {
    getUserExercises()
  }, [])

  const addHandler = (e, muscles) => {
    e.preventDefault()
    const formattedMuscles = muscles.map((muscle, index) => {
      if(index !== muscles.length-1) {
        return muscle + ", "
      }
      return muscle
    }).join('')
    if(!formattedMuscles.length) {
      return alert("Please select at least one muscle before submitting a new exercise!")
    }
    if(!e.target.name.value || e.target.name.value.length > 25) {
      return alert("Make sure to give your exercise a name less than 25 characters long!")
    }
    if(e.target.name.value.match(/[^A-Za-z ]/)) {
      return alert("Exercise names may not contain any numbers or special characters!")
    }
    const newExercise = {name: e.target.name.value, muscle: formattedMuscles}
    axios.post(`http://localhost:8080/exercises`, newExercise, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      getUserExercises()
      closingAnimationFunction(setAddExerciseModal)
    })
    .catch(error => alert(error + `\nYou may have entered a duplicate exercise name. Try using a different name than ${newExercise.name}!`))
  }




  const deleteExerciseHandler = (id) => {
    axios.delete(`http://localhost:8080/exercises/${id}`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      getUserExercises()
      closingAnimationFunction(setDeleteModal)
    })
    .catch(error => alert(error))
  } 

  const handleSetDeleteModal = (exercise) => {
    setCurrentExercise(exercise)
    setDeleteModal(true)
  }

  const handleSetEditModal = (exercise) => {
    setCurrentExercise(exercise)
    setEditModal(true)
  }

  const closingAnimationFunction = (modalSetter) => {
    setCloseModalAnimation(true)
    setTimeout(() => {
      modalSetter(false)
      setCloseModalAnimation(false)
    }, 300)
  }

  return (
    <>
    {addExerciseModal ? <AddExerciseModal 
    setAddExerciseModal={setAddExerciseModal}
    addExerciseHandler={addHandler}
    close={closeModalAnimation}
    />
    : null}
    {deleteModal ? <DeleteModal 
    setDeleteModal={setDeleteModal}
    close={closeModalAnimation}
    deleteHandler={deleteExerciseHandler}
    title={currentExercise.name + " from your exercises?"}
    id={currentExercise.id}
    /> 
    : null}
    <section className="exercises">
      <button onClick={() => setAddExerciseModal(true)} className="exercises__add-button"><img src={add} alt="Plus sign icon" className="exercises__add" /></button>
      <div className="exercises__top-container">
        <h2 className="exercises__title">Exercises</h2>
      </div>
      {exercises.length ?
      exercises.map((exercise, index) => {
        return <IndividualExercise 
        key={exercise.id}
        exercise={exercise}
        index={index}
        setDeleteModal={handleSetDeleteModal}
        setEditModal={handleSetEditModal}
        />
      })
      :
        <div className="exercises__bottom-container">
        <p className="exercises__copy">Not finding the exercise you want in our list? You can add any exercise you want to our database! Each exercise you add is only accessible to you, so it's like you're getting your own personalized exercise database!</p>
        <button onClick={() => setAddExerciseModal(true)} className="exercises__button">Add first exercise!</button>
      </div>
      }
    </section>
    </>
  )
}

export default ExercisesPage