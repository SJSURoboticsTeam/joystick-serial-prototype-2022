import React, { useState } from 'react'

export default function ToggleButton() {
    const [toggleMode, setToggleMode] = useState(true)
    return (
        <button className='btn btn__primary' onClick={() => setToggleMode(!toggleMode)}>Toggle Mode</button>
    )
}
