const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Runtime = require('../../engine/runtime');

/**
 * Icon png to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,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';

const serverURL = 'http://localhost:22179';

const constrainValue = function (min, value, max) {
    return Math.max(min, Math.min(value, max));
};

const serverConnectionError = function (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
        // eslint-disable-next-line no-alert
        alert('Could not connect to the Birdbrain robot server');
    } else if (error === 'Finch not connected') {
        // eslint-disable-next-line no-alert
        alert('There is no Finch robot connected.');
    }
    return Promise.reject(error);
};

const rejectDisconnected = function (value) {
    return value.text().then(text => {
        if (text === 'Finch not connected') {
            return Promise.reject(text);
        }
        return Promise.resolve(text);
    });
};

const getSensor = function (urlComponent) {
    let cache = null;
    return () => {
        if (cache !== null) {
            return cache;
        }
        return fetch(`${serverURL}${urlComponent}`).then(rejectDisconnected)
            .catch(serverConnectionError)
            .then(JSON.parse)
            .then(value => {
                cache = value;
                setTimeout(() => {
                    cache = null;
                }, 100);
                return value;
            });
    };
};

const FinchSides = {
    LEFT: 'Left',
    RIGHT: 'Right'
};

const FinchAxes = {
    X: 'x',
    Y: 'y',
    Z: 'z'
};

const invalidDropdown = function () {
    return; // Do nothing
};

/**
 * Scratch 3.0 blocks to interact with a Finch peripheral.
 */
