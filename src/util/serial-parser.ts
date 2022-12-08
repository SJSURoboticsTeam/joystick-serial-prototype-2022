import { ArmCommandDTO, DriveCommandDTO } from "./command-dto";

export default function serialParser(rawString: string, numberOfKeys: number): DriveCommandDTO | ArmCommandDTO | null {
    const commandList = rawString.split("\n").filter((command) => {
        try {
            return (Object.keys(JSON.parse(command)).length === numberOfKeys);
        } catch (e) {
            return false;
        }
    });
    return (commandList.length > 0) ? JSON.parse(commandList[commandList.length - 1]) : null;
}