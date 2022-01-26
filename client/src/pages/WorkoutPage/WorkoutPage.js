import "./WorkoutPage.scss"
import LiftModal from "../../components/LiftModal/LiftModal"
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
  const [openLiftModal, setOpenLiftModal] = useState(false)
  const [userSettings, setUserSettings] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:8080/workouts/${workoutId}`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      setWorkout(response.data)
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
      axios.get(`http://localhost:8080/exercises/`, { headers: 
      {
      Authorization: `Bearer: ${token}`
      } 
      })
      .then(response => {
        console.log(response.data)
        setExercises(response.data)
      })
    })
    .catch(error => {
      alert(`${error}.\nThe workout you are trying to access is not associated with your account! `)
    })
  }, [])

  const addLiftHandler = (e) => {

  }

  return (
    <>
      {openLiftModal ? <LiftModal 
      settings={userSettings} 
      exercises={exercises} 
      addLiftHandler={addLiftHandler} 
      setOpenLiftModal={setOpenLiftModal}
      /> 
      : null}
      <section className="workout">
        <div className="workout__top-container">
          <h2>{workout ? workout.name : "Loading..."}</h2>
        </div>
          {lifts.length ?
        <div className="workout__lifts-container">
          {lifts.map(lift => {
            return(
              <article className="workout__lift">

              </article>
            )
          })}
        </div>
          :
          <div className="workout__lifts-container">
            <p className="workout__no-lifts">No lifts tracked yet!</p>
            <button onClick={() => setOpenLiftModal(true)} className="workout__first-lift">Track first lift!</button>
          </div>
          }
      </section>
    </>
  )
}

export default WorkoutPage