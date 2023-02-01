import serialParser from '../serial-parser';
import { DEFAULT_ARM_COMMANDS, DEFAULT_DRIVE_COMMANDS, NUMBER_OF_ARM_KEYS, NUMBER_OF_DRIVE_KEYS } from '../constants';
import { armStringFormat, driveStringFormat } from '../command-formats';

describe('testing arm and drive serial parsing', () => {
    it('should return the last valid drive command (default)', () => {
        const expected = JSON.parse(driveStringFormat(DEFAULT_DRIVE_COMMANDS));
        const actual = serialParser(
            `{"HB":0,"IO":0,"WO":0,"DM":"D","CMD":[0,0]}\n` +
            `{"HB":0,"IO":1,"WO":0,"DM":"D","CMD":[0,0]}\n` +
            `{"HB":0,"IO":1,"WO":0,"DM":"D","CMD":[1\n` +
            `{"HB":0,"IO":1,"DM":"D","CMD":[1,1]}\n` +
            `{"HB":0,"IO":1,","CMD":[1,1]}\n` +
            `"DM":"D","CMD":[1,1]}\n` +
            `{"HB":0,"\n`,
            NUMBER_OF_DRIVE_KEYS
        );
        expect(actual).toEqual(expected);
    });

    it('should return the last valid arm command (default)', () => {
        const expected = JSON.parse(armStringFormat(DEFAULT_ARM_COMMANDS));
        const actual = serialParser(
            `{"heartbeat_count":0,"is_operational":0,"speed":1,"angles":[0,0,0,0,0,0]}\n` +
            `{"heartbeat_count":0,"is_operational":1,"speed":1,"angles":[0,0,0,0,0,0]}\n` +
            `{"heartbeat_count":0,"is_operational":1,"speed":1,"angles":[` +
            `{"heartbeat_count":0,"speed":1,"angles":[0,0,0,0,0]}\n` +
            `{"heartbeat_count":0,","angles":[0,0,0,0,0]}\n` +
            `al":1,"speed":1,"angles":[0,0,0,0,0]}\n`,
            NUMBER_OF_ARM_KEYS
        );
        expect(actual).toEqual(expected);
    });
});