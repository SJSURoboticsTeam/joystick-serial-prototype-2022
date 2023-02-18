import { DEFAULT_ARM_COMMANDS, DEFAULT_DRIVE_COMMANDS } from "../constants";
import { armStringFormat, driveStringFormat } from "../command-formats";
// Is fragile, but it would've been helpful when speed was passed as string...
describe("testing arm and drive string formats", () => {
    it("should return a valid drive command string", () => {
        const expected = `{"HB":0,"IO":1,"WO":0,"DM":"D","CMD":[0,0]}`;
        const actual = driveStringFormat(DEFAULT_DRIVE_COMMANDS);
        expect(actual).toEqual(expected);
    });

    it("should return a valid arm command string", () => {
        const expected = `{"heartbeat_count":0,"is_operational":1,"speed":1,"angles":[0,0,0,0,0,0]}`;
        const actual = armStringFormat(DEFAULT_ARM_COMMANDS);
        expect(actual).toEqual(expected);
    });
});