require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.selectorVer3Step1 = {
    includes: [
        {
            name: 'Identity card number',
            selector: '#txtCMND_0',
            type: 'TEXT',
            value: '688446'
        },
        {
            name: 'Chinese Name',
            selector: '#txtChineseName_0',
            type: 'TEXT',
            value: process.env['IT_TEST']
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
            value: '224'
        },
    ],

}