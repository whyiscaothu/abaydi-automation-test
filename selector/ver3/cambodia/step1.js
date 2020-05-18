require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.step = {
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