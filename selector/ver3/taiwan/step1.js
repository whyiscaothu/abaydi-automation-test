require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.step = {
    includes: [
        {
            name: 'E-Code',
            selector: '#txtECode_0',
            type: 'TEXT',
            value: '386335'
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
        {
            name: 'Nationality',
            selector: '#drpCountry_0',
            type: 'SELECT',
            value: '239'
        },

    ],

}