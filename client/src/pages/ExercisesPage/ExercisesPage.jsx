import "./ExercisesPage.scss"
import { useState, useEffect, useCallback } from "react"
import add from "../../assets/icons/add_black_24dp.svg"
import IndividualExercise from "../../components/IndividualExercise/IndividualExercise"
import useConfiguredAxios from "../../hooks/useConfiguredAxios"
import Dialog from "../../components/Dialog/Dialog"
import BubbleSelect from "../../components/BubbleSelect/BubbleSelect"
import muscleList from "../../assets/data/muscleList.json"
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog"

const AddExerciseDialog = ({ visible, onClose, onSubmit }) => {
  const [selectedMuscles, setSelectedMuscles] = useState([]);

  const toggleMuscle = (muscle) => {
    if (selectedMuscles.includes(muscle)) {
      let newArray = [...selectedMuscles]
      const indexToRemove = newArray.indexOf(muscle)
      newArray.splice(indexToRemove, 1)
      setSelectedMuscles(newArray)
    } else {
      let newArray = [...selectedMuscles]
      newArray.push(muscle)
      setSelectedMuscles(newArray)
    }
  }

  return (
    <Dialog
      visible={visible}
      onClose={onClose}
      title="New Exercise"
      color="primary"
    >
      <p className="add-exercise__copy">Select all muscles involved in exercise:</p>
      <BubbleSelect
        options={muscleList.array}
        onChange={toggleMuscle}
        selectedOptions={selectedMuscles}
      />
      <form onSubmit={(e) => onSubmit(e, selectedMuscles)} className="add-exercise__form">
        <label htmlFor="" className="add-exercise__label">Exercise Name:
          <input type="text" placeholder="Exercise name is required" className="add-exercise__name" name="name" />
        </label>
        <div className="add-exercise__button-container">
          <button className="add-exercise__button add-exercise__button--submit">Submit</button>
          <button onClick={onClose} className="add-exercise__button">Cancel</button>
        </div>
      </form>
    </Dialog>
  )
}

const EditExerciseDialog = ({ visible, onClose, onSubmit, exercise }) => {
  const [selectedMuscles, setSelectedMuscles] = useState(exercise.muscle);

  const toggleMuscle = (muscle) => {
    if (selectedMuscles.includes(muscle)) {
      let newArray = [...selectedMuscles]
      const indexToRemove = newArray.indexOf(muscle)
      newArray.splice(indexToRemove, 1)
      setSelectedMuscles(newArray)
    } else {
      let newArray = [...selectedMuscles]
      newArray.push(muscle)
      setSelectedMuscles(newArray)
    }
  }

  return (
    <Dialog
      visible={visible}
      onClose={onClose}
      title={`Edit ${exercise.name}`}
      color="primary"
    >
      <p className="edit-exercise__copy">Select all muscles involved in exercise:</p>
      <BubbleSelect
        options={muscleList.array}
        onChange={toggleMuscle}
        selectedOptions={selectedMuscles}
      />
      <form onSubmit={(e) => onSubmit(e, exercise, selectedMuscles)} className="edit-exercise__form">
        <label htmlFor="" className="edit-exercise__label">Exercise Name:
          <input type="text" defaultValue={exercise.name} placeholder="Exercise name is required" className="edit-exercise__name" name="name" />
        </label>
        <div className="edit-exercise__button-container">
          <button className="edit-exercise__button edit-exercise__button--submit">Submit</button>
          <button onClick={onClose} className="edit-exercise__button">Cancel</button>
        </div>
      </form>
    </Dialog >
  )
}

