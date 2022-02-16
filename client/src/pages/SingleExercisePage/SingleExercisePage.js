import "./SingleExercisePage.scss"
import back from "../../assets/icons/arrow_back_black_24dp.svg"
import IndividualLift from "../../components/IndividualLift/IndividualLift"
import { useEffect, useState } from "react"
import { useParams, NavLink } from "react-router-dom"
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
    .then(response => {
      const sortedLifts = response.data.sort((liftA, liftB) => liftB.id - liftA.id)
      setLifts(sortedLifts)
    })
    .catch(error=> alert(error))
  }, [])

  return (
    <section className="single-exercise">
      <div className="single-exercise__top-container">
        <NavLink to="/exercises" className="single-exercise__link"><img src={back} alt="Arrow pointing left" className="single-exercise__icon" /></NavLink>
        <h2 className="single-exercise__title">{exercise ? exercise.name : 'Loading...'}</h2>
        <div className="single-exercise__empty"></div>
      </div>
      <div className="single-exercise__scroll-container">
        <div className="single-exercise__lifts-container">
        {userSettings ? lifts.map((lift, index) => {
          const showDate = (index === 0 ? true :  lift.timestamp !== lifts[index-1].timestamp ? true : false)
          return(
            <IndividualLift 
            key={lift.id} 
            liftSeparationModifier={setLiftModifierColor(lift, lifts, index, 'timestamp')}
            lift={lift}
            index={index}
            settings={userSettings}
            date={convertDate(lift.timestamp)}
            showDate={showDate}
            className="single-exercise__lift" 
            />
            )
          })
          : <p>Loading...</p>
        }
        {!lifts.length ? <p className="single-exercise__copy">It looks like you haven't tracked {exercise.name} yet!</p> : null}
        </div>
      </div>
    </section>
  )
}

export default SingleExercisePage;