import { useEffect, useState } from 'react'
import { TextSliderInput, FooterButtons } from './Forms/ControlForm';

// export default function InverseKinematicsInput(props){
export default function InverseKinematicsInput({zindex, sendButton, handleChange}:{zindex:number, sendButton:()=>void, handleChange:(event: EventTarget)=>void}){
    return(
        <div>
            <button onClick = {()=>sendButton()}>
                Send commands
            </button>
            <br/>
            <TextSliderInput
                name='ik_z_angle'
                label="Z input for IK Angle"
                min={-10}
                max={10}
                value={zindex}
                onChange={()=>handleChange(event.target)} 
            />
        </div>
    )
}