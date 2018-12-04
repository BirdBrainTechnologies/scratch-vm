const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');

/**
 * Icon png to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMzkyQTc4N0RGQTkxMUU4ODkwRUNCOEFEQzgyNDk0NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMzkyQTc4OERGQTkxMUU4ODkwRUNCOEFEQzgyNDk0NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkIzOTJBNzg1REZBOTExRTg4OTBFQ0I4QURDODI0OTQ3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkIzOTJBNzg2REZBOTExRTg4OTBFQ0I4QURDODI0OTQ3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+7MrtuAAAAwBQTFRFp5VOPEFLWFxkpaesRktUXWJrHlU6NjtDExwmoV9P07MeZ2x07M9P8/Pztba67WIveXuA9t9O/bqaa1oYdciUc3Z8ZGZshIaKNGxOlZabe+KjK5Na////XDYmg+Sox+zUxsfIBlSJsZQQZ7mJ6HlK//9469Y8LlZzGSErpvHCCar3KIm8LDI7U1dcQkZOCLf9foKGtcbH6uvs0/DbCREbiNuoDRchVKR2/JZbZMWNIyQsBAoUD2SXiYyRAipSbHB1W7uERZVoJCkx4ePkCHm3+6ZnNDU8CYPCBEZ3xnVPLWqS3NzdSIlkoKKm//6FOZhkCZjd9YtUTlVibMmTAWOjSKlzmOe2c9GbYsyN9YNLAQILNqRnS1BbJ6z0HCQvjnMJm/a9fteh//Icvb3A/6FdbOOc8pdfqNS6B5vm0tPUE6n1ATlqL5TQvagz7s8dCaPta0dAbtqXKSwznMSp297ijpGWFonG//xcmZufWpp24tLLEhYe8fr0/7ZlqquuELH+BHvCy8vOFJja9PLswNnJ1NbZDXWnJluBF3Ok1LlIikY1+7Z7h/67c7uRK3mqE6Puf8ydoNm2ZYV83cM3ZbCD6YVVB4zVj//NRKNuE3JA9fz4LBYRLzU/DcD/4pNf7e7vzNDVg/Ct/OlgW6l8KS849aZ1YF5i+P36+Pn5R7B14O7j4+Lf5ubou6AUKZ5co7FgvD4ejM2lJCw3ICcxGT0rkdSqoZykUbZ+8e7rr7G1ruLBlopCESoc1dneT5xwHohQUUtOARc65unr+/78X9ONP4ZeBG62Hx4lRkBFABxKAQcj/fr5EI7PEA4UFgcJNC9EMCwxHxktQiUlByRC/v389vb38PDxfZqNlpCBrq6vbW9VbsKQiuGr9/bz//f96/Lq5IZLvsVx/pJSPnZY//n8Xldvdm5vl312WrS4AhAtKT5VEG2j39F02tXU/79+H3u2U45tXId3TpNsR1tvzF4/39SWyemV59ydzc7R0tHOoX8F/vF66qFrScp/AAAA////noR5JwAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAA6OSURBVHja7Fh9fNNmfkeOhAQmwRy1nAQHEhKoDmThow8CLBwFERxTCAlOoCCMgKblCCkNuJimEwVCIdAXSqCBS4oYhaq5Ul7WWlAIHRBKg0PANLzlxqC3rYzeaLe7HbCtRzv1fgojyf7Y57N9PvuTnyU/jx7ZX/1ev7/H7vXT/7P0egz4GPAx4P8a8NqG0dc6kndPSj7weXJy8rVVq1a9u+pdS1a9e+bXlpz59ZkecvXhuyXuM+6H8tPVHoC7PY2EjQ7Zo5mF9jBxe9vy2bOXz15uyfN1T+xJH5xuHXvSS6z5nj3jSxZYQ13egsHps9JLnpm1cMyswUOqouLoLsBMp3s/bg+lXV3hbgrR9m2nGmaeGjSzYWZ9w+zaiXOPHp2bV78v79C+m9kz8/Lmjr9Zt292Xv3y2olHS/L2ldzMO/rM+KPpm/37XVVdgOVp51NCBFGW7C1fYb9N/7Ehtb73ybEN2TNTxxxpOZV98tT4lqIbDRMXbG6oz26YuWBsQ31dw9Gfn2wosq6O9p65r3fewvXuYyldgCvCTsAL+8/4DzThxO3Ul546tH/Ivt/WHnEP3rz5H8cc/+3sjz764vzxhU/83ZDlx7YurP3oyOD9T9ysW/9S+vrNN2/+MnvWS3kLfvOp83o3IBeyE/fCTtdtrxO33e5d90TDS9lFW+e+f2T25rtD9m0ecmjr8UPHn1l48vjxQ0NgGDJr7lPjF0785axDQ0qeyV5fu29IXrr3ktLUBTgVo/3RqirxW7/f6fc6xblftBz64uR/lrQ8v/CVW188P/H5G0VvvT9oz5Fpp94ae2jP1pZTvxo7aM+sllPW4s/vDnrr7qD0Bdu+xHqYjN1zFTrsRIhw2p3229sG3UotujutfuzJk3WfTJxZV59XN7HulaK62rqikrFFdZ/UFW0+WXTjk+yiG69MhKF+zCv1C7f+8Ut2dbeG3zbmTHHeC4fCOI6HuVstvce2pI69Na0u9f3aG3fHlrRkZ98qqWupPVIyzRrG3Ggp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';

const serverURL = 'http://localhost:22179';

const serverConnectionError = function (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
        // eslint-disable-next-line no-alert
        alert('Could not connect to the Birdbrain robot server');
    } else if (error === 'Hummingbird not connected') {
        // eslint-disable-next-line no-alert
        alert('There is no Hummingbird robot connected.');
    }
    return Promise.reject(error);
};

const rejectDisconnected = function (value) {
    return value.text().then(text => {
        if (text === 'Hummingbird not connected') {
            return Promise.reject(text);
        }
        return Promise.resolve(text);
    });
};

const HummingbirdSensors = {
    LIGHT: 'Light',
    DIAL: 'Dial',
    DISTANCE: 'Distance (cm)',
    SOUND: 'Sound',
    TEMPERATURE: 'Temperature',
    VOLTAGE: 'Voltage'
};

/**
 * Scratch 3.0 blocks to interact with a Finch peripheral.
 */
