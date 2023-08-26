export default function CommunicationMode({CurrentCommunication}){

    return(
        <div className="setCommuncationMode">
            <select className='btn btn__primary ' onChange={(choice) => { CurrentCommunication(choice.target.value) }}>
                <option className='btn btn__primary' value={"wifi"}>Wifi</option>
                <option className='btn btn__primary' value={"serial"}>Serial</option>
                <option className='btn btn__primary' value={"mimic"}>Mimic</option>
            </select>
        </div>
    );
}