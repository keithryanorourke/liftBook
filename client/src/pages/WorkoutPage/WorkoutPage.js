import "./WorkoutPage.scss"
import EditLiftModal from "../../components/EditLiftModal/EditLiftModal";
import AddLiftModal from "../../components/AddLiftModal/AddLiftModal"
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import IndividualLift from "../../components/IndividualLift/IndividualLift"
import add from "../../assets/icons/add_black_24dp.svg";
import axios from "axios"
import React, {useState, useEffect, useCallback} from "react"
import {useNavigate} from "react-router-dom"
import {useParams} from "react-router";
import Cookie from 'js-cookie'
import setLiftModifierColor from "../../functions/setLiftModifierColor";
const {REACT_APP_BACKEND_URL} = process.env

const WorkoutPage = ({token}) => {
  const navigateCallback = useNavigate()
  const navigate = useCallback((path, obj) => navigateCallback(path, obj), [navigateCallback])
  const paramaters = useParams();
  const {workoutId} = paramaters
  const [workout, setWorkout] = useState(null)
  const [exercises, setExercises] = useState(null)
  const [lifts, setLifts] = useState([])
  const [userSettings, setUserSettings] = useState(null)
  const [addLiftModal, setAddLiftModal] = useState(false)
  const [editLiftModal, setEditLiftModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [closeModalAnimation, setCloseModalAnimation] = useState(false)
  const [currentLift, setCurrentLift] = useState(null)
  const [setNumber, setSetNumber] = useState(null)

  // This is a variable that needs larger scope. State does not need to know the value of this variable.
  let liftSeparationCounter = 0;

  const closingAnimationFunction = (modalSetter) => {
    setCloseModalAnimation(true)
    setTimeout(() => {
      modalSetter(false)
      setCloseModalAnimation(false)
    }, 300)
  }

  const getLifts = useCallback(() => {
    axios.get(`${REACT_APP_BACKEND_URL}/lifts/${workoutId}`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      setLifts(response.data.sort((liftA, liftB) => liftA.id - liftB.id))
    })
    .catch(error => alert(error))
  }, [token, workoutId])

  useEffect(() => {
    axios.get(`${REACT_APP_BACKEND_URL}/account/settings`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      setUserSettings(response.data)
    })
    .catch(error =>{
      alert(`${error}.\nUser settings not retrieved! You will now be logged out.`)
      Cookie.remove('token')
      navigate('../login', {replace: true})
    })

    axios.get(`${REACT_APP_BACKEND_URL}/workout/${workoutId}`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      setWorkout(response.data)
    })
    .catch(error => {
      alert(`${error}.\nThe workout you are trying to access is not associated with your account! You will now be redirected to your home page.`)
      navigate("../", {replace: true})
    })

    axios.get(`${REACT_APP_BACKEND_URL}/exercises/`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      setExercises(response.data)
    })
    .catch(error => alert(`We could not retrieve the list of exercises from our database! Please try reloading the page and if that does not work, please try to logout and log back in.\n ${error}`))

    getLifts()
  }, [getLifts, navigate, token, workoutId])

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
    if(id) {
      newLift.id = id
    }
    if (e.target.weight.value > 0 && e.target.weight.value < 2000) {
      newLift.weight = parseInt(e.target.weight.value)
    }
    if(userSettings.trackDifficulty && userSettings.mode==="advanced") {
      if(e.target.difficulty.value) {
        newLift.difficulty = parseFloat(e.target.difficulty.value)
      }
    }
    if(userSettings.trackPercentageOfMax && userSettings.mode==="advanced") {
      if(e.target.percentage.value) {
        newLift.percentageOfMax = parseFloat(e.target.percentage.value)
      }
    }
    if(!newLift.reps || newLift.reps < 0) {
      alert("Please enter a positive whole number into the reps field!")
      newLift.error = true
    }
    return newLift
  }

  const addLiftHandler = (e) => {
    e.preventDefault()
    const exercise = findExerciseByName(e.target.exercise.value)
    const newLift = validateLiftForm(e, exercise)
    if(!newLift.error) {
      delete newLift.error
      axios.post(`${REACT_APP_BACKEND_URL}/lifts`, newLift, { headers: 
      {
        Authorization: `Bearer: ${token}`
      } 
    })
    .then(response => {
      newLift.name = exercise.name
      sessionStorage.setItem('previousLift', JSON.stringify(newLift))
      getLifts()
      closingAnimationFunction(setAddLiftModal)
    })
    .catch (error => {
      alert(error)
    })
    }
  }

  const editLiftHandler = (e, id) => {
    e.preventDefault()
    const exercise = findExerciseByName(e.target.exercise.value)
    const newLift = validateLiftForm(e, exercise, id)
    if(!newLift.error) {
      delete newLift.error
      axios.put(`${REACT_APP_BACKEND_URL}/lifts`, newLift, { headers: 
      {
        Authorization: `Bearer: ${token}`
      } 
    })
    .then(response => {
      getLifts()
      closingAnimationFunction(setEditLiftModal)
    })
    .catch (error => {
      alert(error)
    })
    }
  }

  const deleteLiftHandler = (id) => {
    axios.delete(`${REACT_APP_BACKEND_URL}/lifts/${id}`, { headers: 
    {
      Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      getLifts()
      closingAnimationFunction(setDeleteModal)
    })
    .catch(error => alert(error))
  }

  const handleSetEditLiftModal = (lift) => {
    setCurrentLift(lift)
    setEditLiftModal(true)
  } 

  const handleSetDeleteModal = (lift, setNum) => {
    setSetNumber(setNum)
    setCurrentLift(lift)
    setDeleteModal(true)
  }

  return (
    <>
      {addLiftModal ? <AddLiftModal 
      settings={userSettings} 
      exercises={exercises} 
      addLiftHandler={addLiftHandler} 
      setAddLiftModal={setAddLiftModal}
      close={closeModalAnimation}
      previousLift={JSON.parse(sessionStorage.getItem('previousLift'))}
      /> 
      : null}
      {editLiftModal ? <EditLiftModal 
      settings={userSettings} 
      lift={currentLift}
      exercises={exercises} 
      editLiftHandler={editLiftHandler} 
      setEditLiftModal={setEditLiftModal}
      close={closeModalAnimation}
      /> 
      : null}
      {deleteModal ? 
      <DeleteModal
      setDeleteModal={setDeleteModal}
      close={closeModalAnimation}
      deleteHandler={deleteLiftHandler}
      title={currentLift.name + ` (set # ${setNumber}) from ${workout.name}`}
      id={currentLift.id}
      />
      : null}
      <section className="workout">
        {!addLiftModal ? <button onClick={() => setAddLiftModal(true)} className="workout__add-button"><img src={add} alt="Plus sign icon" className="workout__add" /></button> : null}
        <div className="workout__top-container">
          <h2 className="workout__title">{workout ? workout.name : "Loading..."}</h2>
        </div>
        <div className="workout__scroll-container">
          {lifts.length ?
          <div className="workout__lifts-container">
            {
            userSettings ? lifts.map((lift, index) => {
              return(
                <IndividualLift 
                key={lift.id} 
                setNum={index+1}
                liftSeparationModifier={setLiftModifierColor(lift, lifts, index, 'name')}
                lift={lift}
                index={index}
                settings={userSettings}
                setEditLiftModal={handleSetEditLiftModal}
                setDeleteModal={handleSetDeleteModal}
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
            <button onClick={() => setAddLiftModal(true)} className="workout__first-lift">Track first lift!</button>
          </div>
          }
          </div>
      </section>
    </>
  )
}

export default WorkoutPage