import "./WorkoutPage.scss"
import IndividualLift from "../../components/IndividualLift/IndividualLift"
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
import Form from "../../components/Form/Form";
import NumberInput from "../../components/NumberInput/NumberInput";
import FieldSet from "../../components/FieldSet/FieldSet";
import RadioButton from "../../components/RadioButton/RadioButton";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import { Add } from "@mui/icons-material";

const LiftForm = ({ onSubmit, onCancel, exercises, lift, error }) => {
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
  const [exercise, setExercise] = useState(getDefaultValue("name", exercises[0].name));
  const [weight, setWeight] = useState(getDefaultValue("weight"));
  const [measure, setMeasure] = useState(getDefaultValue("measure", "lbs"));
  const [reps, setReps] = useState(getDefaultValue("reps"));
  const [difficulty, setDifficulty] = useState(getDefaultValue("difficulty"));
  const [percentageOfMax, setPercentageOfMax] = useState("percentageOfMax");
  const [repsError, setRepsError] = useState(null);
  const [difficultyError, setDifficultyError] = useState(null);
  const [percentageOfMaxError, setPercentageOfMaxError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (reps === null) {
      setRepsError("Reps is required")
      valid = false;
    } else if (reps <= 0) {
      setRepsError("Reps must be greater than 0")
      valid = false;
    }
    if (settings?.trackDifficulty) {
      if (settings.preferredMetric === "RPE") {
        if (difficulty > 10) {
          setDifficultyError("RPE can not be greater than 10")
          valid = false;
        }
      }
      if (difficulty < 0) {
        setDifficulty(`${settings.preferredMetric} can not be a negative number`)
        valid = false;
      }
    }

    if (settings?.trackPercentageOfMax) {
      if (percentageOfMax < 100) {
        setPercentageOfMaxError("Percentage of max can not be greater than 100");
        valid = false;
      } else if (percentageOfMax < 0) {
        setPercentageOfMaxError("Percentage of max can not be a negative number");
        valid = false;
      }
    }

    if (!valid) {
      return;
    }

    onSubmit(exercises.find(item => item.name === exercise), weight, measure, reps, difficulty, percentageOfMax, lift?.id)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      error={error}
      buttons={<>
        <Button onClick={onCancel} type="button">Cancel</Button>
        <Button theme="outlined" color="primary">Save</Button>
      </>}
    >
      <Select
        label="Exercise"
        name="exercise"
        options={exercises.map(exercise => exercise.name)}
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
      />
      <NumberInput
        type="number"
        label="Weight"
        name="weight"
        step="0.5"
        placeholder="Leave blank for bodyweight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <FieldSet
        label="Unit:"
      >
        <div className="basic-flex">
          <RadioButton
            name="measuremenet"
            label="lbs"
            value="lbs"
            checked={measure === "lbs"}
            onChange={(e) => setMeasure(e.target.value)}
          />
          <RadioButton
            name="measuremenet"
            label="kg"
            value="kg"
            checked={measure === "kg"}
            onChange={(e) => setMeasure(e.target.value)}
          />
        </div>
      </FieldSet>
      <NumberInput
        value={reps}
        name="reps"
        label="Reps"
        placeholder="Enter a whole number greater than 0"
        onChange={(e) => setReps(e.target.value)}
        error={repsError}
      />
      {Boolean(settings?.trackDifficulty && settings?.mode === "advanced") &&
        <NumberInput
          label={`${settings?.preferredMetric} (optional)`}
          name="difficulty"
          value={difficulty}
          placeholder={settings?.preferredMetric === "RPE" ? "Number between 1.0-10.0" : "Any non negative number"}
          onChange={(e) => setDifficulty(e.target.value)}
          step=".5"
          error={difficultyError}
        />
      }
      {Boolean(settings?.trackPercentageOfMax && settings?.mode === "advanced") &&
        <NumberInput
          label="%of1RM (optional)"
          name="percentageOfMax"
          value={percentageOfMax}
          placeholder="Any number between 1.0 and 100.0"
          onChange={(e) => setPercentageOfMax(e.target.value)}
          step=".25"
          error={percentageOfMaxError}
        />
      }
    </Form>
  )
}

