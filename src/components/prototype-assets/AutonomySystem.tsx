import { useState } from 'react';

import {
    DEFAULT_AUTONOMY_COMMANDS,
} from '../../util/constants';

import { autonomyCommandDTO } from '../../util/command-dto';
import { TextSliderInput, FooterButtons } from '../Forms/ControlForm';


export default function MMTSystem({ commands }) {

    const [mmtCommands, setMMTCommands] = useState<autonomyCommandDTO>(DEFAULT_AUTONOMY_COMMANDS);

    function updateCommands(newCommands) {
        setMMTCommands(newCommands);
    }

    function handleChange(e) {
        const newCommands = { ...mmtCommands, [e.target.name]: e.target.value };
        updateCommands(newCommands);
    }

    function resetCommands() {
        updateCommands({
            ...DEFAULT_AUTONOMY_COMMANDS
        });
    }

    return (
        <div>
            <h2>Autonomy System</h2>
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