import { useState, useEffect } from "react"

export default function TextSliderInput({ value, onChange, min = 0, max = 100, label = "", disabled = false, autocomplete = 'off' }) {
    const [inputText, setInputText] = useState(value);
    const handleTextInputChange = (e) => {
        if (e.target.value > max) {
            e.target.value = max
        } else if (e.target.value < min) {
            e.target.value = min
        }
        setInputText(e.target.value)
    }

    useEffect(() => {
        setInputText(value)
    }, [value])

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
                    value={inputText}
                    disabled={disabled}
                    onBlur={onChange}
                    onChange={handleTextInputChange}
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
                onChange={onChange}
            />
        </div >
    )
}