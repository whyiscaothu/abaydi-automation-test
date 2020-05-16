require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.step1 = {
    includes: [
        {
            name: 'Address in Malaysia',
            selector: '#txtAddressInMalaysia_0',
            type: 'TEXT',
            value: `${faker.address.streetAddress()}, ${faker.address.streetName()}`
        },
        {
            name: 'VDRs Code',
            selector: '#txtVDRsCode_0',
            type: 'TEXT',
            value: '634940'
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
            name: 'Type of Visa',
            selector: '#selVisaType_0',
            type: 'SELECT',
            value: '7'
        },
    ],

}