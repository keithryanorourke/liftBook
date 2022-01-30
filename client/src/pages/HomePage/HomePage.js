import axios from "axios";
import "./HomePage.scss"
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid"
import NewWorkoutModal from "../../components/NewWorkoutModal/NewWorkoutModal";
import RenameWorkoutModal from "../../components/RenameWorkoutModal/RenameWorkoutModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import IndividualWorkout from "../../components/IndividualWorkout/IndividualWorkout";
import add from "../../assets/icons/add_black_24dp.svg";
import deleteIcon from "../../assets/icons/delete_black_24dp.svg"
import edit from "../../assets/icons/edit_black_24dp.svg"
import listIcon from "../../assets/icons/post_add_black_24dp.svg"

const HomePage = ({token}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    workouts: null
  })
  const [newWorkout, setNewWorkout] = useState(false)
  const [currentWorkout, setCurrentWorkout] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [renameWorkoutModal, setRenameWorkoutModal] = useState(false)
  const [closeModalAnimation, setCloseModalAnimation] = useState(false)

  const closingAnimationFunction = (modalSetter) => {
    setCloseModalAnimation(true)
    setTimeout(() => {
      modalSetter(false)
      setCloseModalAnimation(false)
    }, 300)
  }

  const getWorkouts = () => {
    axios.get("http://localhost:8080/workouts", { headers: 
      {
      Authorization: `Bearer: ${token}`
      } 
    })
    .then(response => {
      return setUser({workouts: response.data})
    })
    .catch(error => alert(error))
  }

  useEffect(() => {
    getWorkouts()
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
    .then(response => navigate(`../workouts/${response.data}`, {replace: true}))
    .catch(error => console.log(error))
  }

  const deleteWorkoutHandler = (id) => {
    axios.delete(`http://localhost:8080/workouts/${id}`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      getWorkouts()
      closingAnimationFunction(setDeleteModal)
    })
    .catch(error => console.log(error))
  }

  const renameWorkoutHandler = (e, workout) => {
    e.preventDefault()
    workout.name = e.target.name.value
    axios.put(`http://localhost:8080/workouts/${workout.id}`, workout, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      getWorkouts()
      closingAnimationFunction(setRenameWorkoutModal)
    })
    .catch(error => alert(error))

  }

  const handleSetDeleteModal = (workout) => {
    setCurrentWorkout(workout)
    setDeleteModal(true)
  }

  const handleSetRenameModal = (workout) => {
    setCurrentWorkout(workout)
    setRenameWorkoutModal(true)
  }

  return (
    <>
      {newWorkout ? <NewWorkoutModal 
      handler={newWorkoutHandler} 
      setNewWorkout={setNewWorkout} 
      close={closeModalAnimation}
      /> 
      : null}
      {deleteModal ? <DeleteModal 
      setDeleteModal={setDeleteModal}
      close={closeModalAnimation}
      deleteHandler={deleteWorkoutHandler}
      title={currentWorkout.name}
      id={currentWorkout.id}
      />
      : null}
      {renameWorkoutModal ? <RenameWorkoutModal 
      setRenameWorkout={setRenameWorkoutModal}
      handler={renameWorkoutHandler}
      workout={currentWorkout}
      close={closeModalAnimation}
      />
      : null}
      <section className="home">
        {!newWorkout ? <button onClick={() => setNewWorkout(true)} className="home__new"><img src={add} alt="" className="home__add" /></button> : null}
        <div className="home__top-container">
          <h2 className="home__title">Workouts</h2>
        </div>
        <div className="home__scroll-container">
          <div className="home__workouts-container">
          {user.workouts && user.workouts.length ? user.workouts.map((workout, index) => {
            return (
              <IndividualWorkout 
              key={uniqid()}
              workout={workout}
              index={index}
              handleSetDeleteModal={handleSetDeleteModal}
              handleSetRenameModal={handleSetRenameModal}
              />
              )
            }) : 
            <div className="home__null-container">
              <h3 className="home__null">You're all set up!</h3>
              <button onClick={() => setNewWorkout(true)} className="home__get-started">Track your first workout!</button>
            </div>
          }
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage;