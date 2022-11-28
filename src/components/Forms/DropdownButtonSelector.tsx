import React from 'react'

export default function DropdownButtonSelector({ name, value, onChange, options }) {
    return (
        <>
            <label className='label_lg'> Wheel Orientation</label>
            <div className='btn-group'>
                <select
                    className='input-text btn'
                    name={name}
                    value={value}
                    onChange={onChange}
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
                        >
                            {option.label}
                        </button>
                    )
                })}
            </div>
        </>
    )
}