class Scratch3FinchBlocks {

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return 'Birdbrain Hummingbird';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return 'birdbrainHummingbird';
    }

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

    get SENSORS_MENU () {
        return Object.keys(HummingbirdSensors).map(key => ({
            text: HummingbirdSensors[key],
            value: HummingbirdSensors[key]
        }));
    }

    getSensor (args) {
        const sensorType = args.SENSOR;
        const port = args.PORT;
        const sensorPaths = {};
        sensorPaths[HummingbirdSensors.TEMPERATURE] = 'temperature';
        sensorPaths[HummingbirdSensors.DISTANCE] = 'distance';
        sensorPaths[HummingbirdSensors.SOUND] = 'sound';

        const cache = this._sensorCache[sensorType] = this._sensorCache[sensorType] || {};

        if (typeof cache[port] !== 'undefined') {
            return cache[port];
        }
        return fetch(`${serverURL}/hummingbird/in/${sensorPaths[sensorType] || 'sensor'}/${encodeURIComponent(port)}`)
            .then(rejectDisconnected)
            .catch(serverConnectionError)
            .then(JSON.parse)
            .then(value => {
                cache[port] = value;
                setTimeout(() => {
                    delete cache[port];
                }, 100);
                return value;
            });
    }

    setOutput (argParsing, urlFunction) {
        const waitingValue = {};
        const inTransit = {};
        const sendMessage = (port, value) => {
            fetch(urlFunction(port, value)).then(rejectDisconnected)
                .catch(serverConnectionError)
                .catch(error => Promise.resolve(error))
                .then(() => {
                    // This will run regardless of whether the request succeeded or not.
                    delete inTransit[port];
                    if (typeof waitingValue[port] !== 'undefined') {
                        inTransit[port] = waitingValue[port];
                        delete waitingValue[port];
                    }
                    if (typeof inTransit[port] !== 'undefined') {
                        sendMessage(port, inTransit[port]);
                    }
                });
        };
        return args => {
            const port = args.PORT;
            const value = argParsing(args);
            if (typeof inTransit[port] === 'undefined') {
                inTransit[port] = value;
                sendMessage(port, value);
            } else if (inTransit[port] !== value) {
                waitingValue[port] = value;
            } else if (typeof waitingValue[port] !== 'undefined') {
                delete waitingValue[port];
            }
        };
    }

    fSpeak (args) {
        const phrase = args.TEXT;

        fetch(`${serverURL}/speak/${encodeURIComponent(phrase)}`);
    }

    stop () {
        for (let i = 1; i <= 4; i++) {
            this.setLED({PORT: i, INTENSITY: 0});
        }
        for (let i = 1; i <= 2; i++) {
            this.setMotor({PORT: i, SPEED: 0});
            this.setVibration({PORT: i, INTENSITY: 0});
            this.setTriLED({PORT: i, RED: 0, GREEN: 0, BLUE: 0});
        }
    }

    /**
     * Construct a set of Finch blocks.
     */
    constructor () {

        this.setLED = this.setOutput(
            args => args.INTENSITY,
            (port, intensity) => `${serverURL}/hummingbird/out/led/\
                ${encodeURIComponent(port)}/${encodeURIComponent(intensity)}`
        );

        this.setTriLED = this.setOutput(
            args => [args.RED, args.GREEN, args.BLUE],
            (port, values) => `${serverURL}/hummingbird/out/triled/${encodeURIComponent(port)}/\
                ${encodeURIComponent(values[0])}/${encodeURIComponent(values[1])}/${encodeURIComponent(values[2])}`
        );

        this.setServo = this.setOutput(
            args => args.ANGLE,
            (port, angle) => `${serverURL}/hummingbird/out/servo/\
                ${encodeURIComponent(port)}/${encodeURIComponent(angle)}`
        );

        this.setMotor = this.setOutput(
            args => args.SPEED,
            (port, speed) => `${serverURL}/hummingbird/out/motor/\
                ${encodeURIComponent(port)}/${encodeURIComponent(speed)}`
        );

        this.setVibration = this.setOutput(
            args => args.INTENSITY,
            (port, intensity) => `${serverURL}/hummingbird/out/vibration/\
                ${encodeURIComponent(port)}/${encodeURIComponent(intensity)}`
        );

        this._sensorCache = {};
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: Scratch3FinchBlocks.EXTENSION_ID,
            name: Scratch3FinchBlocks.EXTENSION_NAME,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'setLED',
                    text: 'LED [PORT] [INTENSITY]%',
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
                        }
                    }
                },
                {
                    opcode: 'setTriLED',
                    text: 'TriLED [PORT] [RED]% [GREEN]% [BLUE]%',
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
                            defaultValue: 100
                        },
                        BLUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                '---',
                {
                    opcode: 'setServo',
                    text: 'Servo [PORT] [ANGLE]°',
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
                        }
                    }
                },
                {
                    opcode: 'setMotor',
                    text: 'Motor [PORT] [SPEED]%',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1,
                            menu: 'twoPorts'
                        },
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'setVibration',
                    text: 'Vibration [PORT] [INTENSITY]%',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1,
                            menu: 'twoPorts'
                        },
                        INTENSITY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'fSpeak',
                    text: 'Say This [TEXT]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'I am known by many names, but you may call me...Tim.'
                        }
                    }
                },
                '---',
                {
                    opcode: 'getSensor',
                    text: '[SENSOR] [PORT]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        SENSOR: {
                            type: ArgumentType.STRING,
                            defaultValue: HummingbirdSensors.LIGHT,
                            menu: 'sensors'
                        },
                        PORT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1,
                            menu: 'fourPorts'
                        }
                    }
                }
            ],
            menus: {
                fourPorts: this.FOUR_PORTS_MENU,
                twoPorts: this.TWO_PORTS_MENU,
                sensors: this.SENSORS_MENU
            }
        };
    }
}

module.exports = Scratch3FinchBlocks;
