require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.selectorVer3Step1 = {
    includes: [

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