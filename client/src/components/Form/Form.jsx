import "./Form.scss"
import FormError from "../FormError/FormError";

const Form = ({onSubmit, children, error, buttons}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.type === 'checkbox') {
            e.preventDefault();
            e.target.click();
          }
    }

    return (
        <form onSubmit={handleSubmit} onKeyDown={onKeyDown} className="form">
            {children}
            <div className="form__buttons-container">
                {buttons}
            </div>
            <FormError error={error} />
        </form>
    )
}

export default Form;