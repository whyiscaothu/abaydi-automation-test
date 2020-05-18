require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.step = {
    includes: [
        {
            name: 'Are you an Australian permanent resident?',
            selector: '#chkIsAustralianPR_0',
            type: 'RADIO',
            value: null
        },
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