import { LogLevel } from "./constants";
import fs from 'fs'
import path from 'path'
import { format } from 'util'


/**
 * Logger Class
 * @date 11/10/2022 - 12:34:31 PM
 *
 * @export
 * @class Logger
 * @typedef {Logger}
 */
export default class Logger {
    /**
     * instance placeholder
     * @date 11/10/2022 - 12:34:31 PM
     *
     * @private
     * @static
     * @type {Logger}
     */
    private static instance: Logger;
    /**
     * Creates an instance of Logger.
     * @date 11/10/2022 - 12:34:31 PM
     *
     * @constructor
     * @private
     */
    private constructor() {
        // private constructor to prevent instantiation
     }
    /**
     * Log Instance
     * @date 11/10/2022 - 12:34:31 PM
     *
     * @public
     * @static
     * @returns {Logger}
     */
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * log
     * @date 11/10/2022 - 12:34:31 PM
     *
     * @public
     * @param {LogLevel} level
     * @param {string} message
     * @param {...any[]} args
     */
    public log(level: LogLevel, message: string, ...args: any[]) {
        const logMessage = format(message, ...args);
        const path = '/logs';
        const fileName = `${path}/`;
           

        switch (level) {
            case LogLevel.DEBUG:

                console.debug(logMessage);
                break;
            case LogLevel.INFO:
                console.info(logMessage);
                break;
            case LogLevel.WARN:
                console.warn(logMessage);
                break;
            case LogLevel.ERROR:
                console.error(logMessage);
                break;
            default:
                console.log(logMessage);
                break;
        }
    const file = fs.createWriteStream(fileName, { flags: 'a' });
        file.write(`${level}: ${logMessage}`);
    }
}