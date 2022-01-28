import "./WorkoutPage.scss"
import EditLiftModal from "../../components/EditLiftModal/EditLiftModal";
import AddLiftModal from "../../components/AddLiftModal/AddLiftModal"
import IndividualLift from "../../components/IndividualLift/IndividualLift"
import add from "../../assets/icons/add_black_24dp.svg";
import axios from "axios"
import React, {useState, useEffect} from "react"
import {NavLink, Navigate, useNavigate} from "react-router-dom"
import {useParams} from "react-router";
import Cookie from 'js-cookie'

const WorkoutPage = ({token}) => {
  const paramaters=useParams();
  const {workoutId} = paramaters
  const [workout, setWorkout] = useState(null)
  const [exercises, setExercises] = useState(null)
  const [lifts, setLifts] = useState([])
  const [addLiftModal, setAddLiftModal] = useState(false)
  const [editLiftModal, setEditLiftModal] = useState(false)
  const [closeModalAnimation, setCloseModalAnimation] = useState(false)
  const [currentLift, setCurrentLift] = useState(null)
  const [userSettings, setUserSettings] = useState(null)

  const getLifts = () => {
    axios.get(`http://localhost:8080/lifts/${workoutId}`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      console.log("lifts here!", response.data)
      setLifts(response.data)
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/account/settings`, { headers: 
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
      Navigate('../login', {replace: true})
    })

    axios.get(`http://localhost:8080/workouts/${workoutId}`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      setWorkout(response.data)
      
    })
    .catch(error => {
      alert(`${error}.\nThe workout you are trying to access is not associated with your account! `)
    })

  axios.get(`http://localhost:8080/exercises/`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      setExercises(response.data)
    })

    getLifts()
  }, [])

  const addLiftHandler = (e) => {
    e.preventDefault()
    let exit = false;
    const exercise = JSON.parse(e.target.exercise.value)
    const newLift = {
      workout_id: workoutId,
      reps: parseInt(e.target.reps.value),
      exercise_id: exercise.id,
      weight: 0,
      measure: e.target.weightMetric.value,
      difficulty: 0,
      percentageOfMax: 0,
      metric: userSettings.preferredMetric
    }

    if (e.target.weight.value > 0 && e.target.weight.value < 500) {
      newLift.weight = parseInt(e.target.weight.value)
    }

    if(userSettings.trackDifficulty && e.target.difficulty.value) {
      newLift.difficulty = parseFloat(e.target.difficulty.value)
    }

    if(!newLift.reps) {
      alert("Please enter a positive whole number into the reps field!")
      exit=true;
    }
    console.log(newLift)

    if(!exit) {
      axios.post(`http://localhost:8080/lifts`, newLift, { headers: 
      {
        Authorization: `Bearer: ${token}`
      } 
    })
    .then(response => {
      console.log(response)
      getLifts()
    })
    .catch (error => {
      console.log(error)
    })
    }
  }

  const editLiftHandler = (e, id) => {
    e.preventDefault()
    let exit = false;
    const exercise = JSON.parse(e.target.exercise.value)
    const newLift = {
      workout_id: workoutId,
      reps: parseInt(e.target.reps.value),
      exercise_id: exercise.id,
      weight: 0,
      measure: e.target.weightMetric.value,
      difficulty: 0,
      percentageOfMax: 0,
      metric: userSettings.preferredMetric,
      id: id
    }

    if (e.target.weight.value > 0 && e.target.weight.value < 500) {
      newLift.weight = parseInt(e.target.weight.value)
    }

    if(userSettings.trackDifficulty && e.target.difficulty.value) {
      newLift.difficulty = parseFloat(e.target.difficulty.value)
    }

    if(!newLift.reps) {
      alert("Please enter a positive whole number into the reps field!")
      exit=true;
    }

    if(!exit) {
      axios.put(`http://localhost:8080/lifts`, newLift, { headers: 
      {
        Authorization: `Bearer: ${token}`
      } 
    })
    .then(response => {
      getLifts()
    })
    .catch (error => {
      alert.log(error)
    })
    }
    setCloseModalAnimation(true)
    setTimeout(() => {
      setEditLiftModal(false)
      setCloseModalAnimation(false)
    }, 1000)
  }

  const handleSetEditLiftModal = (lift) => {
    setCurrentLift(lift)
    setEditLiftModal(true)
  } 

  return (
    <>
      {addLiftModal ? <AddLiftModal 
      settings={userSettings} 
      exercises={exercises} 
      addLiftHandler={addLiftHandler} 
      setAddLiftModal={setAddLiftModal}
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
      <section className="workout">
        {!addLiftModal ? <button onClick={() => setAddLiftModal(true)} className="workout__add-button"><img src={add} alt="" className="workout__add" /></button> : null}
        <div className="workout__top-container">
          <h2 className="workout__title">{workout ? workout.name : "Loading..."}</h2>
        </div>
          {lifts.length ?
          <div className="workout__lifts-container">
            {lifts.map((lift, index) => {
              return(
                <IndividualLift 
                key={lift.id} 
                setNum={index+1}
                lift={lift}
                index={index}
                settings={userSettings}
                setEditLiftModal={handleSetEditLiftModal}
                className="workout__lift" 
                />
              )
            })}
          </div>
          :
          <div className="workout__lifts-container">
            <p className="workout__no-lifts">No lifts tracked yet!</p>
            <button onClick={() => setAddLiftModal(true)} className="workout__first-lift">Track first lift!</button>
          </div>
          }
      </section>
    </>
  )
}

export default WorkoutPage