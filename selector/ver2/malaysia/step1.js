require('dotenv').config();
const faker = require('faker')
module.exports.step = {
    includes: [

    ],
    excludes: [
        {
            name: 'Transportation Method',
            selector: '[name="chkMethod"]',
        },
        {
            name: 'Port of Arrival',
            selector: '#slPortOfArriVal',
        },
    ],
    overrides: [

    ],

}