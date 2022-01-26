import "./WorkoutPage.scss"
import axios from "axios"
import React, {useState} from "react"
import {NavLink, Navigate} from "react-router-dom"

const WorkoutPage = (props) => {
  return (
    <h1>{props.match.params.workoutId}</h1>
  )
}

export default WorkoutPage