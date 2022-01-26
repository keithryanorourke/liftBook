const convertDate = (date) => {
  const splitDate = date.split("-")
  let month = null;
  switch(splitDate[1]) {
    case "01":
      month = "JAN"
      break;
    case "02":
      month = "FEB"
      break;
    case "03":
      month = "MAR"
      break;
    case "04":
      month = "APR"
      break;
    case "05":
      month = "MAY"
      break;
    case "06":
      month = "JUN"
      break;
    case "07":
      month = "JUL"
      break;
    case "08":
      month = "AUG"
      break;
    case "09":
      month = "SEP"
      break;
    case "10":
      month = "OCT"
      break;
    case "11":
      month = "NOV"
      break;
    case "12":
      month = "DEC"
      break;
  }
  return month + " " + splitDate[2].slice(0, 2) +" " + splitDate[0]
}

module.exports=convertDate