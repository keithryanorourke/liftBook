import "./SingleExercisePage.scss"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
const {REACT_APP_BACKEND_URL} = process.env


const SingleExercisePage = ({token}) => {
  const params = useParams()
  const {exerciseId} = params

  useEffect(() => {
    axios.get(`${REACT_APP_BACKEND_URL}/lifts/byExercise/${exerciseId}`, { headers: 
      {
      Authorization: `Bearer: ${token}`
      } 
    })
    .then(response => console.log(response))
    .catch(error=> console.log(error))
  }, [])

  return (
    <section className="single-exercise">
      <h2 className="single-exercise__title">{exerciseId}</h2>
    </section>
  )
}

export default SingleExercisePage;