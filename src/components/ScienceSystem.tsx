
import { DropdownButtonSelector, StepperInput } from './Forms/ControlForm';
import { useEffect, useState } from 'react'
import { SCIENCE_MODES, SCIENCE_STEPS } from '../util/constants';

export default function ScienceSystem({ commands }) {
    const [scienceCommands, setScienceCommands] = useState({
        is_operational: 0,
        state_step: 0,
        mode: 'A'
    });

    function connect() {
        setScienceCommands({ ...scienceCommands, is_operational: 1 });
    }

    function disconnect() {
        setScienceCommands({ ...scienceCommands, is_operational: 0 });
    }

    function handleChange(e) {
        const newCommands = { ...scienceCommands, [e.target.name]: e.target.value };
        setScienceCommands(newCommands);
    }

    useEffect(() => {
        commands.current = JSON.stringify(scienceCommands); // TODO: Add science string format
    }, [scienceCommands]);

    return (
        <div>
            <h2>Science</h2>
            <form onSubmit={(e) => { e.preventDefault() }}>
                <DropdownButtonSelector
                    name='mode'
                    label='Mode'
                    options={SCIENCE_MODES}
                    value={scienceCommands.mode}
                    onChange={handleChange}
                />

                <StepperInput
                    name='state_step'
                    label='State Step'
                    options={SCIENCE_STEPS}
                    value={scienceCommands.state_step}
                    onChange={handleChange}
                />

                <div className='btn-group'>
                    {scienceCommands.is_operational === 0 && <button className='btn btn__primary' onClick={() => {
                        setScienceCommands({
                            is_operational: 0,
                            state_step: 0,
                            mode: 'A'
                        });
                    }}>Reset</button>}
                    {scienceCommands.is_operational === 0 ?
                        <button
                            className='btn btn__primary'
                            onClick={connect}>
                            Start
                        </button>
                        :
                        <button
                            className='btn btn__danger'
                            onClick={disconnect}>
                            Stop
                        </button>
                    }
                </div>
            </form>
        </div>
    )
}
