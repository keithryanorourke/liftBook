import "./FieldSet.scss";

const FieldSet = ({ label, children }) => {
    return (
        <fieldset className="fieldset">
            <legend>{label}</legend>
            {children}
        </fieldset>
    )
}

export default FieldSet;