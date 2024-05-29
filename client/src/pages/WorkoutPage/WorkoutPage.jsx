import "./WorkoutPage.scss"
import IndividualLift from "../../components/IndividualLift/IndividualLift"
import add from "../../assets/icons/add_black_24dp.svg";
import React, { useState, useEffect, useCallback, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router";
import setLiftModifierColor from "../../functions/setLiftModifierColor";
import { UserSettingsContext } from "../../contexts/UserSettingsContext";
import useConfiguredAxios from "../../hooks/useConfiguredAxios";
import Dialog from "../../components/Dialog/Dialog";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";
import BubbleSelect from "../../components/BubbleSelect/BubbleSelect";
import muscleList from "../../assets/data/muscleList.json"

const LiftForm = ({ onSubmit, onCancel, exercises, lift }) => {
  const settings = useContext(UserSettingsContext);
  const previousLift = JSON.parse(sessionStorage.getItem('previousLift'));
  const getDefaultValue = (key, fallback = "") => {
    if (lift) {
      return lift[key] || fallback;
    } else if (previousLift) {
      return previousLift[key] || fallback;
    }
    return fallback
  }

  return (
    <form onSubmit={onSubmit} className="add-lift__form">
      <label htmlFor="" className="add-lift__label">Exercise:
        <select name="exercise" defaultValue={getDefaultValue("name", "Squat")} id="" className="add-lift__exercise-dropdown">
          {exercises?.map(exercise => {
            return <option key={'exercise-' + exercise.id} value={exercise.name} className="add-lift__exercise-option">{exercise.name}</option>
          })}
        </select>
      </label>
      <label className="add-lift__label">Weight:
        <input type="number" step=".01" name="weight" defaultValue={getDefaultValue("weight")} placeholder="Leave blank for bodyweight" className="add-lift__input" />
      </label>
      <div className="add-lift__radio-container">
        <div className="add-lift__separator">
          <input type="radio" id="lbs" defaultChecked={previousLift ? (previousLift.measure === "lbs") : true} value="lbs" name="weightMetric" className="add-lift__radio" />
          <label htmlFor="lbs" className="add-lift__label add-lift__label--radio">lbs</label>
        </div>
        <div className="add-lift__separator">
          <input type="radio" id="kg" defaultChecked={previousLift ? (previousLift.measure === "kg") : false} value="kg" name="weightMetric" className="add-lift__radio" />
          <label htmlFor="kg" className="add-lift__label add-lift__label--radio">kg</label>
        </div>
      </div>
      <label className="add-lift__label">Reps:
        <input type="number" defaultValue={getDefaultValue("reps")} placeholder="Enter a whole number greater than 0" name="reps" className="add-lift__input" />
      </label>
      {settings?.trackDifficulty && settings?.mode === "advanced" ?
        <label className="add-lift__label">{settings?.preferredMetric} (optional):
          <input type="number" step=".5" defaultValue={getDefaultValue("difficulty")} placeholder={settings?.preferredMetric === "RPE" ? "Number between 1.0-10.0" : "Any non negative number"} name="difficulty" className="add-lift__input" />
        </label>
        : null
      }
      {settings?.trackPercentageOfMax && settings?.mode === "advanced" ?
        <label className="add-lift__label">%of1RM (optional):
          <input type="number" defaultValue={getDefaultValue("percentageOfMax")} name="percentage" step=".5" placeholder="Any number between 1.0 and 100.0" className="add-lift__input" />
        </label>
        : null
      }
      <div className="add-lift__button-container">
        <button className="add-lift__button add-lift__button--submit">Save</button>
        <button onClick={onCancel} className="add-lift__button">Cancel</button>
      </div>
    </form>
  )
}

const AddLiftDialog = ({ visible, onClose, onSubmit, exercises }) => {
  const [selectedMuscles, setSelectedMuscles] = useState([])
  const filteredExercises = selectedMuscles.length ? exercises.filter(exercise => selectedMuscles.some(muscle => exercise.muscle.includes(muscle))) : exercises;

  const toggleMuscle = (muscle) => {
    let newArrayCopy
    if (selectedMuscles.includes(muscle)) {
      let newArray = selectedMuscles.filter(muscleFromArray => muscleFromArray !== muscle)
      setSelectedMuscles(newArray)
    } else {
      newArrayCopy = [...selectedMuscles]
      newArrayCopy.push(muscle)
      setSelectedMuscles(newArrayCopy)
    }
  }

  return (
    <Dialog
      title="Add Lift"
      visible={visible}
      onClose={onClose}
      color="primary"
    >
      <p className="add-lift__subtitle">Filter exercises by muscles:</p>
      <BubbleSelect
        options={muscleList.array}
        onChange={toggleMuscle}
        selectedOptions={selectedMuscles}
      />
      <LiftForm
        exercises={filteredExercises}
        onCancel={onClose}
        onSubmit={onSubmit}
      />
    </Dialog>
  )
}

const WorkoutPage = () => {
  const navigateCallback = useNavigate()
  const navigate = useCallback((path, obj) => navigateCallback(path, obj), [navigateCallback])
  const paramaters = useParams();
  const { workoutId } = paramaters
  const [workout, setWorkout] = useState(null)
  const [exercises, setExercises] = useState(null)
  const [lifts, setLifts] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [currentLift, setCurrentLift] = useState(null)
  const [setNumber, setSetNumber] = useState(null)
  const userSettings = useContext(UserSettingsContext);
  const axios = useConfiguredAxios();

  const getLifts = useCallback(() => {
    axios.get(`/lifts/${workoutId}`)
      .then(response => {
        setLifts(response.data.sort((liftA, liftB) => liftA.id - liftB.id))
      })
      .catch(error => alert(error))
  }, [axios, workoutId])

  useEffect(() => {
    axios.get(`/workout/${workoutId}`)
      .then(response => {
        setWorkout(response.data)
      })
      .catch(error => {
        alert(`${error}.\nThe workout you are trying to access is not associated with your account! You will now be redirected to your home page.`)
        navigate("../", { replace: true })
      })

    axios.get(`/exercises/`)
      .then(response => {
        setExercises(response.data)
      })
      .catch(error => alert(`We could not retrieve the list of exercises from our database! Please try reloading the page and if that does not work, please try to logout and log back in.\n ${error}`))

    getLifts()
  }, [getLifts, navigate, axios, workoutId])

  const findExerciseByName = (name) => {
    return exercises.find(exercise => exercise.name === name)
  }

  const validateLiftForm = (e, exercise, id) => {
    const newLift = {
      workout_id: workoutId,
      reps: parseInt(e.target.reps.value),
      exercise_id: exercise.id,
      weight: 0,
      measure: e.target.weightMetric.value,
      difficulty: 0,
      percentageOfMax: 0,
      metric: userSettings.preferredMetric,
      error: false
    }
    if (id) {
      newLift.id = id
    }
    if (e.target.weight.value > 0 && e.target.weight.value < 2000) {
      newLift.weight = parseInt(e.target.weight.value)
    }
    if (userSettings.trackDifficulty && userSettings.mode === "advanced") {
      if (e.target.difficulty.value) {
        newLift.difficulty = parseFloat(e.target.difficulty.value)
      }
    }
    if (userSettings.trackPercentageOfMax && userSettings.mode === "advanced") {
      if (e.target.percentage.value) {
        newLift.percentageOfMax = parseFloat(e.target.percentage.value)
      }
    }
    if (!newLift.reps || newLift.reps < 0) {
      alert("Please enter a positive whole number into the reps field!")
      newLift.error = true
    }
    return newLift
  }

  const onAddLift = (e) => {
    e.preventDefault()
    const exercise = findExerciseByName(e.target.exercise.value)
    const newLift = validateLiftForm(e, exercise)
    if (!newLift.error) {
      delete newLift.error
      axios.post(`/lifts`, newLift)
        .then(response => {
          newLift.name = exercise.name
          sessionStorage.setItem('previousLift', JSON.stringify(newLift))
          getLifts()
          setShowAdd(false);
        })
        .catch(error => {
          alert(error)
        })
    }
  }

  const onEditLift = (e, id) => {
    e.preventDefault()
    const exercise = findExerciseByName(e.target.exercise.value)
    const newLift = validateLiftForm(e, exercise, id)
    if (!newLift.error) {
      delete newLift.error
      axios.put(`/lifts`, newLift)
        .then(response => {
          getLifts()
          onCloseEdit()
        })
        .catch(error => {
          alert(error)
        })
    }
  }

  const onDeleteLift = (id) => {
    axios.delete(`/lifts/${id}`)
      .then(response => {
        getLifts()
        onCloseDelete()
      })
      .catch(error => alert(error))
  }

  const onClickEdit = (lift) => {
    setCurrentLift(lift)
    setShowEdit(true)
  }

  const onClickDelete = (lift, setNum) => {
    setSetNumber(setNum)
    setCurrentLift(lift)
    setShowDelete(true)
  }

  const onCloseDelete = () => {
    setShowDelete(false);
    setCurrentLift(null);
  }

  const onCloseEdit = () => {
    setShowEdit(false);
    setCurrentLift(false);
  }

  return (
    <>
      <AddLiftDialog
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        onSubmit={onAddLift}
        exercises={exercises}
      />
      <Dialog
        title={`Edit ${currentLift?.name}`}
        visible={showEdit}
        onClose={onCloseEdit}
        color="primary"
      >
        <LiftForm
          exercises={exercises}
          onCancel={onCloseEdit}
          onSubmit={(e) => onEditLift(e, currentLift?.id)}
          lift={currentLift}
        />
      </Dialog>
      <DeleteDialog
        onClose={onCloseDelete}
        visible={showDelete}
        itemName={currentLift?.name + ` (set # ${setNumber}) from ${workout?.name}`}
        onDelete={() => onDeleteLift(currentLift?.id)}
      />
      <section className="workout">
        {!showAdd ? <button onClick={() => setShowAdd(true)} className="workout__add-button"><img src={add} alt="Plus sign icon" className="workout__add" /></button> : null}
        <div className="workout__top-container">
          <h2 className="workout__title">{workout ? workout.name : "Loading..."}</h2>
        </div>
        <div className="workout__scroll-container">
          {lifts.length ?
            <div className="workout__lifts-container">
              {
                userSettings ? lifts.map((lift, index) => {
                  return (
                    <IndividualLift
                      key={lift.id}
                      setNum={index + 1}
                      liftSeparationModifier={setLiftModifierColor(lift, lifts, index, 'name')}
                      lift={lift}
                      index={index}
                      settings={userSettings}
                      onClickEdit={onClickEdit}
                      onClickDelete={onClickDelete}
                      className="workout__lift"
                    />
                  )
                })
                  : <p>Loading...</p>
              }
            </div>
            :
            <div className="workout__null-container">
              <p className="workout__no-lifts">No lifts tracked yet!</p>
              <button onClick={() => setShowAdd(true)} className="workout__first-lift">Track first lift!</button>
            </div>
          }
        </div>
      </section>
    </>
  )
}

export default WorkoutPage