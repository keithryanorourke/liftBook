import FormError from "../FormError/FormError";
import "./PasswordInput.scss"

const PasswordInput = ({ value, onChange, name, label, placeholder, theme = "filled", color = "default", error }) => {

    return (
        <label htmlFor={`password-input-${name}`} className="password-input__label">
            {label}:
            <input
                type="password"
                value={value}
                onChange={onChange}
                name={name}
                className={`password-input password-input--${theme} password-input--${color}`}
                placeholder={placeholder}
                id={`password-input-${name}`}
            />
            <FormError error={error} />
        </label>
    )
}

export default PasswordInput;