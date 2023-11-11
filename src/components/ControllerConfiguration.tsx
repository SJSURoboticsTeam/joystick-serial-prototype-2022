import React, { useState, useEffect, useRef } from 'react';
import { useGamepads } from 'react-gamepads';
import { DriveCommandDTO } from '../util/command-dto';
import { driveStringFormat } from '../util/command-formats';
import { ArmCommandDTO } from '../util/command-dto';
import { armStringFormat } from '../util/command-formats';
import { LogitechExtreme, Xbox360 } from '../controllers/arm/gamepad';
import {
  DEFAULT_DRIVE_COMMANDS,
  DEFAULT_ARM_COMMANDS,
} from '../util/constants';
import DriveController from '../controllers/drive/controller';

export default function ControllerConfiguration({commands}) {
  const [connectedGamepads, setConnectedGamepads] = useState([]);
  const [assignedGamepads, setAssignedGamepads] = useState([]);
  //const gamepadRefs = useRef([]);
  const [driveCommands, setDriveCommands] = useState<DriveCommandDTO>(DEFAULT_DRIVE_COMMANDS);
  const [armCommands, setArmCommands] = useState<ArmCommandDTO>(DEFAULT_ARM_COMMANDS);
  const driveCommandsRef = useRef(driveCommands);
  const armCommandsRef = useRef(armCommands);
  console.log(commands)
  console.log(driveCommands)
  console.log(armCommands)
  console.log(driveCommandsRef)
  console.log(armCommandsRef)

  function updateDriveCommands(newCommands) {
    driveCommandsRef.current = newCommands;
    commands.current.driveCommands = driveStringFormat(newCommands);
    console.log(newCommands)
    setDriveCommands(newCommands);
  }

  function updateArmCommands (newCommands) {
    armCommandsRef.current = newCommands;
    commands.current.armCommands = armStringFormat(newCommands);
    console.log(newCommands);
    setArmCommands(prev => ({...prev, ...newCommands}));
  }

  function getGamePad(gamepad) {
    if (!gamepad) {
      console.log(`No controller at `);
      return null;
    }
  
    const gamePadID = gamepad.id.toLowerCase();
  
    if (gamePadID.includes('xbox') || gamePadID.includes('microsoft')) {
      return new Xbox360(gamepad);
    } else if (gamePadID.includes('logitech')) {
      return new LogitechExtreme(gamepad);
    } else {
      return null;
    }
  }

  function updateController(gamepad) {
    console.log('updating', gamepad.mode)
    if  (gamepad.mode === 'Drive'){
      const currentCommands = driveCommandsRef.current;
      const newCommands = new DriveController(gamepad.gamepad)?.getCommands(currentCommands);
      if (newCommands.drive_mode === 'X') {
        newCommands.drive_mode = currentCommands.drive_mode;
      }
      if(newCommands.wheel_orientation === 3) {
        newCommands.wheel_orientation = currentCommands.wheel_orientation;
      }
      updateDriveCommands({...newCommands});
    }else {
      let controller = getGamePad(gamepad.gamepad);
      if (!controller) {
        console.log('controller model not supported');
        return armCommandsRef.current;
      }
      
      let currentCommands = armCommandsRef.current;
      const newCommands = {
          rotunda_angle: controller.getRotundaAngle(currentCommands),
          shoulder_angle: controller.getShoulderAngle(currentCommands),
          elbow_angle: controller.getElbowAngle(currentCommands),
          wrist_roll_angle: controller.getWristRollAngle(currentCommands),
          end_effector_angle: controller.getEndEffectorAngle(currentCommands)
      }

      updateArmCommands({...newCommands});
    }

  }

  useEffect(() => {
    const gamepadHandler = (event) => {
     
      const connectedGamepads = Array.from(navigator.getGamepads()).filter(Boolean);
      console.log(connectedGamepads)
      setConnectedGamepads(connectedGamepads);
    };
  
    window.addEventListener('gamepadconnected', gamepadHandler);
    window.addEventListener('gamepaddisconnected', gamepadHandler);
  
    return () => {
      window.removeEventListener('gamepadconnected', gamepadHandler);
      window.removeEventListener('gamepaddisconnected', gamepadHandler);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      for (const assignedGamepad of assignedGamepads) {
        updateController(assignedGamepad)
      }
    }, 125);
  
    return () => clearInterval(interval);
  }, [assignedGamepads]);

  const handleModeChange = (gamepadInstance, mode) => {
    if (mode === "None") {
      // remove from assigned gamepad
      const updatedAssignedGamepads = assignedGamepads.filter((entry) => entry.gamepad !== gamepadInstance);
      setAssignedGamepads(updatedAssignedGamepads);
    } else {
      // change the mode or add new gamepad
      const updatedAssignedGamepads = [...assignedGamepads];
      const existingEntry = assignedGamepads.find((entry) => entry.gamepad === gamepadInstance);
      if (existingEntry) {
        existingEntry.mode = mode;
      } else {
        updatedAssignedGamepads.push({ gamepad: gamepadInstance, mode: mode }); // Fix mode property
      }
  
      setAssignedGamepads([...updatedAssignedGamepads]);
    }
  };

  return (
    <div>
      <h2>Controller Configuration</h2>
      <div>
        <label>Available Gamepads:</label>
        <ul>
          {connectedGamepads.map((gamepad) => (
            <li key={gamepad.id}>
              Gamepad {gamepad.id}:
              <select onChange={(e) => handleModeChange(gamepad, e.target.value)}>
                <option value="None">none</option>
                <option value="Drive">Drive</option>
                <option value="Arm">Arm</option>
              </select>
            
            </li>
          ))}

        </ul>
        <p>{JSON.stringify(armCommandsRef.current)}</p>
      </div>
    </div>
  );
}






