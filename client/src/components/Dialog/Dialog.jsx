import "./Dialog.scss";
import closeIcon from "../../assets/icons/clear_black_24dp.svg"
import { useOnClickOutside } from "usehooks-ts";
import { useRef } from "react";

const Dialog = ({ visible, onClose, title, children, color = "default" }) => {
    const ref = useRef(null);
    useOnClickOutside(ref, onClose)

    return (
        <>
            <div className={"screen-overlay screen-overlay--" + color + (visible ? " screen-overlay--visible" : "")} />
            {visible && <div className="dialog">
                <div ref={ref} className="dialog__wrapper">
                    <div className="dialog__top-container">
                        <h3>{title}</h3>
                        <button className="dialog__close-button" onClick={onClose}>
                            <img src={closeIcon} alt="X shaped icon" className="dialog__close-cion" />
                        </button>
                    </div>
                    <div className="dialog__content-container">
                        {children}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Dialog;