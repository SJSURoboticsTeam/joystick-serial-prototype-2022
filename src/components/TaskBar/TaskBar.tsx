import {useState} from "react"
import Wifi from '../../components/Wifi';
import Serial from '../../components/Serial';
import SerialWifi from '../../components/SerialWifi';
import SetSystem from "./SystemMode";
import CommunicationMode from "./CommuncationMode";
import SystemMode from "./SystemMode";
import ComunicationOptions from "./CommunicationOptions";

export default function TaskBar(commands, status){
    const [communicationMode, setCommunicationMode] = useState('wifi');
    const [system, setSystem] = useState('drive');
    

    return (
        <div className="taskbar">
            <SystemMode CurrentSystem={setSystem}/>
            <CommunicationMode CurrentCommunication = {setCommunicationMode}/>
            //Communcation inputs
            <ComunicationOptions comMode={communicationMode} commands={commands} system = {system}/>
        </div>
    );
}