const ExercisesPage = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [exercises, setExercises] = useState([])
  const [currentExercise, setCurrentExercise] = useState(false)
  const axios = useConfiguredAxios()

  const getUserExercises = useCallback(() => {
    if (axios) {
      axios.get(`/exercises`)
        .then(response => {
          const sortedExercises = response.data.sort((exerciseA, exerciseB) => exerciseB.id - exerciseA.id)
          setExercises(sortedExercises)
        })
        .catch(error => alert(error))
    }
  }, [axios])

  useEffect(() => {
    getUserExercises()
  }, [getUserExercises])

  const formatMusclesIntoString = (musclesToFormat) => {
    return musclesToFormat.map((muscle, index) => {
      if (index !== musclesToFormat.length - 1) {
        return muscle + ", "
      }
      return muscle
    }).join('')
  }

  const validateExerciseForm = (e, muscles, exercise) => {
    let newExercise = {}
    if (exercise) {
      newExercise = { ...exercise }
    }

    newExercise.muscle = formatMusclesIntoString(muscles)
    newExercise.name = e.target.name.value

    if (!newExercise.muscle.length) {
      alert("Please select at least one muscle before submitting a new exercise!")
      return { error: true }
    }
    if (!newExercise.name || newExercise.name.length > 25) {
      alert("Make sure to give your exercise a name less than 25 characters long!")
      return { error: true }
    }
    if (newExercise.name.match(/[^A-Za-z ]/)) {
      alert("Exercise names may not contain any numbers or special characters!")
      return { error: true }
    }
    return newExercise
  }

  const onAddExercise = (e, muscles) => {
    e.preventDefault()
    const newExercise = validateExerciseForm(e, muscles)
    if (!newExercise.error) {
      axios.post(`/exercises`, newExercise)
        .then(response => {
          getUserExercises()
          setShowAdd(false);
        })
        .catch(error => alert(error + `\nYou may have entered a duplicate exercise name. Try using a different name than ${newExercise.name}!`))
    }
  }

  const onEditExercise = (e, exercise, muscles) => {
    e.preventDefault()
    const newExercise = validateExerciseForm(e, muscles, exercise)
    if (!newExercise.error) {
      axios.put(`/exercises`, newExercise)
        .then(response => {
          getUserExercises()
          onCloseEdit()
        })
        .catch(error => alert(error + `\nYou may have entered a duplicate exercise name. Try using a different name than ${newExercise.name}!`))
    }
  }

  const onDeleteExercise = (id) => {
    axios.delete(`/exercises/${id}`)
      .then(response => {
        getUserExercises()
        onCloseDelete()
      })
      .catch(error => alert(error))
  }

  const onClickDelete = (exercise) => {
    setCurrentExercise(exercise)
    setShowDelete(true)
  }

  const onClickEdit = (exercise) => {
    setCurrentExercise(exercise)
    setShowEdit(true)
  }

  const onCloseDelete = () => {
    setShowDelete(false);
    setCurrentExercise(false);
  }

  const onCloseEdit = () => {
    setShowEdit(false);
    setCurrentExercise(false);
  }

  return (
    <>
      <AddExerciseDialog
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        onSubmit={onAddExercise}
      />
      <EditExerciseDialog
        visible={showEdit}
        onClose={onCloseEdit}
        onSubmit={onEditExercise}
        exercise={currentExercise}
      />
      <DeleteDialog
        visible={showDelete}
        onDelete={() => onDeleteExercise(currentExercise?.id)}
        onClose={onCloseDelete}
        itemName={currentExercise?.name}
      />
      <section className="exercises">
        <button onClick={() => setShowAdd(true)} className="exercises__add-button"><img src={add} alt="Plus sign icon" className="exercises__add" /></button>
        <div className="exercises__top-container">
          <h2 className="exercises__title">Exercises</h2>
        </div>
        <div className="exercises__scroll-container">
          {exercises.length ?
            <div className="exercises__bottom-container">
              {exercises.map((exercise, index) => {
                return <IndividualExercise
                  key={'exercise-' + exercise.id}
                  exercise={exercise}
                  index={index}
                  onClickDelete={exercise.user_id ? onClickDelete : null}
                  onClickEdit={exercise.user_id ? onClickEdit : null}
                />
              })}
            </div>
            :
            <div className="exercises__bottom-container">
              <div className="exercises__default-container">
                <p className="exercises__copy">Not finding the exercise you want in our list? You can add any exercise you want to our database! Each exercise you add is only accessible to you, so it's like you're getting your own personalized exercise database!</p>
                <button onClick={() => setShowAdd(true)} className="exercises__button">Add first exercise!</button>
              </div>
            </div>
          }
        </div>
      </section>
    </>
  )
}

export default ExercisesPage