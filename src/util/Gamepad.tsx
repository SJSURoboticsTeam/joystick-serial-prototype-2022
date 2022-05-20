import React, { useState } from 'react'
import { useGamepads } from 'react-gamepads';


export default function Gamepad() {
    const [gamepads, setGamepads] = useState({});
    useGamepads(gamepads => setGamepads(gamepads));

    const gamepadDisplay = Object.keys(gamepads).map(gamepadId => {
        // console.log("displaying gamepad", gamepads[gamepadId]);
        return (
            <div>
                <h2>{gamepads[gamepadId].id}</h2>
                <h3>Joystick</h3>
                {gamepads[gamepadId].axes &&
                    gamepads[gamepadId].axes.map((axis, index) => (
                        <div>
                            {index}: {axis}
                        </div>
                    ))}
                <h3>Buttons</h3>
                {gamepads[gamepadId].buttons &&
                    gamepads[gamepadId].buttons.map((button, index) => (
                        <div>
                            {index}: {button.value}
                        </div>
                    ))}

            </div>
        );
    });

    return (
        <div>{gamepadDisplay}</div>
    )
}
