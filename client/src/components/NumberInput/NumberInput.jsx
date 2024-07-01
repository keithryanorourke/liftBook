import FormError from "../FormError/FormError";
import "./NumberInput.scss"

const NumberInput = ({ value, onChange, name, label, placeholder, theme = "filled", color = "default", step = "1", error }) => {

    return (
        <label htmlFor={`number-input-${name}`} className="number-input__label">
            {label}:
            <input
                type="number"
                value={value}
                onChange={onChange}
                name={name}
                step={step}
                className={`number-input number-input--${theme} number-input--${color}`}
                placeholder={placeholder}
                id={`number-input-${name}`}
            />
            <FormError error={error} />
        </label>
    )
}

export default NumberInput;