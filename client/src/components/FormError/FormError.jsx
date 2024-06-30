import React from 'react'
import './FormError.scss'
import { ErrorOutline } from '@mui/icons-material';

const FormError = ({ error }) => {
    if (!error) return null;

    return (
        <div className="form-error"><ErrorOutline sx={{ color: "red" }} /> <span className="form-error__text">{error}</span></div>
    )
}

export default FormError;