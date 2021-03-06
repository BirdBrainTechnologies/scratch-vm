// @ts-check
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');


/**
 * Icon png to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMzkyQTc4N0RGQTkxMUU4ODkwRUNCOEFEQzgyNDk0NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMzkyQTc4OERGQTkxMUU4ODkwRUNCOEFEQzgyNDk0NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkIzOTJBNzg1REZBOTExRTg4OTBFQ0I4QURDODI0OTQ3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkIzOTJBNzg2REZBOTExRTg4OTBFQ0I4QURDODI0OTQ3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+7MrtuAAAAwBQTFRFp5VOPEFLWFxkpaesRktUXWJrHlU6NjtDExwmoV9P07MeZ2x07M9P8/Pztba67WIveXuA9t9O/bqaa1oYdciUc3Z8ZGZshIaKNGxOlZabe+KjK5Na////XDYmg+Sox+zUxsfIBlSJsZQQZ7mJ6HlK//9469Y8LlZzGSErpvHCCar3KIm8LDI7U1dcQkZOCLf9foKGtcbH6uvs0/DbCREbiNuoDRchVKR2/JZbZMWNIyQsBAoUD2SXiYyRAipSbHB1W7uERZVoJCkx4ePkCHm3+6ZnNDU8CYPCBEZ3xnVPLWqS3NzdSIlkoKKm//6FOZhkCZjd9YtUTlVibMmTAWOjSKlzmOe2c9GbYsyN9YNLAQILNqRnS1BbJ6z0HCQvjnMJm/a9fteh//Icvb3A/6FdbOOc8pdfqNS6B5vm0tPUE6n1ATlqL5TQvagz7s8dCaPta0dAbtqXKSwznMSp297ijpGWFonG//xcmZufWpp24tLLEhYe8fr0/7ZlqquuELH+BHvCy8vOFJja9PLswNnJ1NbZDXWnJluBF3Ok1LlIikY1+7Z7h/67c7uRK3mqE6Puf8ydoNm2ZYV83cM3ZbCD6YVVB4zVj//NRKNuE3JA9fz4LBYRLzU/DcD/4pNf7e7vzNDVg/Ct/OlgW6l8KS849aZ1YF5i+P36+Pn5R7B14O7j4+Lf5ubou6AUKZ5co7FgvD4ejM2lJCw3ICcxGT0rkdSqoZykUbZ+8e7rr7G1ruLBlopCESoc1dneT5xwHohQUUtOARc65unr+/78X9ONP4ZeBG62Hx4lRkBFABxKAQcj/fr5EI7PEA4UFgcJNC9EMCwxHxktQiUlByRC/v389vb38PDxfZqNlpCBrq6vbW9VbsKQiuGr9/bz//f96/Lq5IZLvsVx/pJSPnZY//n8Xldvdm5vl312WrS4AhAtKT5VEG2j39F02tXU/79+H3u2U45tXId3TpNsR1tvzF4/39SWyemV59ydzc7R0tHOoX8F/vF66qFrScp/AAAA////noR5JwAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAA6OSURBVHja7Fh9fNNmfkeOhAQmwRy1nAQHEhKoDmThow8CLBwFERxTCAlOoCCMgKblCCkNuJimEwVCIdAXSqCBS4oYhaq5Ul7WWlAIHRBKg0PANLzlxqC3rYzeaLe7HbCtRzv1fgojyf7Y57N9PvuTnyU/jx7ZX/1ev7/H7vXT/7P0egz4GPAx4P8a8NqG0dc6kndPSj7weXJy8rVVq1a9u+pdS1a9e+bXlpz59ZkecvXhuyXuM+6H8tPVHoC7PY2EjQ7Zo5mF9jBxe9vy2bOXz15uyfN1T+xJH5xuHXvSS6z5nj3jSxZYQ13egsHps9JLnpm1cMyswUOqouLoLsBMp3s/bg+lXV3hbgrR9m2nGmaeGjSzYWZ9w+zaiXOPHp2bV78v79C+m9kz8/Lmjr9Zt292Xv3y2olHS/L2ldzMO/rM+KPpm/37XVVdgOVp51NCBFGW7C1fYb9N/7Ehtb73ybEN2TNTxxxpOZV98tT4lqIbDRMXbG6oz26YuWBsQ31dw9Gfn2wosq6O9p65r3fewvXuYyldgCvCTsAL+8/4DzThxO3Ul546tH/Ivt/WHnEP3rz5H8cc/+3sjz764vzxhU/83ZDlx7YurP3oyOD9T9ysW/9S+vrNN2/+MnvWS3kLfvOp83o3IBeyE/fCTtdtrxO33e5d90TDS9lFW+e+f2T25rtD9m0ecmjr8UPHn1l48vjxQ0NgGDJr7lPjF0785axDQ0qeyV5fu29IXrr3ktLUBTgVo/3RqirxW7/f6fc6xblftBz64uR/lrQ8v/CVW188P/H5G0VvvT9oz5Fpp94ae2jP1pZTvxo7aM+sllPW4s/vDnrr7qD0Bdu+xHqYjN1zFTrsRIhw2p3229sG3UotujutfuzJk3WfTJxZV59XN7HulaK62rqikrFFdZ/UFW0+WXTjk+yiG69MhKF+zCv1C7f+8Ut2dbeG3zbmTHHeC4fCOI6HuVstvce2pI69Na0u9f3aG3fHlrRkZ98qqWupPVIyzRrG3Ggp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';

const serverURL = 'http://localhost:30061';

/**
 * @param {string|Error} error Some error from a fetch to the server
 * @returns {Promise.<string|Error>} The error passed in
 */
const serverConnectionError = function (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
        // eslint-disable-next-line no-alert
        alert('Could not connect to the Bluebird Microbit Connector');
    } else if (error === 'Hummingbird not connected') {
        // eslint-disable-next-line no-alert
        alert('There is no Hummingbird robot connected.');
    }
    return Promise.reject(error);
};

/**
 * @param {Response} value Response from a fetch command to the server
 * @returns {Promise.<string>} The text from the response
 */
const rejectDisconnected = function (value) {
    return value.text().then(text => {
        if (text === 'Hummingbird not connected') {
            return Promise.reject(text);
        }
        return Promise.resolve(text);
    });
};

/**
 * @readonly
 * @enum {string}
 */
const HummingbirdSensors = {
    LIGHT: 'Light',
    DIAL: 'Dial',
    DISTANCE: 'Distance (cm)',
    SOUND: 'Sound',
    VOLTAGE: 'Voltage'
};

/**
 * @readonly
 * @enum {string}
 */
const MicrobitAxisSensors = {
    ACCELEROMETER: 'Accelerometer',
    MAGNETOMETER: 'Magnetometer'
};

/**
 * @readonly
 * @enum {string}
 */
const Axes = {
    X: 'X',
    Y: 'Y',
    Z: 'Z'
};

/**
 * @readonly
 * @enum {string}
 */
const DeviceIds = {
    A: 'A',
    B: 'B',
    C: 'C'
};

/**
 * @readonly
 * @enum {string}
 */
const MicrobitButtons = {
    A: 'A',
    B: 'B'
};

/**
 * @readonly
 * @enum {string}
 */
const MicrobitAccelerometerStates = {
    SCREEN_UP: 'Screen Up',
    SCREEN_DOWN: 'Screen Down',
    TILT_LEFT: 'Tilt Left',
    TILT_RIGHT: 'Tilt Right',
    LOGO_UP: 'Logo Up',
    LOGO_DOWN: 'Logo Down',
    SHAKE: 'Shake'
};

/**
 * @typedef {object} MenuItem
 * @property {string} text
 * @property {*} value
 */

/**
 * @param {object} enumeration an enumeration to turn into an array
 * @returns {MenuItem[]} an array of menu items
 */
