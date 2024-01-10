import React from 'react';

export default function Camera({ name, src, className }) {
    return (
        <div className='camera'>
            {src ? <img className={className} src={src} alt={name} /> : <p>Camera {name} is not connected</p>}
        </div>
    )
}
