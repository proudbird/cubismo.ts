var MessageType;
(function (MessageType) {
    MessageType["WARN"] = " WARN";
    MessageType["INFO"] = " INFO";
    MessageType["ERROR"] = "ERROR";
    MessageType["FATAL"] = "FATAL";
    MessageType["DEBUG"] = "DEBUG";
})(MessageType || (MessageType = {}));
var MessageFormat;
(function (MessageFormat) {
    MessageFormat["Reset"] = "\u001B[0m";
    MessageFormat["Bright"] = "\u001B[1m";
    MessageFormat["Dim"] = "\u001B[2m";
    MessageFormat["Underscore"] = "\u001B[4m";
    MessageFormat["Blink"] = "\u001B[5m";
    MessageFormat["Reverse"] = "\u001B[7m";
    MessageFormat["Hidden"] = "\u001B[8m";
    MessageFormat["FgBlack"] = "\u001B[30m";
    MessageFormat["FgRed"] = "\u001B[31m";
    MessageFormat["FgGreen"] = "\u001B[32m";
    MessageFormat["FgYellow"] = "\u001B[33m";
    MessageFormat["FgBlue"] = "\u001B[34m";
    MessageFormat["FgMagenta"] = "\u001B[35m";
    MessageFormat["FgCyan"] = "\u001B[36m";
    MessageFormat["FgWhite"] = "\u001B[37m";
    MessageFormat["BgBlack"] = "\u001B[40m";
    MessageFormat["BgRed"] = "\u001B[41m";
    MessageFormat["BgGreen"] = "\u001B[42m";
    MessageFormat["BgYellow"] = "\u001B[43m";
    MessageFormat["BgBlue"] = "\u001B[44m";
    MessageFormat["BgMagenta"] = "\u001B[45m";
    MessageFormat["BgCyan"] = "\u001B[46m";
    MessageFormat["BgWhite"] = "\u001B[47m";
})(MessageFormat || (MessageFormat = {}));
function log(type, format, message, error) {
    const log = [];
    const timestamp = new Date().toLocaleString();
    log.push("[" + timestamp);
    log.push(type + "]");
    log.push(message);
    if (error) {
        const stack = error.stack || error;
        log.push("\n> " + stack);
    }
    ;
    console.log(format + log.join(" ") + MessageFormat.Reset);
}
/**
 * Provides an API for logging labeled messages to console
 * @global
 */
class Logger {
    /**
     * Prints a message to console with label "WARN"
     *
     * @param {string} message - a text to be displaied
     * @static
     */
    static warn(message) {
        log(MessageType.WARN, MessageFormat.FgMagenta + MessageFormat.Bright, message);
    }
    /**
     * Prints a message to console with label "INFO"
     *
     * @param {string} message - a text to be displayed
     * @static
     */
    static info(message) {
        log(MessageType.INFO, MessageFormat.FgWhite, message);
    }
    /**
     * Prints a message to console with label "DEBUG"
     *
     * @param {string} message - a text to be displayed
     * @static
     */
    static debug(message) {
        // TODO: to implement displaying message only if flag DEBUF is provided
        log(MessageType.DEBUG, MessageFormat.FgYellow, message);
    }
    /**Prints a message to console with label "ERROR"
     *
     * @param {string} message - a text to be displayed
     * @param {Error | object} [error] - an instance of Error, or an object representing an error. If it is provided
     * an error information will be additionaly displaied
     * @static
     */
    static error(message, error) {
        log(MessageType.ERROR, MessageFormat.FgRed + MessageFormat.Bright, message, error);
    }
    /**Prints a message to console with label "FATAL"
     *
     * @param {string} message - a text to be displayed
     * @param {Error | object} [error] - an instance of Error, or an object representing an error. If it is provided
     * an error information will be additionaly displaied
     * @static
     */
    static fatal(message, error) {
        log(MessageType.FATAL, MessageFormat.FgRed + MessageFormat.Bright + MessageFormat.BgYellow, message, error);
    }
}
global["Logger"] = Logger;
//# sourceMappingURL=Logger.js.map