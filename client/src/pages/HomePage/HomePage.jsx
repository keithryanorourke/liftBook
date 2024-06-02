import "./HomePage.scss"
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import IndividualWorkout from "../../components/IndividualWorkout/IndividualWorkout";
import add from "../../assets/icons/add_black_24dp.svg";
import useConfiguredAxios from "../../hooks/useConfiguredAxios";
import Dialog from "../../components/Dialog/Dialog";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";
import TextInput from "../../components/TextInput/TextInput";
import Form from "../../components/Form/Form";
import Button from "../../components/Button/Button";

const WorkoutForm = ({ onSubmit, error, workout, onCancel }) => {
  const [name, setName] = useState(workout?.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, workout);
  }

  return (
    <Form
      onSubmit={handleSubmit}
      error={error}
      buttons={<>
        <Button type="button" onClick={onCancel}>Cancel</Button>
        <Button theme="outlined" color="primary">Save</Button>
      </>}
    >
      <TextInput
        label="Workout Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Leave blank for freestyle workout!"
      />
    </Form>
  )
}

const HomePage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    workouts: null
  })
  const [showNewWorkout, setShowAdd] = useState(false)
  const [currentWorkout, setCurrentWorkout] = useState(false)
  const [showDeleteModal, setShowDelete] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [formError, setFormError] = useState(null);
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

  const onAddWorkout = (name) => {
    const workout = {
      name: name || "Freestyle Workout"
    }

    axios.post(`/workout`, workout)
      .then(response => navigate(`../workout/${response.data}`, { replace: true }))
      .catch(error => setFormError("Server error encountered"))
  }

  const onEditWorkout = (name, workout) => {
    const newWorkout = {
      ...workout,
      name: name || "Freestyle Workout"
    }
    axios.put(`/workout/${workout.id}`, newWorkout)
      .then(response => {
        getWorkouts()
        onCloseEdit()
      })
      .catch(error => setFormError("Server error encountered"))
  }

  const onDeleteWorkout = (id) => {
    axios.delete(`/workout/${id}`)
      .then(response => {
        getWorkouts()
        onCloseDelete()
      })
      .catch(error => setFormError("Server error encountered"))
  }

  const onClickDelete = (workout) => {
    setCurrentWorkout(workout)
    setShowDelete(true)
  }

  const onClickEdit = (workout) => {
    setCurrentWorkout(workout)
    setShowEdit(true)
  }

  const onClose = () => {
    setCurrentWorkout(null);
    setFormError(null);
  }

  const onCloseAdd = () => {
    setShowAdd(false);
    onClose();
  }

  const onCloseDelete = () => {
    setShowDelete(false);
    onClose();
  }

  const onCloseEdit = () => {
    setShowEdit(false);
    onClose();
  }

  return (
    <>
      <Dialog
        title="New Workout"
        visible={showNewWorkout}
        onClose={() => setShowAdd(false)}
        color="primary"
      >
        <WorkoutForm
          onSubmit={onAddWorkout}
          onCancel={onCloseAdd}
          error={formError}
        />
      </Dialog>
      <Dialog
        visible={showEdit}
        onClose={() => setShowEdit(false)}
        title={currentWorkout?.name}
        color="primary"
      >
        <WorkoutForm
          onSubmit={(name) => onEditWorkout(name, currentWorkout)}
          onCancel={onCloseEdit}
          error={formError}
          workout={currentWorkout}
        />
      </Dialog>
      <DeleteDialog
        visible={showDeleteModal}
        onClose={onCloseDelete}
        itemName={currentWorkout?.name}
        onDelete={() => onDeleteWorkout(currentWorkout?.id)}
      />
      <section className="home">
        {!showNewWorkout ? <button onClick={() => setShowAdd(true)} className="home__new"><img src={add} alt="Plus sign icon" className="home__add" /></button> : null}
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
                <button onClick={() => setShowAdd(true)} className="home__get-started">Track your first workout!</button>
              </div>
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage;