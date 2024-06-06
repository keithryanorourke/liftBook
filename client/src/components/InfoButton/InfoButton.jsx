import { useState } from "react"
import Dialog from "../Dialog/Dialog"
import "./InfoButton.scss"
import { HelpOutline } from "@mui/icons-material"

const InfoButton = ({ title, info }) => {
    const [visible, setVisible] = useState();
    const handleClick = (e) => {
        e.preventDefault();
        setVisible(true);
    }

    return (
        <>
            <button className="info-button" onClick={handleClick}>
                <HelpOutline sx={{ color: "white" }} />
            </button>
            <Dialog
                visible={visible}
                onClose={() => setVisible(false)}
                color="secondary"
                title={title}
            >
                <p className="info">
                    {info}
                </p>
            </Dialog>
        </>
    )
}

export default InfoButton;