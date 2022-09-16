import React from 'react'

export default function Camera({ name, src }) {
    return (
        <div className='image-container'>
            <h3 className='img-label'>Camera {name}</h3>
            <img src={src} alt={name} />
        </div>
    )
}
