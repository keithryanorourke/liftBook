import "./WorkoutPage.scss"
import axios from "axios"
import React, {useState, useEffect} from "react"
import {NavLink, Navigate} from "react-router-dom"
import {useParams} from "react-router";

const WorkoutPage = ({token}) => {
  const location=useParams();
  const {workoutId} = location
  const [workout, setWorkout] = useState(null)
  const [lifts, setLifts] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8080/workouts/${workoutId}`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      console.log(response.data)
      setWorkout(response.data)
    })
    .catch(error => {
      alert(`${error}.\nThe workout you are trying to access is not associated with your account! `)
    })
  }, [])

  console.log(location)
  return (
    <section className="workout">
      <div className="workout__top-container">
        <h2>{workout ? workout.name : "Loading..."}</h2>
      </div>
    </section>
  )
}

export default WorkoutPage