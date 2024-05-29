import "./HomePage.scss"
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import IndividualWorkout from "../../components/IndividualWorkout/IndividualWorkout";
import add from "../../assets/icons/add_black_24dp.svg";
import useConfiguredAxios from "../../hooks/useConfiguredAxios";
import Dialog from "../../components/Dialog/Dialog";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";

const HomePage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    workouts: null
  })
  const [showNewWorkout, setShowNewWorkout] = useState(false)
  const [currentWorkout, setCurrentWorkout] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const axios = useConfiguredAxios();

  const getWorkouts = useCallback(() => {
    axios.get(`/workout`)
      .then(response => {
        response.data.sort((workoutA, workoutB) => workoutB.id - workoutA.id)
        return setUser({ workouts: response.data })
      })
      .catch(error => alert(error))
  }, [axios])

  useEffect(() => {
    getWorkouts()
  }, [getWorkouts])

  const addWorkoutHandler = (e) => {
    e.preventDefault()
    const workout = {
      name: e.target.name.value || "Freestyle Workout"
    }

    axios.post(`/workout`, workout)
      .then(response => navigate(`../workout/${response.data}`, { replace: true }))
      .catch(error => alert(error))
  }

  const onRenameWorkout = (e, workout) => {
    e.preventDefault()
    workout.name = e.target.name.value || "Freestyle Workout"
    axios.put(`/workout/${workout.id}`, workout)
      .then(response => {
        getWorkouts()
        onCloseEdit()
      })
      .catch(error => alert(error))
  }

  const onDeleteWorkout = (id) => {
    axios.delete(`/workout/${id}`)
      .then(response => {
        getWorkouts()
        onCloseDelete()
      })
      .catch(error => alert(error))
  }

  const onClickDelete = (workout) => {
    setCurrentWorkout(workout)
    setShowDeleteModal(true)
  }

  const onClickEdit = (workout) => {
    setCurrentWorkout(workout)
    setShowEdit(true)
  }

  const onCloseDelete = () => {
    setShowDeleteModal(false);
    setCurrentWorkout(null);
  }

  const onCloseEdit = () => {
    setShowEdit(false);
    setCurrentWorkout(null);
  }

  return (
    <>
      <Dialog
        title="New Workout"
        visible={showNewWorkout}
        onClose={() => setShowNewWorkout(false)}
        color="primary"
      >
        <form onSubmit={addWorkoutHandler} className="new-workout__form">
          <label htmlFor="" className="new-workout__label">Workout Name:
            <input name="name" type="text" placeholder="Leave blank for freestyle workout!" className="new-workout__name" />
          </label>
          <div className="new-workout__button-container">
            <button type="submit" className="new-workout__button new-workout__button--submit">Start!</button>
            <button onClick={() => setShowNewWorkout(false)} className="new-workout__button new-workout__button--cancel">Cancel</button>
          </div>
        </form>
      </Dialog>
      <DeleteDialog
        visible={showDeleteModal}
        onClose={onCloseDelete}
        itemName={currentWorkout?.name}
        onDelete={() => onDeleteWorkout(currentWorkout?.id)}
      />
      <Dialog
        visible={showEdit}
        onClose={() => setShowEdit(false)}
        title={currentWorkout?.name}
        color="primary"
      >
        <form onSubmit={(e) => onRenameWorkout(e, currentWorkout)} className="rename-workout__form">
          <label htmlFor="" className="rename-workout__label">Workout Name:
            <input name="name" type="text" defaultValue={currentWorkout?.name} placeholder="Leave blank for freestyle workout!" className="new-workout__name" />
          </label>
          <div className="rename-workout__button-container">
            <button type="submit" className="rename-workout__button rename-workout__button--submit">Save</button>
            <button onClick={() => setShowEdit(false)} className="rename-workout__button rename-workout__button--cancel">Cancel</button>
          </div>
        </form>
      </Dialog>
      <section className="home">
        {!showNewWorkout ? <button onClick={() => setShowNewWorkout(true)} className="home__new"><img src={add} alt="Plus sign icon" className="home__add" /></button> : null}
        <div className="home__top-container">
          <h2 className="home__title">Workouts</h2>
        </div>
        <div className="home__scroll-container">
          <div className="home__workouts-container">
            {user.workouts && user.workouts.length ? user.workouts.map((workout, index) => {
              return (
                <IndividualWorkout
                  key={'workout-' + workout.name + index}
                  workout={workout}
                  index={index}
                  onClickDelete={onClickDelete}
                  onClickEdit={onClickEdit}
                />
              )
            }) :
              <div className="home__null-container">
                <h3 className="home__null">You're all set up!</h3>
                <button onClick={() => setShowNewWorkout(true)} className="home__get-started">Track your first workout!</button>
              </div>
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage;