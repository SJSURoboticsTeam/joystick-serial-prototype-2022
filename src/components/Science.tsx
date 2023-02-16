
import { DropdownButtonSelector } from './Forms/ControlForm';
import { useEffect, useState } from 'react'

export default function Science({ commands }) {
    const [scienceCommands, setScienceCommands] = useState({
        is_operational: 1,
        state_step: 0,
        mode: 'A'
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
                        { label: "Automatic", value: 'A' },
                        { label: "Manual", value: 'M' }
                    ]}
                    value={scienceCommands.mode}
                    onChange={handleChange}
                />

                <DropdownButtonSelector
                    name='state_step'
                    label='State Step'
                    options={[
                        { label: "Move Revolver", value: 0 },
                        { label: "Seal", value: 1 },
                        { label: "Depressurize", value: 2 },
                        { label: "Inject", value: 3 },
                        { label: "Clear Chamber", value: 4 },
                        { label: "Unseal", value: 5 }
                    ]}
                    value={scienceCommands.state_step}
                    onChange={handleChange}
                />

                <DropdownButtonSelector
                    name='is_operational'
                    label='Is Operational'
                    options={[
                        { label: "True", value: 1 },
                        { label: "False", value: 0 }
                    ]}
                    value={scienceCommands.is_operational}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}
