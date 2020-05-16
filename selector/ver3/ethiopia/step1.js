require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.selectorVer3Step1 = {
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
    ],
    overrides: [

    ],

}