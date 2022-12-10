import React from 'react'

export default function DropdownButtonSelector({ name, value, onChange, options, label = "", disabled = false }) {
    return (
        <>
            <label className='label_lg'>{label}</label>
            <div className='dropdown-selector-group'>
                <select
                    className='input-text btn'
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                >
                    {options.map((option, index) => {
                        return (
                            <option key={index} value={option.value}>{option.label}</option>
                        )
                    })}
                </select>
                {options.map((option, index) => {
                    return (
                        <button
                            key={index}
                            className='btn btn__primary'
                            onClick={() => onChange({ target: { name: name, value: option.value } })}
                            disabled={disabled}
                        >
                            {option.label}
                        </button>
                    )
                })}
            </div>
        </>
    )
}
