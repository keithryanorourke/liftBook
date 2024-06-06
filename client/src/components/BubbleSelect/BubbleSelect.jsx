import React from "react";
import "./BubbleSelect.scss"
import FormError from "../FormError/FormError";
import FieldSet from "../FieldSet/FieldSet";

const BubbleSelect = ({ options, selectedOptions, label, onChange, error }) => {

    return (
        <div className="bubble-select">
            <FieldSet label={label}>
                <div className="bubble-select__options">
                    {options.map(option => {
                        return (
                            <label key={`bubble-select-${option}`} htmlFor={`bubble-select-${option}`} className={"bubble-select__button " + (selectedOptions.includes(option) ? "bubble-select__button--toggled" : "")}>
                                <input type="checkbox" id={`bubble-select-${option}`} name={option} checked={selectedOptions.includes(option)} onChange={() => onChange(option)} value={option} />
                                {option}
                            </label>
                        )
                    })}
                </div>
            </FieldSet>
            <FormError error={error} />
        </div>
    )
}

export default BubbleSelect;