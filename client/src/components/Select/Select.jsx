import FormError from "../FormError/FormError";
import "./Select.scss";

const Select = ({ label, name, options, value, onChange, error }) => {

    return (
        <label htmlFor={`select-${name}`} className="select__label">
            {label}:
            <select name={name} value={value} onChange={onChange} id="" className="select">
                {options?.map(option => {
                    return <option
                        key={`select-${name}-${option}`}
                        value={option}
                        className="select__option"
                    >
                        {option}
                    </option>
                })}
            </select>
            {error && <FormError error={error} />}
        </label>
    )
}

export default Select;