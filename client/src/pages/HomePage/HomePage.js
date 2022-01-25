import axios from "axios";
import {useState, useEffect} from "react";
import {NavLink} from "react-router-dom"

const HomePage = ({token}) => {
  const [user, setUser] = useState({
    workouts: null
  })

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



  return (
    <section className="home">
      <h2 className="home__title">Workouts</h2>
      {user.workouts ? user.workouts.map(workout => {
        return (
          <article key={workout.id} className="home__workout">
            <h3 className="home__workoutname">{workout.name}</h3>
          </article>
          )
      }) : 
      <>
      <h3 className="home__null">No workouts tracked!</h3>
      <button className="home__get-started"></button>
      </>
      }
    </section>
  )
}

export default HomePage;