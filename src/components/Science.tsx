
import { DropdownButtonSelector, FooterButtons } from './Forms/ControlForm';
import { useEffect, useState } from 'react'
import { userInfo } from 'os';
import { DRIVE_MODES } from '../util/constants';

export default function Science({ commands }) {
    const [scienceCommands, setScienceCommands] = useState({
        is_operational: 1,
        step: 0,
        emergency: 0,
        mode: 0
    });


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
                    options={[
                        { label: "Automatic", value: 1 },
                        { label: "Manual", value: 0 }
                    ]}
                    value={scienceCommands.mode}
                    onChange={handleChange}
                />

                <DropdownButtonSelector
                    name='step'
                    label='Step'
                    options={[
                        { label: "Move Revolver", value: 0 },
                        { label: "Seal", value: 1 },
                        { label: "Depressurize", value: 2 },
                        { label: "Inject", value: 3 },
                        { label: "Sensors", value: 4 },
                        { label: "Clear Chamber", value: 5 }

                    ]}
                    value={scienceCommands.step}
                    onChange={handleChange}
                />

                <DropdownButtonSelector
                    name='emergency'
                    label='Is Operational'
                    options={[
                        { label: "True", value: 1 },
                        { label: "False", value: 0 }
                    ]}
                    value={scienceCommands.emergency}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}
