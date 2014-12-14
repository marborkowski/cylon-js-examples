var Cylon = require('cylon');
var state = {
    lightOn: false
};
Cylon.robot({
    /**
     * Warto nazwać danego robota,
     * szczególnie jeśli zamierzamy "wołać" go przez API.
     *
     * Robot bez nazwy otrzymuje za każdym razem
     * nazwę losową...
     */
    name: 'LEDMonster',

    /**
     * Definiujemy połączenia z Arduino i Leap Motion
     */
    connections: {
        arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' },
        leapmotion: { adaptor: 'leapmotion' }
    },

    /**
     * Definiujemy urządzenia:
     * Dioda LED - jako jeden z peryferiów Arduino,
     * Leap Motion - jako urządzenie samo w sobie.
     */
    devices: {
        led: { driver: 'led', pin: 11, connection: 'arduino' },
        leapmotion: { driver: 'leapmotion', connection: 'leapmotion' }
    },

    /**
     * Zadania do wykonania...
     * @param my
     */
    work: function (my) {

        /**
         *  Jeśli ruch ręki...
         */
        this.leapmotion.on('hand', function (hand) {

            /**
             * Jeśli ruch lewej ręki && dioda świeci,
             * wyłącz ją.
             *
             * Jeśli ruch prawej ręki && dioda nie świeci,
             * włącz ją
             */
            if (hand.type === 'left' && state.lightOn) {

                console.log('Light OFF');
                my.led.turnOff();
                state.lightOn = false;

            } else if (hand.type === 'right' && !state.lightOn) {

                console.log('Light ON');
                my.led.turnOn();
                state.lightOn = true;

            } else {

            }
        });

        /**
         * Zapalaj/Wygaszaj diodę LED
         * w interwale = 250ms JEŚLI state.lightOn
         */
        every(250, function () {
            if (state.lightOn) {
                my.led.toggle();
            } else {
                my.led.turnOff();
            }
        });
    }
}).start();