import React, { useState, useEffect, useRef } from 'react';
import { ArmCommandDTO, DriveCommandDTO } from '../util/command-dto';
import { driveStringFormat, armStringFormat } from '../util/command-formats';
import { LogitechExtreme, Xbox360 } from '../controllers/arm/gamepad';
import { useGamepads } from 'react-gamepads';
import {
  DEFAULT_DRIVE_COMMANDS,
  DEFAULT_ARM_COMMANDS,
} from '../util/constants';
import DriveController from '../controllers/drive/controller';
import Wifi from './Wifi';

export default function ControllerConfiguration({commands}) {

  const [gamepads, setGamepads] = useState<Gamepad[]>([]);
  const [modes, setModes] = useState<string[]>([]);

  const [driveCommands, setDriveCommands] = useState<DriveCommandDTO>(DEFAULT_DRIVE_COMMANDS);
  const [armCommands, setArmCommands] = useState<ArmCommandDTO>(DEFAULT_ARM_COMMANDS);
  const driveCommandsRef = useRef(driveCommands);
  const armCommandsRef = useRef(armCommands);
  const [driveStatus, setDrive] = useState<DriveCommandDTO>();
  const [armStatus, setArm] = useState<ArmCommandDTO>();
  const gamepadsRef = useRef(gamepads);
  //const gamepadRef = useRef(assignedGamepads[0].gamepad);
  useGamepads((gamepads) => {
    if (gamepads[0]) {
      const connectedGamepads = Object.values(gamepads);
      setGamepads(connectedGamepads);
    }
  });
 
  useEffect(() => {
   
    gamepadsRef.current = gamepads;
  }, [gamepads]);

  // Use a ref to keep track of assignedGamepads

  
  // useEffect(() => {
  //   console.log('use assign')
  //   assignedGamepadsRef.current = assignedGamepads;
  // }, [assignedGamepads]);
 
  // useEffect(() => {
  //   const gamepadHandler = () => {
  //     // Update the gamepads array whenever the connected gamepads change
  //     const updatedGamepads = Array.from(navigator.getGamepads()).filter((gamepad) => gamepad && gamepad.connected);
  //     console.log('updating');
  //     setGamepads(updatedGamepads);
  
  //     // Update the controllers for assigned gamepads
  //     for (const assignedGamepad of assignedGamepadsRef.current) {
  //       console.log('assigneed', assignedGamepad);
  //       updateController(assignedGamepad);
  //     }
  //   };
  
  //   // Initial setup
  //   const initialGamepads = Array.from(navigator.getGamepads()).filter(Boolean);
  //   setGamepads(initialGamepads);
  
  //   window.addEventListener('gamepadconnected', gamepadHandler);
  //   window.addEventListener('gamepaddisconnected', gamepadHandler);
  
  //   return () => {
  //     window.removeEventListener('gamepadconnected', gamepadHandler);
  //     window.removeEventListener('gamepaddisconnected', gamepadHandler);
  //   };
  // }, [assignedGamepads]);
  

  function updateDriveCommands(newCommands) {
    console.log(newCommands)
    driveCommandsRef.current = newCommands;
    commands.current.driveCommands = driveStringFormat(newCommands);
   
    setDriveCommands(newCommands);
  }

  function updateArmCommands (newCommands) {
    armCommandsRef.current = newCommands;
    commands.current.armCommands = armStringFormat(newCommands);
    setArmCommands(prev => ({...prev, ...newCommands}));
  }

  function getGamePad(gamepad) {
    if (!gamepad) {
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
    const mode = modes[gamepads.findIndex((gp) => gp.index === gamepad.index)];
    console.log("updating drive")
    if (mode === 'Drive') {
      const currentCommands = driveCommandsRef.current;
      const newCommands = new DriveController(gamepad)?.getCommands(currentCommands);
  
      updateDriveCommands({...newCommands});
    } else if (mode === 'Arm') {
      let controller = getGamePad(gamepad);
      if (!controller) {
        console.log('controller model not supported');
        return armCommandsRef.current;
      }
  
      const currentCommands = armCommandsRef.current;
      const newCommands = {
        rotunda_angle: controller.getRotundaAngle(currentCommands),
        shoulder_angle: controller.getShoulderAngle(currentCommands),
        elbow_angle: controller.getElbowAngle(currentCommands),
        wrist_roll_angle: controller.getWristRollAngle(currentCommands),
        end_effector_angle: controller.getEndEffectorAngle(currentCommands)
      };
      updateArmCommands({...newCommands});
    }
  }
    

  const handleModeChange = (gamepadInstance, mode) => {
    setModes((prevModes) => {
      const index = gamepads.findIndex((gp) => gp.id === gamepadInstance.id);
      const updatedModes = [...prevModes];
  
      if (mode === "None") {
        updatedModes[index] = undefined;
      } else {
        updatedModes[index] = mode; // Update the mode
      }
  
      return updatedModes;
    });
  };
  



  useEffect(() => {
    
    const interval = setInterval(() => {
      for (const gamepad of gamepads) {
        
        updateController(gamepad);
      }
    }, 2000);
  
    return () => clearInterval(interval);
  }, []);

  

  return (
    <div id="ov-gamepad">
      <label>Available Gamepads:</label>
  
      <ul>
        {gamepads.map((gamepad, index) => (
          <li key={gamepad.id}>
            <div>
            
              {gamepad.id.includes("Logitech") ? "Logitech" : "Xbox"}:
            </div>
            <div>
              <select className="btn" onChange={(e) => handleModeChange(gamepad, e.target.value)}>
                <option value="None">none</option>
                <option value="Drive">Drive</option>
                <option value="Arm">Arm</option>
              </select>
            </div>
            {/* {gamepad.axes.map((axisValue, axisIndex) => (
            <div key={axisIndex}>
              <div style={{ width: `${Math.abs(axisValue) * 50}px`, height: '20px', background: 'green' }} />
              <div>{`Axis ${axisIndex}: ${axisValue.toFixed(2)}`}</div>
            </div>
              ))} */}
            

            {modes[index] === "Drive" && (
            <div>
              <Wifi
                commands={driveCommands}
                setStatus={setDrive}
                endpoint="drive"
              />
            </div>
          )}
          {modes[index] === "Arm" && (
            <div>
              <Wifi
                commands={commands.current.armCommands}
                setStatus={setArm}
                endpoint="arm"
              />
            </div>
          )}
          </li>
        ))}
      </ul>
      
  
    </div>
    
  );
}




