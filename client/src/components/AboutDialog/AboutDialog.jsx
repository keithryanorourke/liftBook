import "./AboutDialog.scss"
import Dialog from "../Dialog/Dialog"
import { GitHub, LinkedIn } from "@mui/icons-material"

const AboutDialog = ({ visible, onClose }) => {
  return (
    <Dialog
      visible={visible}
      title={"About liftBook"}
      onClose={onClose}
      color="secondary"
    >
      <p>liftBook is a passion project made by Keith Ryan O'Rourke! The concept of the app is to provide people at various stages of fitness with a tool to track their workouts and give THEM the option to choose how much they want to track and see in their logs. liftBook's development is currently on hold while I attempt to build a web dev portfolio and learn some new frameworks, but I do hope to expand the tracking functionality and add some new "progress" features in the future!</p>
      <p>Feel free to reach out to me on GitHub or LinkedIn!</p>
      <div className="about__link-container">
        <a href="https://github.com/keithryanorourke" target="_blank" rel="noreferrer"><GitHub sx={{ color: "white" }} fontSize="large" /></a>
        <a href="https://linkedin.com/in/keith-ryan-orourke" target="_blank" rel="noreferrer"><LinkedIn sx={{ color: "white" }} fontSize="large" /></a>
      </div>
    </Dialog>
  )
}

export default AboutDialog