const enumToMenu = function (enumeration) {
    return Object.keys(enumeration).map(key => enumeration[key])
        .map(value => ({
            text: value,
            value: value
        }));
};

/**
 * Scratch 3.0 blocks to interact with a Finch peripheral.
 */
class Scratch3FinchBlocks {

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return 'Birdbrain Hummingbird Bit';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return 'birdbrainHummingbirdBit';
    }

    /** @returns {MenuItem[]} a menu of four ports */
    get FOUR_PORTS_MENU () {
        return [
            {
                text: '1',
                value: 1
            },
            {
                text: '2',
                value: 2
            },
            {
                text: '3',
                value: 3
            },
            {
                text: '4',
                value: 4
            }
        ];
    }

    get THREE_PORTS_MENU () {
        return [
            {
                text: '1',
                value: 1
            },
            {
                text: '2',
                value: 2
            },
            {
                text: '3',
                value: 3
            }
        ];
    }

    get TWO_PORTS_MENU () {
        return [
            {
                text: '1',
                value: 1
            },
            {
                text: '2',
                value: 2
            }
        ];
    }

    get HUMMINGBIRD_SENSORS_MENU () {
        return enumToMenu(HummingbirdSensors);
    }

    get MICROBIT_AXIS_SENSORS_MENU () {
        return enumToMenu(MicrobitAxisSensors);
    }

    get AXES_MENU () {
        return enumToMenu(Axes);
    }

    get MICROBIT_BUTTONS_MENU () {
        return enumToMenu(MicrobitButtons);
    }

    get MICROBIT_ACCELEROMETER_STATES_MENU () {
        return enumToMenu(MicrobitAccelerometerStates);
    }
    
    get DEVICE_IDS_MENU () {
        return enumToMenu(DeviceIds);
    }

    getSensor (URI) {
        if (typeof this._sensorCache[URI] !== 'undefined') {
            return this._sensorCache[URI];
        }

        return fetch(URI)
            .then(rejectDisconnected)
            .catch(serverConnectionError)
            .then(JSON.parse)
            .then(value => {
                this._sensorCache[URI] = value;
                setTimeout(() => {
                    delete this._sensorCache[URI];
                }, 200);
                return value;
            });
    }

    /**
     * @param {object} args Arguments passed by the scratch block
     * @param {string} [args.DEVICE='A'] Which device to read from
     * @param {number} args.PORT what sensor port to read from
     * @param {string} args.SENSOR what type of sensor to read from
     * @returns {number|Promise.<number>} The sensor value
     */
    getHummingbirdSensor (args) {
        const device = args.DEVICE || 'A';
        const sensorType = args.SENSOR === HummingbirdSensors.DISTANCE ? 'distance' : args.SENSOR.toLowerCase();
        const port = args.PORT;

        return this.getSensor(`${serverURL}/hummingbird/in/${encodeURIComponent(sensorType)}` +
        `/${port}/${encodeURIComponent(device)}`);
    }

    /**
     * @param {function(object): any} argParsing Function to turn the args object from the scratch block call into a
     * sensible format to cache
     * @param {function(string, (number|undefined), any): string} urlFunction Function to take the device, port, and
     * values and turn them into a URL
     * @returns {function(object): void} A function to set some output on the Hummingbird bit.
     */
    setOutput (argParsing, urlFunction) {
        const waitingValue = {};
        const inTransit = {};
        const sendMessage = (device, port, value) => {
            fetch(`${urlFunction(device, port, value)}`).then(rejectDisconnected)
                .catch(serverConnectionError)
                .catch(error => Promise.resolve(error))
                .then(() => {
                    // This will run regardless of whether the request succeeded or not.
                    delete inTransit[device][port];
                    if (typeof waitingValue[device][port] !== 'undefined') {
                        inTransit[device][port] = waitingValue[device][port];
                        delete waitingValue[device][port];
                    }
                    if (typeof inTransit[device][port] !== 'undefined') {
                        sendMessage(device, port, inTransit[device][port]);
                    }
                });
        };
        return args => {
            const port = args.PORT;
            const value = argParsing(args);
            const device = args.DEVICE || 'A';
            inTransit[device] = inTransit[device] || {};
            waitingValue[device] = waitingValue[device] || {};

            if (typeof inTransit[device][port] === 'undefined') {
                inTransit[port] = value;
                sendMessage(device, port, value);
            } else if (inTransit[device][port] !== value) {
                waitingValue[device][port] = value;
            } else if (typeof waitingValue[device][port] !== 'undefined') {
                delete waitingValue[device][port];
            }
        };
    }

    fSpeak (args) {
        const phrase = args.TEXT;

        fetch(`${serverURL}/speak/${encodeURIComponent(phrase)}`);
    }

    /**
     * @param {object} args args passed in by the scratch block
     * @param {string} [args.DEVICE='A'] Which device to send the command to
     * @param {number} args.PORT Which LED port to set
     * @param {string} args.COLOR The color to set to as a number in 0xRRGGBB format
     */
    setTriLEDPicker (args) {
        const color = parseInt(args.COLOR.substr(1), 16);

        this.setTriLED({
            DEVICE: args.DEVICE,
            PORT: args.PORT,
            RED: (color >> 16) & 0xFF,
            GREEN: (color >> 8) & 0xFF,
            BLUE: (color >> 0) & 0xFF
        });
    }

    /**
     * @param {object} args args passed in by the scratch block
     * @param {string} [args.DEVICE='A'] Which device to send the text to
     * @param {string} args.TEXT Text to display on the Micro:bit
     */
    displayText (args) {
        const device = args.DEVICE || 'A';
        const message = args.TEXT;

        fetch(`${serverURL}/hummingbird/out/print/${encodeURIComponent(message)}/${encodeURIComponent(device)}`)
            .then(rejectDisconnected)
            .catch(serverConnectionError);
    }

    /**
     * @param {object} args args passed in by the scratch block
     * @param {string} [args.DEVICE='A'] Which micro:bit to have play the note
     * @param {number} args.NOTE What note to play on the micro:bit, where 60 is middle C and each halfstep down or up
     * is one less or one more
     * @param {number} args.BEATS How many beats to play a note for
     */
    playNote (args) {
        const tempo = 60;
        const note = args.NOTE;
        const beats = args.BEATS;
        const device = args.DEVICE || 'A';

        const ms = Math.round(60000 / tempo * beats);

        fetch(`${serverURL}/hummingbird/out/playnote/${note}/${ms}/${device}`).then(rejectDisconnected)
            .catch(serverConnectionError);
    }

    getBitAxisSensor (args) {
        const device = args.DEVICE || 'A';
        const sensor = args.SENSOR;
        const axis = args.AXIS;

        const URIs = {};
        URIs[MicrobitAxisSensors.ACCELEROMETER] = 'Accelerometer m/s²';
        URIs[MicrobitAxisSensors.MAGNETOMETER] = 'Magnetometer µT';

        return this.getSensor(`${serverURL}/hummingbird/in/${URIs[sensor]}/${axis}/${device}`);
    }

    getButton (args) {
        const device = args.DEVICE || 'A';
        const button = args.BUTTON;

        return this.getSensor(`${serverURL}/hummingbird/in/button/` +
            `${encodeURIComponent(button)}/${encodeURIComponent(device)}`);
    }

    getMicrobitTilted (args) {
        const device = args.DEVICE || 'A';
        const angle = args.ORIENTATION;

        return this.getSensor(`${serverURL}/hummingbird/in/orientation/` +
            `${encodeURIComponent(angle)}/${encodeURIComponent(device)}`);
    }

    getCompass (args) {
        const device = args.DEVICE || 'A';

        return this.getSensor(`${serverURL}/hummingbird/in/Compass/${encodeURIComponent(device)}`);
    }

    /**
     * Construct a set of Finch blocks.
     */
    constructor () {
        this.setLED = this.setOutput(
            args => args.INTENSITY,
            (device, port, intensity) => `${serverURL}/hummingbird/out/led/` +
                `${port}/${encodeURIComponent(intensity)}/${encodeURIComponent(device)}`
        );

        this.setTriLED = this.setOutput(
            args => [args.RED, args.GREEN, args.BLUE],
            (device, port, values) => `${serverURL}/hummingbird/out/triled/${port}/` +
                `${encodeURIComponent(values[0])}/${encodeURIComponent(values[1])}/` +
                `${encodeURIComponent(values[2])}/${encodeURIComponent(device)}`
        );

        this.setServoPosition = this.setOutput(
            args => args.ANGLE,
            (device, port, angle) => `${serverURL}/hummingbird/out/servo/` +
                `${port}/${encodeURIComponent(angle)}/${encodeURIComponent(device)}`
        );

        this.setServoRotation = this.setOutput(
            args => args.SPEED,
            (device, port, speed) => `${serverURL}/hummingbird/out/rotation/` +
                `${port}/${encodeURIComponent(speed)}/${encodeURIComponent(device)}`
        );

        this.setVibration = this.setOutput(
            args => args.INTENSITY,
            (device, port, intensity) => `${serverURL}/hummingbird/out/vibration/` +
                `${port}/${encodeURIComponent(intensity)}/${encodeURIComponent(device)}`
        );

        this.displaySymbol = this.setOutput(
            args => args.MATRIX,
            (device, _port, pixels) => {
                let URI = `${serverURL}/hummingbird/out/symbol/${encodeURIComponent(device)}`;
                pixels.split('').forEach(character => {
                    URI += `/${character === '1'}`;
                });

                return URI;
            }
        );

        /**
         * @type {Object}
         * @private
         */
        this._sensorCache = {};
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        const device = [' [DEVICE]', ''][Math.floor(Math.random() * 2)];
        return {
            id: Scratch3FinchBlocks.EXTENSION_ID,
            name: Scratch3FinchBlocks.EXTENSION_NAME,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'setLED',
                    text: `LED${device} [PORT] [INTENSITY]%`,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'fourPorts',
                            defaultValue: '1'
                        },
                        INTENSITY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        },
                        DEVICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A',
                            menu: 'deviceIDs'
                        }
                    }
                },
                {
                    opcode: 'setTriLED',
                    text: `TriLED${device} [PORT] [RED]% [GREEN]% [BLUE]%`,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'twoPorts',
                            defaultValue: 1
                        },
                        RED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        GREEN: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        BLUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        DEVICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A',
                            menu: 'deviceIDs'
                        }
                    }
                },
                {
                    opcode: 'setTriLEDPicker',
                    text: `TriLED${device} [PORT] [COLOR]`,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'twoPorts',
                            defaultValue: 1
                        },
                        COLOR: {
                            type: ArgumentType.COLOR
                        },
                        DEVICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A',
                            menu: 'deviceIDs'
                        }
                    }
                },
                {
                    opcode: 'displaySymbol',
                    text: formatMessage({
                        id: 'hummingbirdbit.displaySymbol',
                        default: 'Display [MATRIX]',
                        description: 'Display a pattern on the micro:bit display'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MATRIX: {
                            type: ArgumentType.MATRIX,
                            defaultValue: '1010110100111011010110101'
                        },
                        DEVICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A',
                            menu: 'deviceIDs'
                        }
                    }
                },
                {
                    opcode: 'displayText',
                    text: formatMessage({
                        id: 'hummingbirdbit.displayText',
                        default: 'Print [TEXT]',
                        description: 'display text on the micro:bit display'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'hummingbirdbit.defaultTextToDisplay',
                                default: 'Hi!',
                                description: `default text to display.
                                IMPORTANT - the micro:bit only supports letters a-z, A-Z.
                                Please substitute a default word in your language
                                that can be written with those characters,
                                substitute non-accented characters or leave it as "Hello!".
                                Check the micro:bit site documentation for details`
                            })
                        },
                        DEVICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A',
                            menu: 'deviceIDs'
                        }
                    }
                },
                '---',
                {
                    opcode: 'setServoPosition',
                    text: `Position Servo${device} [PORT] [ANGLE]°`,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1,
                            menu: 'fourPorts'
                        },
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        DEVICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A',
                            menu: 'deviceIDs'
                        }
                    }
                },
                {
                    opcode: 'setServoRotation',
                    text: `Rotation Servo${device} [PORT] [SPEED]%`,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1,
                            menu: 'fourPorts'
                        },
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        DEVICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A',
                            menu: 'deviceIDs'
                        }
                    }
                },
                '---',
                {
                    opcode: 'playNote',
                    text: `Play${device} Note [NOTE] for [BEATS] beats`,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NOTE: {
                            type: ArgumentType.NOTE,
                            defaultValue: 60
                        },
                        BEATS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        DEVICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A',
                            menu: 'deviceIDs'
                        }
                    }
                },
                '---',
                {
                    opcode: 'getHummingbirdSensor',
                    text: `${`${device} `.trimLeft()}[SENSOR] [PORT]`,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        SENSOR: {
                            type: ArgumentType.STRING,
                            defaultValue: HummingbirdSensors.LIGHT,
                            menu: 'hummingbirdSensors'
                        },
                        PORT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1,
                            menu: 'fourPorts'
                        },
                        DEVICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A',
                            menu: 'deviceIDs'
                        }
                    }
                },
                {
                    opcode: 'getBitAxisSensor',
                    text: `${`${device} `.trimLeft()}[SENSOR] [AXIS]`,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        SENSOR: {
                            type: ArgumentType.STRING,
                            defaultValue: MicrobitAxisSensors.ACCELEROMETER,
                            menu: 'microbitAxisSensors'
                        },
                        AXIS: {
                            type: ArgumentType.STRING,
                            defaultValue: 'X',
                            menu: 'axes'
                        },
                        DEVICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A',
                            menu: 'deviceIDs'
                        }
                    }
                },
                {
                    opcode: 'getButton',
                    text: `Button${device} [BUTTON]`,
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        BUTTON: {
                            type: ArgumentType.STRING,
                            defaultValue: MicrobitButtons.A,
                            menu: 'microbitButtons'
                        },
                        DEVICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A',
                            menu: 'deviceIDs'
                        }
                    }
                },
                {
                    opcode: 'getMicrobitTilted',
                    text: `${`${device} `.trimLeft()}[ORIENTATION]`,
                    arguments: {
                        ORIENTATION: {
                            type: ArgumentType.STRING,
                            defaultValue: MicrobitAccelerometerStates.SCREEN_UP,
                            menu: 'microbitAccelerometerStates'
                        },
                        DEVICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A',
                            menu: 'deviceIDs'
                        }
                    }
                },
                {
                    opcode: 'getCompass',
                    text: `Compass${device}`,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        DEVICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A',
                            menu: 'deviceIDs'
                        }
                    }
                }
            ],
            menus: {
                fourPorts: this.FOUR_PORTS_MENU,
                threePorts: this.THREE_PORTS_MENU,
                twoPorts: this.TWO_PORTS_MENU,
                hummingbirdSensors: this.HUMMINGBIRD_SENSORS_MENU,
                microbitAxisSensors: this.MICROBIT_AXIS_SENSORS_MENU,
                microbitButtons: this.MICROBIT_BUTTONS_MENU,
                microbitAccelerometerStates: this.MICROBIT_ACCELEROMETER_STATES_MENU,
                axes: this.AXES_MENU,
                deviceIDs: this.DEVICE_IDS_MENU
            }
        };
    }
}

module.exports = Scratch3FinchBlocks;
