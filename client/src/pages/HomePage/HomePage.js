import axios from "axios";
import "./HomePage.scss"
import {useState, useEffect} from "react";
import convertDate from "../../functions/dateConversion";
import {NavLink} from "react-router-dom"
import NewWorkoutModal from "../../components/NewWorkoutModal/NewWorkoutModal";
import add from "../../assets/icons/fitness_center_black_24dp.svg";
import deleteIcon from "../../assets/icons/delete_black_24dp.svg"
import edit from "../../assets/icons/edit_black_24dp.svg"
import listIcon from "../../assets/icons/description_black_24dp.svg"

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

  const newWorkoutHandler = (e) => {
    e.preventDefault()
    const workout = {
      name: e.target.name.value || "Freestyle Workout"
    }

    axios.post("http://localhost:8080/workouts", workout, { headers: 
      {
      Authorization: `Bearer: ${token}`
      } 
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  return (
    <>
      {newWorkout ? <NewWorkoutModal handler={newWorkoutHandler} setNewWorkout={setNewWorkout} /> : null}
      <section className="home">
        {!newWorkout ? <button onClick={() => setNewWorkout(true)} className="home__new"><img src={add} alt="" className="home__add" /></button> : null}
        <div className="home__top-container">
          <h2 className="home__title">Workouts</h2>
        </div>
          <div className="home__workouts-container">
          {user.workouts && user.workouts.length ? user.workouts.map((workout, index) => {
            return (
              <article key={workout.id} 
              className={"home__workout " + (index % 2 === 0 ? "home__workout--even " : "")}
              >
                <NavLink to={`/workouts/${workout.id}`} className="home__open-workout">
                  <span className="home__workout-name">{workout.name}</span>
                  <span className="home__workout-date">{convertDate(workout.timestamp)}</span>
                  <span className="home__workout-instruct">Tap here to open workout!</span>
                </NavLink>
                <div className="home__button-container">
                  <button className="home__button"><img src={edit} alt="" className="home__icon" /><div className="home__icon-overlay"></div></button>
                  <button className="home__button"><img src={deleteIcon} alt="" className="home__icon" /><div className="home__icon-overlay"></div></button>
                </div>
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
    </>
  )
}

export default HomePage;