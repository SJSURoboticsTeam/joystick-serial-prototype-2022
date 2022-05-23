import React, { useState } from 'react'
import { DriveCommandDTO } from '../dto/drive-commands.dto'

export default function DriveCommandStatus(props: DriveCommandDTO) {
    const [commands, setCommands] = useState<DriveCommandDTO>(props)
    return (
        <div>
            <h1>Drive Command Status</h1>
            <form>
                <label> Speed
                    <input type="text" value={commands.speed} />
                </label>
                <label> Angle
                    <input type="text" value={commands.angle} />
                </label>
                <label> Mode
                    <input type="text" value={commands.mode} />
                </label>
                <label> Wheel Orientation
                    <input type="text" value={commands.wheel_orientation} />
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
