import InfoButton from "../InfoButton/InfoButton";
import "./RadioButton.scss";

const RadioButton = ({ label, checked, onChange, name, value, info }) => {

    return (
        <label htmlFor={`radio-${name}-${label}`} className="radio__label">
            <input
                type="radio"
                className="radio"
                checked={checked}
                name={name}
                value={value}
                onChange={onChange}
                id={`radio-${name}-${label}`}
            />
            <span>{label}</span>
            {info && <InfoButton info={info} title={label} />}
        </label>
    )
}

export default RadioButton;