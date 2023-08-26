import ArmSystem from '../../components/ArmSystem';
import DriveSystem from '../../components/DriveSystem';
import ScienceSystem from '../../components/ScienceSystem';
import AutonomySystem from '../../components/AutonomySystem';

export default function ControlSystem (commands, system){
    return(
        <div className='control_system'>
            {system === 'arm' && <ArmSystem commands={commands} />}
            {system === 'drive' && <DriveSystem commands={commands} />}
            {system === 'autonomy' && <AutonomySystem commands={commands} />}
            {system === 'science' && <ScienceSystem commands={commands} />}
        </div>
    );
}