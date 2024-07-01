import "./ScreenOverlay.scss"

const ScreenOverlay = ({color = "default", visible = false}) => {
    return (
        <div className={"screen-overlay screen-overlay--" + color + (visible ? " screen-overlay--visible" : "")} />
    )
} 

export default ScreenOverlay;