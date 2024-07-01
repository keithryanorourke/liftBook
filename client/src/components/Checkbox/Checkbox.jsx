import InfoButton from "../InfoButton/InfoButton";
import "./Checkbox.scss"

const Checkbox = ({ label, checked, onChange, name, value, info }) => {

    return (
        <label htmlFor={`checkbox-${name}`} className="checkbox__label">
            <input
                type="checkbox"
                className="checkbox"
                checked={checked}
                name={name}
                value={value}
                onChange={onChange}
                id={`checkbox-${name}`}
            />
            <span>{label}</span>
            {info && <InfoButton info={info} title={label} />}
        </label>
    )
}

export default Checkbox;