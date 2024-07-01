import "./ExercisesPage.scss"
import { useState, useEffect, useCallback } from "react"
import IndividualExercise from "../../components/IndividualExercise/IndividualExercise"
import useConfiguredAxios from "../../hooks/useConfiguredAxios"
import Dialog from "../../components/Dialog/Dialog"
import BubbleSelect from "../../components/BubbleSelect/BubbleSelect"
import muscleList from "../../assets/data/muscleList.json"
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog"
import TextInput from "../../components/TextInput/TextInput"
import Button from "../../components/Button/Button"
import Form from "../../components/Form/Form"
import { Add } from "@mui/icons-material";
import getErrorMessage from "../../functions/getErrorMessage"

const ExerciseForm = ({ onSubmit, error, exercise, onCancel }) => {
  const [selectedMuscles, setSelectedMuscles] = useState(exercise?.muscle?.split(", ") || []);
  const [name, setName] = useState(exercise?.name || "");
  const [selectedMusclesError, setSelectedMusclesError] = useState(null);
  const [nameError, setNameError] = useState(null);

  const onChangeName = (e) => {
    setName(e.target.value);
    setNameError(null);
  }

  const toggleMuscle = (muscle) => {
    setSelectedMusclesError(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!name) {
      setNameError("Exercise Name is a required field")
      valid = false;
    }
    if (name.length > 25) {
      setNameError("Exercise Name must be 25 characters or less")
      valid = false;
    }
    if (name.match(/[^A-Za-z ]/)) {
      setNameError("Exercise names may not contain any numbers or special characters!")
      valid = false;
    }
    if (selectedMuscles.length === 0) {
      setSelectedMusclesError("Please select at least 1 muscle group")
      valid = false;
    }
    if (valid) {
      onSubmit(name, selectedMuscles);
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      error={error}
      buttons={<>
        <Button onClick={onCancel} type="button">Cancel</Button>
        <Button theme="outlined" color="primary">Submit</Button>
      </>}
    >
      <BubbleSelect
        options={muscleList.array}
        onChange={toggleMuscle}
        selectedOptions={selectedMuscles}
        label="Select all muscles involved in the exercise"
        error={selectedMusclesError}
      />
      <TextInput
        placeholder="Exercise name is required"
        name="name"
        label="Exercise Name"
        value={name}
        onChange={onChangeName}
        error={nameError}
      />
    </Form>
  )
}

const ExercisesPage = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [exercises, setExercises] = useState([])
  const [currentExercise, setCurrentExercise] = useState(false)
  const [formError, setFormError] = useState(null);
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
    return musclesToFormat.join(", ")
  }

  const onAddExercise = (name, muscles) => {
    setFormError(null)
    const newExercise = {
      name,
      muscle: formatMusclesIntoString(muscles)
    }
    axios.post(`/exercises`, newExercise)
      .then(response => {
        getUserExercises()
        setShowAdd(false);
      })
      .catch(err => setFormError(getErrorMessage(err)))
  }

  const onEditExercise = (name, muscles, exercise) => {
    setFormError(null)
    const newExercise = {
      ...exercise,
      name,
      muscle: formatMusclesIntoString(muscles)
    }
    axios.put(`/exercises`, newExercise)
      .then(response => {
        getUserExercises()
        onCloseEdit()
      })
      .catch(err => setFormError(getErrorMessage(err)))
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

  const afterClose = () => {
    setCurrentExercise(false)
    setFormError(null)
  }

  const onCloseAdd = () => {
    setShowAdd(false);
    afterClose();
  }

  const onCloseDelete = () => {
    setShowDelete(false);
    afterClose()
  }

  const onCloseEdit = () => {
    setShowEdit(false);
    afterClose()
  }

  return (
    <section className="page">
      <Dialog
        visible={showAdd}
        onClose={onCloseAdd}
        title="New Exercise"
        color="primary"
      >
        <ExerciseForm
          onCancel={onCloseAdd}
          onSubmit={onAddExercise}
          error={formError}
        />
      </Dialog>
      <Dialog
        visible={showEdit}
        onClose={onCloseEdit}
        title={`Edit ${currentExercise?.name}`}
        color="primary"
      >
        <ExerciseForm
          onCancel={onCloseEdit}
          onSubmit={(name, muscles) => onEditExercise(name, muscles, currentExercise)}
          error={formError}
          exercise={currentExercise}
        />
      </Dialog>
      <DeleteDialog
        visible={showDelete}
        onDelete={() => onDeleteExercise(currentExercise?.id)}
        onClose={onCloseDelete}
        itemName={currentExercise?.name}
        error={formError}
      />
      <button onClick={() => setShowAdd(true)} className="add-button"><Add sx={{ color: "white" }} /></button>
      <header className="page__header">
        <h2>Exercises</h2>
      </header>
      <div className="page__scroll-wrapper">
        {exercises.length ?
          <div className="page__content page__content--no-pad page__flex">
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
          <div className="page__content">
            <p>Not finding the exercise you want in our list? You can add any exercise you want to our database! Each exercise you add is only accessible to you, so it's like you're getting your own personalized exercise database!</p>
            <Button onClick={() => setShowAdd(true)} type="button">Add first exercise!</Button>
          </div>
        }
      </div>
    </section>
  )
}

export default ExercisesPage