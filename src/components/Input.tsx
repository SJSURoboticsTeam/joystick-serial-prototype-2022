import { Fragment, useState } from 'react'

export default function Input({ label, isDisabled = false, min, max }) {
    const [value, setValue] = useState(0)

    function handleChange(e) {
        setValue(e.target.value)
    }

    function onBlur() {
        if (value < min) {
            setValue(min)
        }
        if (value > max) {
            setValue(max)
        }
    }

    function resetValue() {
        setValue(0)
    }

    return (
        <div className='input-group'>
            <label className='label_lg'>
                {label}
                <input
                    type='number'
                    name='speed'
                    max={max}
                    min={min}
                    value={value}
                    autoComplete='off'
                    className='input-text'
                    disabled={isDisabled}
                    onChange={handleChange}
                    onBlur={onBlur}
                />
            </label>
            <input
                type='range'
                name='speed'
                max={max}
                min={min}
                value={value}
                className='slider'
                disabled={isDisabled}
                onChange={handleChange}
                onBlur={onBlur}
            />
        </div >
    )
}
