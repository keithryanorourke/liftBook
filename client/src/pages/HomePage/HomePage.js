import axios from "axios";
import "./HomePage.scss"
import {useState, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid"
import NewWorkoutModal from "../../components/NewWorkoutModal/NewWorkoutModal";
import RenameWorkoutModal from "../../components/RenameWorkoutModal/RenameWorkoutModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import IndividualWorkout from "../../components/IndividualWorkout/IndividualWorkout";
import add from "../../assets/icons/add_black_24dp.svg";
const {REACT_APP_BACKEND_URL} = process.env

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

  const getWorkouts = useCallback(() => {
    axios.get(`${REACT_APP_BACKEND_URL}/workout`, { headers: 
      {
      Authorization: `Bearer: ${token}`
      } 
    })
    .then(response => {
      response.data.sort((workoutA, workoutB) => workoutB.id - workoutA.id)
      return setUser({workouts: response.data})
    })
    .catch(error => alert(error))
  }, [token])

  useEffect(() => {
    getWorkouts()
  }, [getWorkouts])

  const newWorkoutHandler = (e) => {
    e.preventDefault()
    const workout = {
      name: e.target.name.value || "Freestyle Workout"
    }

    axios.post(`${REACT_APP_BACKEND_URL}/workout`, workout, { headers: 
      {
      Authorization: `Bearer: ${token}`
      } 
    })
    .then(response => navigate(`../workout/${response.data}`, {replace: true}))
    .catch(error => alert(error))
  }

  const renameWorkoutHandler = (e, workout) => {
    e.preventDefault()
    workout.name = e.target.name.value || "Freestyle Workout"
    axios.put(`${REACT_APP_BACKEND_URL}/workout/${workout.id}`, workout, { headers: 
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

  const deleteWorkoutHandler = (id) => {
    axios.delete(`${REACT_APP_BACKEND_URL}/workout/${id}`, { headers: 
    {
    Authorization: `Bearer: ${token}`
    } 
    })
    .then(response => {
      getWorkouts()
      closingAnimationFunction(setDeleteModal)
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
        {!newWorkout ? <button onClick={() => setNewWorkout(true)} className="home__new"><img src={add} alt="Plus sign icon" className="home__add" /></button> : null}
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