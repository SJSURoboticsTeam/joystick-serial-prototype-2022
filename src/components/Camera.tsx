import React from 'react'

export default function Camera(props) {
    return (
        <div className='image-container'>
            <h3 className='img-label'>Camera {props.name}</h3>
            <img src={props.src} />
        </div>
    )
}
