import "./SingleExercisePage.scss"
import { useParams } from "react-router-dom"

const SingleExercisePage = () => {
  const params = useParams()
  const {exerciseId} = params

  return (
    <section className="single-exercise">
      <h2 className="single-exercise__title">{exerciseId}</h2>
    </section>
  )
}

export default SingleExercisePage;