require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.step1 = {
    includes: [

    ],
    excludes: [
        // {
        //     name: 'Transportation Method',
        //     selector: '[name="chkMethod"]',
        // },
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