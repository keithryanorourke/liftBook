import React from "react";
import "./BubbleSelect.scss"

const BubbleSelect = ({ options, selectedOptions, onChange }) => {

    return (
        <div className="bubble-select">
            {options.map(option => {
                return (
                    <button onClick={() => onChange(option)} key={'bubble-select-' + option} className={"bubble-select__button " + (selectedOptions.includes(option) ? "bubble-select__button--toggled" : "")}>{option}</button>
                )
            })}
        </div>
    )
}

export default BubbleSelect;