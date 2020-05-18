require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.step = {
    includes: [
        {
            name: 'Passport Number',
            selector: '#txtPassportNumber_0',
            type: 'TEXT',
            value: '309182'
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
        {
            name: 'Type of Visa',
            selector: '#selVisaType_0',
        },
    ],
    overrides: [
        {
            name: 'Nationality',
            selector: '#drpCountry_0',
            type: 'SELECT',
            value: '250'
        },
    ],

}