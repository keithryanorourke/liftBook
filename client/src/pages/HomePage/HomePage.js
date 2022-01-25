import axios from "axios";
import "./HomePage.scss"
import {useState, useEffect} from "react";
import {NavLink} from "react-router-dom"
import NewWorkoutModal from "../../components/NewWorkoutModal/NewWorkoutModal";

const HomePage = ({token}) => {
  const [user, setUser] = useState({
    workouts: null
  })
  const [newWorkout, setNewWorkout] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:8080/workouts", { headers: 
      {
      Authorization: `Bearer: ${token}`
      } 
    })
    .then(response => {
      console.log(response)
      return setUser({workouts: response.data})
    })
    .catch(error => console.log(error))
  }, [])

  const newWorkoutHandler = () => {

  }

  console.log(user.workouts)

  if (newWorkout) {
    return (
      <NewWorkoutModal handler={newWorkoutHandler} setNewWorkout={setNewWorkout} />
    )
  }

  return (
    <section className="home">
      <div className="home__top-container">
        <h2 className="home__title">Workouts</h2>
      </div>
      <div className="home__container">
      {user.workouts && user.workouts.length ? user.workouts.map(workout => {
        return (
          <article key={workout.id} className="home__workout">
            <span className="home__workout-name">{workout.name}</span>
            <span className="home__workout-date">{workout.timestamp}</span>
          </article>
          )
        }) : 
        <>
          <h3 className="home__null">You're all set up!</h3>
          <button onClick={() => setNewWorkout(true)} className="home__get-started">Track your first workout!</button>
        </>
      }
      </div>
    </section>
  )
}

export default HomePage;