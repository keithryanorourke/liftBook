import "./Form.scss"
import Alert from "../Alert/Alert";

const Form = ({ onSubmit, children, error, buttons }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    }

    const onKeyDown = (e) => {
        const { key, target } = e;
        const { type } = target;
        if (key === 'Enter' && (type === 'checkbox' || type === 'select' || type === 'radio')) {
            e.preventDefault();
            e.target.click();
        }
    }

    return (
        <form onSubmit={handleSubmit} onKeyDown={onKeyDown} className="form">
            {children}
            <Alert message={error} />
            <div className="form__buttons-container">
                {buttons}
            </div>
        </form>
    )
}

export default Form;