const LiftDialog = ({ visible, onClose, onSubmit, exercises, lift, title, error }) => {
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
      title={title}
      visible={visible}
      onClose={onClose}
      color="primary"
    >
      <div className="workout__wrapper">
        <BubbleSelect
          options={muscleList.array}
          onChange={toggleMuscle}
          selectedOptions={selectedMuscles}
          label="Filter exercises by muscles:"
        />
      </div>
      <LiftForm
        exercises={filteredExercises}
        onCancel={onClose}
        onSubmit={onSubmit}
        lift={lift}
        error={error}
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
  const [formError, setFormError] = useState(null)
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

  const onAddLift = (exercise, weight, measure, reps, difficulty, percentageOfMax) => {
    console.log(exercise);
    const newLift = {
      workout_id: workoutId,
      exercise_id: exercise.id,
      weight: parseInt(weight),
      metric: measure,
      reps: parseInt(reps),
      difficulty: parseFloat(difficulty) || 0,
      percentageOfMax: parseFloat(percentageOfMax) || 0
    }
    axios.post(`/lifts`, newLift)
      .then(response => {
        newLift.name = exercise.name
        sessionStorage.setItem('previousLift', JSON.stringify(newLift))
        getLifts()
        setShowAdd(false);
      })
      .catch(error => {
        setFormError("Server error encountered")
      })
  }


  const onEditLift = (exercise, weight, measure, reps, difficulty, percentageOfMax, id) => {
    const newLift = {
      workout_id: workoutId,
      exercise_id: exercise.id,
      weight: parseInt(weight),
      metric: measure,
      reps: parseInt(reps),
      difficulty: parseFloat(difficulty) || 0,
      percentageOfMax: parseFloat(percentageOfMax) || 0,
      id
    }
    axios.put(`/lifts`, newLift)
      .then(response => {
        getLifts()
        onCloseEdit()
      })
      .catch(error => {
        setFormError("Server error encountered")
      })
  }

  const onDeleteLift = (id) => {
    axios.delete(`/lifts/${id}`)
      .then(response => {
        getLifts()
        onCloseDelete()
      })
      .catch(error => setFormError("Server error encountered"))
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

  const onClose = () => {
    setCurrentLift(null);
    setFormError(null);
  }

  const onCloseAdd = () => {
    setShowAdd(false);
    onClose();
  }

  const onCloseDelete = () => {
    setShowDelete(false);
    onClose();
  }

  const onCloseEdit = () => {
    setShowEdit(false);
    onClose();
  }

  return (
    <>
      <LiftDialog
        title="Add Exercise"
        visible={showAdd}
        onClose={onCloseAdd}
        onSubmit={onAddLift}
        exercises={exercises}
        error={formError}
      />
      <LiftDialog
        title={`Edit ${currentLift?.name}`}
        visible={showEdit}
        onClose={onCloseEdit}
        onSubmit={onEditLift}
        exercises={exercises}
        lift={currentLift}
        error={formError}
      />
      <DeleteDialog
        onClose={onCloseDelete}
        visible={showDelete}
        itemName={currentLift?.name + ` (set # ${setNumber}) from ${workout?.name}`}
        onDelete={() => onDeleteLift(currentLift?.id)}
        error={formError}
      />
      <section className="page">
        {!showAdd && <button onClick={() => setShowAdd(true)} className="add-button"><Add sx={{ color: "white" }} /></button>}
        <header className="page__header">
          <h2 className="workout__title">{workout ? workout.name : "Loading..."}</h2>
        </header>
        {lifts.length ?
          <div className="page__scroll-wrapper">
            <div className="page__content page__content--no-pad page__flex">
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
          </div>
          :
          <div className="page__content center-text">
            <Button onClick={() => setShowAdd(true)}>Track first lift!</Button>
          </div>
        }
      </section>
    </>
  )
}

export default WorkoutPage