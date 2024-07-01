import { ErrorOutline } from "@mui/icons-material";
import "./Alert.scss"

const Alert = ({message}) => {
    if (!message) return null;

    return (
        <div className="alert">
            <ErrorOutline sx={{color: "red"}} />
            <p className="alert__text">{message}</p>
        </div>
    )
}

export default Alert;