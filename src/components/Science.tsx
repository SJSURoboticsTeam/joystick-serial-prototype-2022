
import { FooterButtons } from './Forms/ControlForm';
import { useState } from 'react'
import { userInfo } from 'os';

export default function Science () {
    const [mode, setMode] = useState(false);
    const [emergency, setEmergency] = useState(false);
    const [start, setStart] = useState(false);
    const [step, setStep] = useState(0);

    return (
        <div>
            <h2>Science</h2>
            <form onSubmit={(e) => { e.preventDefault() }}>
            <div className='btn-group footer'>
                <button className='btn btn__primary' onClick={() => setStart(!start)}>Start</button>
                <button className='btn btn__primary' onClick={() => setEmergency(!emergency)}>emergency</button>
            </div>
            <div className='btn-group footer'>
                <button className='btn btn__primary' onClick={() => setMode(!mode)}>
                    {mode? "auto" : 'manual'}
                </button>
            </div>
            </form>
        </div>
    )
}
