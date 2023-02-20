import React from 'react'

export default function StepperInput({ name, value, onChange, options, label = "", disabled = false }) {
    function increment() {
        const index = options.findIndex(option => option.value === value);
        if (index < options.length - 1) {
            onChange({ target: { name, value: options[index + 1].value } });
        }
    }

    return (
        <>
            <label className='label_lg'>{label}</label>
            <div className='dropdown-selector-group'>
                <select
                    className='input-text'
                    name={name}
                    value={value}
                    onChange={() => { }}
                    disabled={disabled}
                >
                    {options.map((option, index) => {
                        return (
                            <option key={index} value={option.value}>{option.label}</option>
                        )
                    })}
                </select>
                <button className='btn btn__primary' onClick={increment}>
                    Next Step
                </button>
            </div>
        </>
    )
}
