require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.selectorsVer2Step2b = [
    {
        name: 'First Name',
        selector: '#txtBillingFirstName',
        type: 'TEXT',
        value: faker.name.firstName()
    },
    {
        name: 'Last Name',
        selector: '#txtBillingLastName',
        type: 'TEXT',
        value: faker.name.lastName()
    },
    {
        name: 'Country',
        selector: '#selBillingCountry',
        type: 'SELECT',
        value: '___RANDOM___'
    },
    {
        name: 'City',
        selector: '#txtBillingCity',
        type: 'TEXT',
        value: faker.address.city()
    },
    {
        name: 'Address',
        selector: '#txtBillingAddress',
        type: 'TEXT',
        value: `${faker.address.streetAddress()}, ${faker.address.streetName()}, ${faker.address.state()}`
    },
    {
        name: 'Card Number',
        selector: '#txtCardNumber',
        type: 'TEXT',
        value: process.env['CONTACT_CARD_NUMBER']
    },
    {
        name: 'Expiry Month',
        selector: '#selBillingMonth',
        type: 'SELECT',
        value: getTime.currentMonth
    },
    {
        name: 'Expiry Year',
        selector: '#selBillingYear',
        type: 'SELECT',
        value: getTime.currentYear
    },
    {
        name: 'CVV2',
        selector: '#txtBillingCVV2',
        type: 'TEXT',
        value: process.env['CONTACT_CARD_CVV']
    },
    {
        name: 'Payment Process',
        selector: '[name="btnStep2"]',
        type: 'BUTTON',
        value: null
    },
]