import React from 'react'

export default function Camera({ name, src }) {
    return (
        <div>
            {src ? <img src={src} alt={name} /> : <p>Camera {name} is not connected</p>}
        </div>
    )
}
