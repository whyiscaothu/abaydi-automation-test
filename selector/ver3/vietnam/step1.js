require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.step1 = {
    includes: [
        {
            name: 'Do you have under 14 years old accompanying child(ren) included in your passport?',
            selector: '#chkIsChaperone_0',
            type: 'RADIO',
            value: null
        },
    ],
    excludes: [
        {
            name: 'Type of Visa',
            selector: '#selVisaType_0',
        },
    ],
    overrides: [

    ],

}