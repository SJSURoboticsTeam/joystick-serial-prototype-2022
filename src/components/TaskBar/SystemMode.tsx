export default function SystemMode({CurrentSystem}){

    return(
        <div className="SetSystem">
            <select className='btn btn__primary ' onChange={(choice) => CurrentSystem(choice.target.value)}>
                <option className='btn btn__primary' value={"drive"}>Drive System</option>
                <option className='btn btn__primary' value={"arm"}>Arm System</option>
                <option className='btn btn__primary' value={"autonomy"}>Autonomy System</option>
                <option className='btn btn__primary' value={"science"}>Science System</option>
                <option className='btn btn__primary' value={"operational view"}>Operational View</option>
            </select>
        </div>
    );
}