import "./SingleExercisePage.scss"
import back from "../../assets/icons/arrow_back_black_24dp.svg"
import IndividualLift from "../../components/IndividualLift/IndividualLift"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import setLiftModifierColor from "../../functions/setLiftModifierColor"
import convertDate from "../../functions/dateConversion"
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
    .then(response => setExercise(response.data))
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
        <div className="single-exercise__lifts-container">
        {userSettings ? lifts.map((lift, index) => {
          const date=convertDate(lift.timestamp)
          return(
            <IndividualLift 
            key={lift.id} 
            liftSeparationModifier={setLiftModifierColor(lift, lifts, index, 'timestamp')}
            lift={lift}
            index={index}
            settings={userSettings}
            date={date}
            className="single-exercise__lift" 
            />
            )
          })
          : <p>Loading...</p>
        }
        </div>
      </div>
    </section>
  )
}

export default SingleExercisePage;