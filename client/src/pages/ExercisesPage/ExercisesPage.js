import "./ExercisesPage.scss"
import axios from "axios"
import { useState, useEffect, useCallback } from "react"
import add from "../../assets/icons/add_black_24dp.svg"
import AddExerciseModal from "../../components/AddExerciseModal/AddExerciseModal"
import IndividualExercise from "../../components/IndividualExercise/IndividualExercise"
import DeleteModal from "../../components/DeleteModal/DeleteModal"
import EditExerciseModal from "../../components/EditExerciseModal/EditExerciseModal"

const ExercisesPage = ({token}) => {

  const [addExerciseModal, setAddExerciseModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [closeModalAnimation, setCloseModalAnimation] = useState(false)
  const [exercises, setExercises] = useState([])
  const [currentExercise, setCurrentExercise] = useState(false)

  const getUserExercises = useCallback(() => {
    axios.get(`http://localhost:8080/exercises/user`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      const sortedExercises = response.data.sort((exerciseA, exerciseB) => exerciseB.id - exerciseA.id)
      setExercises(sortedExercises)
    })
    .catch(error => alert(error))
  }, [token])

  useEffect(() => {
    getUserExercises()
  }, [getUserExercises])

  const formatMusclesIntoString = (musclesToFormat) => {
    return musclesToFormat.map((muscle, index) => {
      if(index !== musclesToFormat.length-1) {
        return muscle + ", "
      }
      return muscle
    }).join('')
  }

  const validateExerciseForm = (e, muscles, exercise) => {
    let newExercise = {}
    if (exercise) {
      newExercise = {...exercise}
    }

    newExercise.muscle = formatMusclesIntoString(muscles)
    newExercise.name = e.target.name.value

    if(!newExercise.muscle.length) {
      alert("Please select at least one muscle before submitting a new exercise!")
      return {error: true}
    }
    if(!newExercise.name || newExercise.name.length > 25) {
      alert("Make sure to give your exercise a name less than 25 characters long!")
      return {error: true}
    }
    if(newExercise.name.match(/[^A-Za-z ]/)) {
      alert("Exercise names may not contain any numbers or special characters!")
      return {error: true}
    }
    return newExercise
  }

  const addHandler = (e, muscles) => {
    e.preventDefault()
    const newExercise = validateExerciseForm(e, muscles)
    if(!newExercise.error) {
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
  }

  const editExerciseHandler = (e, exercise, muscles) => {
    e.preventDefault()
    const newExercise = validateExerciseForm(e, muscles, exercise)
    if(!newExercise.error) {
      axios.put(`http://localhost:8080/exercises/`, newExercise, { headers: 
      {
        Authorization: `Bearer: ${token}`
      } 
    })
    .then(response => {
      getUserExercises()
      closingAnimationFunction(setEditModal)
    })
    .catch(error => alert(error + `\nYou may have entered a duplicate exercise name. Try using a different name than ${newExercise.name}!`))
    }
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
    {editModal ? <EditExerciseModal 
    setEditExerciseModal={setEditModal}
    editExerciseHandler={editExerciseHandler}
    close={closeModalAnimation}
    exercise={currentExercise}
    /> 
    : null}
    {deleteModal ? <DeleteModal 
    setDeleteModal={setDeleteModal}
    close={closeModalAnimation}
    deleteHandler={deleteExerciseHandler}
    title={currentExercise.name + " from your exercises"}
    id={currentExercise.id}
    /> 
    : null}
    <section className="exercises">
      <button onClick={() => setAddExerciseModal(true)} className="exercises__add-button"><img src={add} alt="Plus sign icon" className="exercises__add" /></button>
      <div className="exercises__top-container">
        <h2 className="exercises__title">Exercises</h2>
      </div>
      <div className="exercises__scroll-container">
        {exercises.length ?
        <div className="exercises__bottom-container">
        {exercises.map((exercise, index) => {
          return <IndividualExercise 
          key={exercise.id}
          exercise={exercise}
          index={index}
          setDeleteModal={handleSetDeleteModal}
          setEditModal={handleSetEditModal}
          />
        })}
        </div>
        :
            <div className="exercises__bottom-container">
              <div className="exercises__default-container">
                <p className="exercises__copy">Not finding the exercise you want in our list? You can add any exercise you want to our database! Each exercise you add is only accessible to you, so it's like you're getting your own personalized exercise database!</p>
                <button onClick={() => setAddExerciseModal(true)} className="exercises__button">Add first exercise!</button>
              </div>
            </div>
        }
      </div>
    </section>
    </>
  )
}

export default ExercisesPage