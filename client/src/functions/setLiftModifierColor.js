let liftSeparationCounter = 0;

const setLiftModifierColor = (lift, lifts, index, condition) => {
  let color  = "";
  
  if(index > 0) {
    if(lift[condition] !== lifts[index-1][condition]) {
      if(liftSeparationCounter < 3) {
        liftSeparationCounter++
      } else {
        liftSeparationCounter = 0
      }
    }
  }

  switch(liftSeparationCounter) {
    case 0:
      color="lift--blue"
      break;
    case 1:
      color="lift--pink"
      break;
    case 2:
      color="lift--orange"
      break;
    default:
      color="lift--green"
      break;
  }
  return color
}

export default setLiftModifierColor