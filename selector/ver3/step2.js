require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports.selectorsVer3Step2 = [
    {
        name: 'First Name',
        selector: '#txtFirstName',
        type: 'TEXT',
        value: faker.name.firstName()
    },
    {
        name: 'Last Name',
        selector: '#txtLastName',
        type: 'TEXT',
        value: faker.name.lastName()
    },
    {
        name: 'Country',
        selector: '#drpCountryOfResidence',
        type: 'SELECT',
        value: '___RANDOM___'
    },
    {
        name: 'City',
        selector: '#txtCity',
        type: 'TEXT',
        value: faker.address.city()
    },
    {
        name: 'Address',
        selector: '#txtAddress',
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
        name: 'Expiration Date',
        selector: '#txtCarMonth',
        type: 'TEXT',
        value: getTime.currentMonth
    },
    {
        name: 'Expiration Date',
        selector: '#txtCarYear',
        type: 'TEXT',
        value: getTime.currentYear
    },
    {
        name: 'CVV/CVC',
        selector: '#txtCardCVV',
        type: 'TEXT',
        value: process.env['CONTACT_CARD_CVV']
    },
    {
        name: 'Submit Payment',
        selector: '.btn-payment-form-submit',
        type: 'BUTTON',
        value: null
    },
]