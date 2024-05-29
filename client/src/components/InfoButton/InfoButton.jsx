import { useState } from "react"
import Dialog from "../Dialog/Dialog"
import help from "../../assets/icons/help_outline_black_24dp.svg"
import "./InfoButton.scss"

const InfoButton = ({ title, info }) => {
    const [visible, setVisible] = useState();
    console.log(visible);
    const handleClick = (e) => {
        e.preventDefault();
        setVisible(true);
    }

    return (
        <>
            <button className="info-button" onClick={handleClick}>
                <img src={help} alt="Question mark icon" className="settings__help" />
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