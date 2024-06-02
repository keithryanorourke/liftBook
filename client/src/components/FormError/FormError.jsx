import React from 'react'
import './FormError.scss'

const FormError = ({error}) => {
    if (!error) return null;

    return (
        <div className="form-error">! {error}</div>
    )
}

export default FormError;