import "./IndividualLift.scss"

const IndividualLift = ({lift, settings, index}) => {

  const showDifficulty = () => {
    if (lift.metric === "RPE") {
      if(!lift.difficulty) {
        return "untracked"
      }
      return lift.difficulty.toString() + " RPE"
    }
    return lift.difficulty.toString() +" RIR"
  }

  const showPercentage = () => {
    if (lift.percentageOfMax) {
      return lift.percentageOfMax.toString() + "%"
    }
    return "untracked"
  }

  return (
    <article className={"lift " + (index % 2 === 0 ? "lift--even" : null)}>
      <h4 className="lift__title">{lift.name}</h4>
      <div className="lift__container">
        <div className="lift__stat-container">
          <span className="lift__specifier">WEIGHT:</span>
          <span className="lift__stat">{lift.weight ? `${lift.weight}${lift.measure}` : 'bodyweight'}</span>
        </div>
        <div className="lift__stat-container">
          <span className="lift__specifier">REPS:</span>
          <span className="lift__stat">{lift.reps}</span>
        </div>
        {settings.trackDifficulty 
        ? 
        <div className="lift__stat-container">
          <span className="lift__specifier">DIFFICULTY:</span>
          <span className="lift__stat">{showDifficulty()}</span>
        </div>
        :
        null
        }
        {settings.trackPercentageOfMax
        ?
        <div className="lift__stat-container">
          <span className="lift__specifier">%of1RM:</span>
          <span className="lift__stat">{showPercentage}</span>
        </div>
        :
        null
        }
      </div>
    </article>
    )
}

export default IndividualLift;