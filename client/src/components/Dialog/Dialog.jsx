import "./Dialog.scss";
import { useOnClickOutside } from "usehooks-ts";
import { useRef } from "react";
import { Close } from "@mui/icons-material";
import ScreenOverlay from "../ScreenOverlay/ScreenOverlay";

const Dialog = ({ visible, onClose, title, children, color = "default" }) => {
    const ref = useRef(null);
    useOnClickOutside(ref, onClose)

    return (
        <>
            <ScreenOverlay color={color} visible={visible} />
            {visible && <div className="dialog">
                <div ref={ref} className="dialog__wrapper">
                    <header className="dialog__header">
                        <h3>{title}</h3>
                        <button className="icon-button" onClick={onClose}>
                            <Close sx={{ color: "white" }} />
                        </button>
                    </header>
                    <div className="dialog__content-container">
                        {children}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Dialog;