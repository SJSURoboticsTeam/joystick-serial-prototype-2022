import React from 'react';

export default function Camera({ name, src, className}) {
    // Todo: set width and height parameters of img div to match the size of pane 
    return (
        <div className='camera'>
            {src ? <img className={className} src={src} alt={name} /> : <p>Camera {name} is not connected</p>}
        </div>
    )
}
