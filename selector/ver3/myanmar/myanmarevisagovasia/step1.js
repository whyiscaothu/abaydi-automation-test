require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.step = {
    includes: [

    ],
    excludes: [
        {
            name: 'Date of Arrival',
            selector: '#txtDateOfArrival',
        },
        // {
        //     name: 'Transportation Method',
        //     selector: '[name="chkMethod"]',
        // },
    ],
    overrides: [

    ],

}