class Scratch3FinchBlocks {

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return 'Birdbrain Finch';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return 'birdbrainFinch';
    }

    get SIDES_MENU () {
        return [
            {
                text: 'left',
                value: FinchSides.LEFT
            },
            {
                text: 'right',
                value: FinchSides.RIGHT
            }
        ];
    }

    getObstacle (args) {
        switch (args.SIDE) {
        case FinchSides.LEFT:
            return this.getLeftObstacle();
        case FinchSides.RIGHT:
            return this.getRightObstacle();
        default:
            return invalidDropdown(args.SIDE);
        }
    }

    getLight (args) {
        switch (args.SIDE) {
        case FinchSides.LEFT:
            return this.getLeftLight();
        case FinchSides.RIGHT:
            return this.getRightLight();
        default:
            return invalidDropdown(args.SIDE);
        }
    }

    getAcceleration (args) {
        switch (args.AXIS) {
        case FinchAxes.X:
            return this.getXAcceleration();
        case FinchAxes.Y:
            return this.getYAcceleration();
        case FinchAxes.Z:
            return this.getZAcceleration();
        default:
            return invalidDropdown(args.SIDE);
        }
    }

    get AXES_MENU () {
        return [
            {
                text: 'X',
                value: FinchAxes.X
            },
            {
                text: 'Y',
                value: FinchAxes.Y
            },
            {
                text: 'Z',
                value: FinchAxes.Z
            }
        ];
    }

    setOutput (argParsing, urlFunction) {
        let waitingValue = null;
        let inTransit = null;
        const sendMessage = value => {
            fetch(urlFunction(value)).then(rejectDisconnected)
                .catch(serverConnectionError)
                .catch(error => Promise.resolve(error))
                .then(() => {
                    // This will run regardless of whether the request succeeded or not.
                    inTransit = waitingValue;
                    waitingValue = null;
                    if (inTransit !== null) {
                        sendMessage(inTransit);
                    }
                });
        };
        return args => {
            const value = argParsing(args);
            if (inTransit === null) {
                inTransit = value;
                sendMessage(value);
            } else if (inTransit !== value) {
                waitingValue = value;
            } else if (waitingValue !== null) {
                waitingValue = null;
            }
        };
    }

    stop () {
        this.stopFinch();
        this.setLED({RED: 0, GREEN: 0, BLUE: 0});
    }

    fSpeak (args) {
        const phrase = args.TEXT;

        fetch(`${serverURL}/speak/${encodeURIComponent(phrase)}`);
    }

    stopFinch () {
        return this.setFinchMotor({LEFT: 0, RIGHT: 0});
    }

    // calculates the orientation of the finch
    getOrientation () {

        if (this._orientation !== null) {
            return this._orientation;
        }

        const accelerationPromises = [
            Promise.resolve(this.getXAcceleration()),
            Promise.resolve(this.getYAcceleration()),
            Promise.resolve(this.getZAcceleration())
        ];

        const self = this;
        return Promise.all(accelerationPromises).then(acceleration => {
            self._orientation = (() => {
                if (acceleration[0] > -0.5 && acceleration[0] < 0.5) {
                    if (acceleration[1] < 0.5 && acceleration[1] > -0.5) {
                        if (acceleration[2] > 0.65 && acceleration[2] < 1.5) {
                            return 'level';
                        } else if (acceleration[2] > -1.5 && acceleration[2] < -0.65) {
                            return 'upside down';
                        }
                    } else if (acceleration[2] > -0.5 && acceleration[2] < 0.5) {
                        if (acceleration[1] > 0.7 && acceleration[1] < 1.5) {
                            return 'left wing down';
                        } else if (acceleration[1] > -1.5 && acceleration[1] < -0.7) {
                            return 'right wing down';
                        }
                    }
                } else if (acceleration[1] > -0.3 && acceleration[1] < 0.3 &&
                    acceleration[2] > -0.3 && acceleration[2] < 0.3) {
                    if (acceleration[0] < 1.5 && acceleration[0] > 0.8) {
                        return 'beak down';
                    } else if (acceleration[0] < -0.8 && acceleration[0] > -1.5) {
                        return 'beak up';
                    }
                }
                return 'in between';
            })();

            setTimeout(() => {
                self._orientation = null;
            }, 300);

            return self._orientation;
        });
        
    }

    /**
     * Construct a set of Finch blocks.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor (runtime) {

        runtime.on(Runtime.PROJECT_STOP_ALL, this.stop);

        this.setFinchMotor = this.setOutput(
            args => [args.LEFT, args.RIGHT],
            speeds => `${serverURL}/finch/out/motor/${encodeURIComponent(speeds[0])}/${encodeURIComponent(speeds[1])}`
        );

        this.setBuzzer = this.setOutput(
            args => ({
                freq: constrainValue(0, Math.round(args.HERTZ), 0xFFFF),
                time: constrainValue(0, Math.round(args.MS), 0xFFFF)
            }),
            value => `${serverURL}/finch/out/buzzer/${encodeURIComponent(value.freq)}/${encodeURIComponent(value.time)}`
        );

        this.setLED = this.setOutput(
            args => [args.RED, args.GREEN, args.BLUE],
            values => `${serverURL}/finch/out/led/${encodeURIComponent(values[0])}/\
                ${encodeURIComponent(values[1])}/${encodeURIComponent(values[2])}`
        );

        this.getTemperature = getSensor('/finch/in/temperature');

        this.getLeftObstacle = getSensor('/finch/in/obstacleLeft');
    
        this.getRightObstacle = getSensor('/finch/in/obstacleRight');

        this.getLeftLight = getSensor('/finch/in/lightLeft');
    
        this.getRightLight = getSensor('/finch/in/lightRight');

        this.getXAcceleration = getSensor('/finch/in/accelerationX');
    
        this.getYAcceleration = getSensor('/finch/in/accelerationY');
        
        this.getZAcceleration = getSensor('/finch/in/accelerationZ');

        this._orientation = null;
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
                    opcode: 'setFinchMotor',
                    text: 'Move Left [LEFT]% Right [RIGHT]%',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        LEFT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        RIGHT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'stopFinch',
                    text: 'Stop Finch',
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'setBuzzer',
                    text: 'Buzz [HERTZ] Hz [MS] ms',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        HERTZ: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 440
                        },
                        MS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: 'setLED',
                    text: 'LED R [RED]% G [GREEN]% B [BLUE]%',
                    blockType: BlockType.COMMAND,
                    arguments: {
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
                    opcode: 'getObstacle',
                    text: '[SIDE] Obstacle',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        SIDE: {
                            type: ArgumentType.STRING,
                            menu: 'sides',
                            defaultValue: FinchSides.LEFT
                        }
                    }
                },
                {
                    opcode: 'getLight',
                    text: '[SIDE] Light',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        SIDE: {
                            type: ArgumentType.STRING,
                            menu: 'sides',
                            defaultValue: FinchSides.LEFT
                        }
                    }
                },
                {
                    opcode: 'getAcceleration',
                    text: '[AXIS] Acceleration',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        AXIS: {
                            type: ArgumentType.STRING,
                            menu: 'axes',
                            defaultValue: FinchAxes.X
                        }
                    }
                },
                {
                    opcode: 'getOrientation',
                    text: 'Orientation',
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getTemperature',
                    text: 'Temperature',
                    blockType: BlockType.REPORTER
                }
            ],
            menus: {
                sides: this.SIDES_MENU,
                axes: this.AXES_MENU
            }
        };
    }
}

module.exports = Scratch3FinchBlocks;
