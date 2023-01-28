import { useState } from 'react';

import {
    DEFAULT_MMT_COMMANDS,
} from '../util/constants';

import { MMTCommandDTO } from '../util/command-dto';
import { TextSliderInput, FooterButtons } from './Forms/ControlForm';


export default function MMTSystem({}){

    const [mmtCommands, setMMTCommands] = useState<MMTCommandDTO>(DEFAULT_MMT_COMMANDS);

    function updateCommands(newCommands) {
        setMMTCommands(newCommands);
    }

    function handleChange(e) {
        const newCommands = { ...mmtCommands, [e.target.name]: e.target.value };
        updateCommands(newCommands);
    }

    function resetCommands() {
        updateCommands({
            ...DEFAULT_MMT_COMMANDS 
        });
    }

    return(
        <div>
            <h2>MMT System</h2>
            <form onSubmit={(e) => { e.preventDefault() }}>
            <TextSliderInput
                name='angle'
                label='Angle'
                min={-15}
                max={15}
                value={mmtCommands.angle}
                onChange={handleChange}
                
            />
            <FooterButtons onResetClick={resetCommands} />
            </form>
        </div>
    )
}