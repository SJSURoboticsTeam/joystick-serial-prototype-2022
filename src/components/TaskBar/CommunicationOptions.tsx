import Wifi from '../../components/Wifi';
import Serial from '../../components/Serial';
import SerialWifi from '../../components/SerialWifi';


export default function ComunicationOptions(ComMode, commands, system){

    

    return (
        <div className='CommuncationOptions'>
            {ComMode === 'mimic' && <SerialWifi setStatus={setStatus} />}
            {ComMode === 'wifi' && <Wifi commands={commands} setStatus={setStatus} />}
            {ComMode === 'serial' && <Serial commands={commands} setStatus={setStatus} system={system} />}
        </div>

    );
}