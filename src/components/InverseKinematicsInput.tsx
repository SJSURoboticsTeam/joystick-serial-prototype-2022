import { useEffect, useState } from 'react'
import { TextSliderInput, FooterButtons } from './Forms/ControlForm';

export default function InverseKinematicsInput(props){
    return(
        <div>
            <button onClick = {()=>props.sendButton()}>
                Send commands
            </button>
            <br/>
            <TextSliderInput
                name='ik_z_angle'
                label="Z input for IK Angle"
                min={-10}
                max={10}
                value={props.zindex}
                onChange={()=>props.handleChange(event)} 
            />
        </div>
    )
}