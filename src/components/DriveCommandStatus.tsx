import React, { useState } from 'react'
import { useForm } from './useForm'

export default function DriveCommandStatus(props) {
    const [state, handleChange] = useForm({ speed: 0, angle: 0, mode: 'D', wheel_orientation: 0 })

    return (
        <div>
            <h1>Drive Command Status</h1>
            <form>
                <label> Speed
                    <input name="speed" value={state.speed} onChange={handleChange} />
                </label>

                <label> Angle
                    <input name="angle" value={state.angle} onChange={handleChange} />
                </label>

                <label> Mode
                    <input name="mode" value={state.mode} onChange={handleChange} />
                </label>

                <label> Wheel Orientation
                    <input name="wheel_orientation" value={state.wheel_orientation} onChange={handleChange} />
                </label>
            </form>
        </div >
    )
}
