import React, { useState } from 'react'

export default function DriveCommandStatus(props) {
    return (
        <div>
            <h1>Drive Command Status</h1>
            <form>
                <label> Speed
                    <input type="text" value={props.speed} placeholder={props.speed} />
                </label>
                <label> Angle
                    <input type="text" value={props.angle} placeholder={props.angle} />
                </label>
                <label> Mode
                    <input type="text" value={props.mode} placeholder={props.mode} />
                </label>
                <label> Wheel Orientation
                    <input type="text" value={props.wheel_orientation} placeholder={props.wheel_orientation} />
                </label>
            </form>
        </div >
    )
}

// ex:
// const currentCommands = commands.map(command =>
//     <DriveCommandStatus
//       speed={command.speed}
//       angle={command.angle}
//       mode={command.mode}
//       wheel_orientation={command.wheel_orientation}
//     />
//   );
