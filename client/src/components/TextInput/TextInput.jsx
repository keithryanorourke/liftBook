import FormError from "../FormError/FormError";
import "./TextInput.scss"

const TextInput = ({ value, onChange, name, label, placeholder, theme = "filled", color = "default", error }) => {

    return (
        <label htmlFor={`text-input-${name}`} className="text-input__label">
            {label}:
            <input
                type="text"
                value={value}
                onChange={onChange}
                name={name}
                className={`text-input text-input--${theme} text-input--${color}`}
                placeholder={placeholder}
                id={`text-input-${name}`}
            />
            <FormError error={error} />
        </label>
    )
}

export default TextInput;