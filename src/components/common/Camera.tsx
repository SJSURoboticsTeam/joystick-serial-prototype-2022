import React from 'react'

export default function Camera({ name, src }) {
    return (
        <div className='image-container'>
            <h3 className='img-label'>Camera {name}</h3>
            {src ? <img src={src} alt={name} /> : <p>Camera {name} is not connected</p>}
        </div>
    )
}
