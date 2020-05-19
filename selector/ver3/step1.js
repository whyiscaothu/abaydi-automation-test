require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.selectorVer3Step1 = [
    {
        name: 'Date of Arrival',
        selector: '#txtDateOfArrival',
        type: 'TEXT',
        value: getTime.date
    },
    // {
    //     name: 'Transportation Method',
    //     selector: '[name="chkMethod"]',
    //     type: 'RADIO',
    //     value: null
    // },
    {
        name: 'Port of Arrival',
        selector: '#selPortOfArrival',
        type: 'SELECT',
        value: '___RANDOM___'
    },
    {
        name: 'Special Request',
        selector: '[name="txtSpecialRequest"]',
        type: 'TEXT',
        value: process.env['IT_TEST']
    },
    {
        name: 'Full Name',
        selector: '#txtFullName_0',
        type: 'TEXT',
        value: `${faker.name.firstName()} ${faker.name.lastName()}`
    },
    {
        name: 'Date of Birth',
        selector: '#txtbirthDay_0',
        type: 'TEXT',
        value: getTime.birthday
    },
    {
        name: 'Nationality',
        selector: '#drpCountry_0',
        type: 'SELECT',
        value: '___RANDOM___'
    },
    {
        name: 'Full Name',
        selector: '#txtFullNameContact',
        type: 'TEXT',
        value: process.env['IT_TEST']
    },
    {
        name: 'Type of Visa',
        selector: '#selVisaType_0',
        type: 'SELECT',
        value: '___RANDOM___'
    },
    {
        name: 'Email Address',
        selector: '#txtEmail',
        type: 'TEXT',
        value: process.env['CONTACT_EMAIL']
    },
    {
        name: 'Mobile/Cell Telephone',
        selector: '#selZoneNumber',
        type: 'SELECT',
        value: '___RANDOM___'
    },
    {
        name: 'Mobile/Cell Telephone',
        selector: '#txtTelephone',
        type: 'TEXT',
        value: process.env['CONTACT_PHONE_NUMBER']
    },
    {
        name: 'Continue Payment',
        selector: '.btn-apply-submit',
        type: 'BUTTON',
        value: null
    },

]