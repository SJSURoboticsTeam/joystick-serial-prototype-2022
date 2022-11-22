import { useState } from "react"

export default function TextSliderInput({ value, onChange, handleSubmit, min = 0, max = 100, label = "", disabled = false, autocomplete = 'off' }) {
    const [textInput, setTextInput] = useState(value);
    const handleChange = (e) => {
        if (e.target.value > max) {
            e.target.value = max
        } else if (e.target.value < min) {
            e.target.value = min
        }
        onChange(e)
    }

    const handleSliderChange = (e) => {
        onChange(e)
        handleSubmit(e)
    }

    return (
        <div className='input-group'>
            <label className='label_lg'>
                {label}
                <input
                    className='input-text'
                    type='number'
                    name="CMD"
                    max={max}
                    min={min}
                    value={value}
                    disabled={disabled}
                    onBlur={handleSubmit}
                    onChange={handleChange}
                    autoComplete={autocomplete}
                />
            </label>
            <input
                className='slider'
                type='range'
                name="CMD"
                max={max}
                min={min}
                value={value}
                disabled={disabled}
                onChange={handleChange}
            />
        </div >
    )
}