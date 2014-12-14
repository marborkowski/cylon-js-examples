var Cylon = require('cylon');

Cylon.api({
    host: '0.0.0.0',
    port: 8080,
    ssl: false
});

Cylon.robot({

    /* Tym razem dla porządku nadamy robotowi imię */
    name: 'ledMonster',

    connections: {
        arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' }
    },

    devices: {
        led: { driver: 'led', pin: 13 }
    },

    /* Definiujemy tym razem puste zadanie */
    work: function () {
    },

    /* Tworzymy własną funkcję, której każde wywołanie
     będzie przełączać aktualny stan diody LED (on/off) */
    ledToggle: function () {
        console.log('Led Toggle');
        this.led.toggle();
    }

}).start();
