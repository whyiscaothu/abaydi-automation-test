require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.step = {
    includes: [

    ],
    excludes: [
        // {
        //     name: 'Transportation Method',
        //     selector: '[name="chkMethod"]',
        // },
        {
            name: 'Port of Arrival',
            selector: '#selPortOfArrival',
        },
        {
            name: 'Type of Visa',
            selector: '#selVisaType_0',
        },
    ],
    overrides: [

    ],

}