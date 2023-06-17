import React from 'react'

export default function Camera({ name, src }) {
    return (
        <div className='operational-view'>
            {src ? <img className='big-camera-view' src={src} alt={name} /> : <p>Camera {name} is not connected</p>}
        </div>
    )
}
