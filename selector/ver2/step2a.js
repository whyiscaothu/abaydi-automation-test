require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.selectorsVer2Step2a = [
    {
        name: 'Full Name',
        selector: '#txtFullName0',
        type: 'TEXT',
        value: process.env['IT_TEST']
    },
    {
        name: 'Date of Birth',
        selector: '#txtbirthDay0',
        type: 'TEXT',
        value: getTime.birthdayVer2
    },
    {
        name: 'Nationality',
        selector: '#slNationality0',
        type: 'SELECT',
        value: '___RANDOM___'
    },
    {
        name: 'Email',
        selector: '#txtEmail',
        type: 'TEXT',
        value: process.env['CONTACT_EMAIL']
    },
    {
        name: 'Telephone',
        selector: '#selZoneNumber',
        type: 'SELECT',
        value: '___RANDOM___'
    },
    {
        name: 'Telephone',
        selector: '#txtTelephone',
        type: 'TEXT',
        value: process.env['CONTACT_PHONE_NUMBER']
    },
    {
        name: 'Address',
        selector: '#txtAddress',
        type: 'TEXT',
        value: `${faker.address.streetAddress()}, ${faker.address.streetName()}, ${faker.address.state()}, ${faker.address.city()}`
    },
    {
        name: 'Date Of Arrival',
        selector: '#txtDateOfArrival',
        type: 'TEXT',
        value: getTime.dateVer2
    },
    {
        name: 'Special Request',
        selector: '#txtSpecialRequest',
        type: 'TEXT',
        value: process.env['IT_TEST']
    },
    {
        name: 'Type of Visa',
        selector: '#slTypeVisa0',
        type: 'SELECT',
        value: '___RANDOM___'
    },
    {
        name: 'Credit / Debit Card',
        selector: '#radMethodDirect',
        type: 'RADIO',
        value: null
    },
]


