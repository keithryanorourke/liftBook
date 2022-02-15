import "./SingleExercisePage.scss"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
const {REACT_APP_BACKEND_URL} = process.env


const SingleExercisePage = ({token, userSettings}) => {
  const params = useParams()
  const {exerciseId} = params
  const [exercise, setExercise] = useState({})
  const [lifts, setLifts] = useState([])

  useEffect(() => {
    axios.get(`${REACT_APP_BACKEND_URL}/exercises/single/${exerciseId}`, { headers: 
      {
      Authorization: `Bearer: ${token}`
      } 
    })
    .then(response => {
      console.log(response.data)
      setExercise(response.data)})
    .catch(error=> alert(error))
    axios.get(`${REACT_APP_BACKEND_URL}/lifts/byExercise/${exerciseId}`, { headers: 
      {
      Authorization: `Bearer: ${token}`
      } 
    })
    .then(response => setLifts(response.data))
    .catch(error=> alert(error))
  }, [])

  return (
    <section className="single-exercise">
      <div className="single-exercise__top-container">
        <h2 className="single-exercise__title">{exercise ? exercise.name : 'Loading...'}</h2>
      </div>
      <div className="single-exercise__scroll-container">
        
      </div>
    </section>
  )
}

export default SingleExercisePage;