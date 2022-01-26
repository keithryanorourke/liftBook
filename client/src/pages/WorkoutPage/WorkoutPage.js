import "./WorkoutPage.scss"
import axios from "axios"
import React, {useState} from "react"
import {NavLink, Navigate} from "react-router-dom"
import {useParams} from "react-router";

const WorkoutPage = () => {
  const location=useParams();

  console.log(location)
  return (
    <h1>{location.workoutId}</h1>
  )
}

export default WorkoutPage