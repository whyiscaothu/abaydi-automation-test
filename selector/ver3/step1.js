require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports = {
    ver3Step1: function () {
        return [
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
                value: '2'
            },
            {
                name: 'Port of Arrival',
                selector: '#selPortOfArrival',
                type: 'SELECT',
                value: '2'
            },
            {
                name: 'Special Request',
                selector: '[name="txtSpecialRequest"]',
                type: 'TEXT',
                value: faker.lorem.sentence()
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
                value: process.env['CONTACT_VN_CODE_NUMBER']
            },
            {
                name: 'Type of Visa',
                selector: '#selVisaType_0',
                type: 'SELECT',
                value: '2'
            },
            {
                name: 'Type of Visa',
                selector: '#selVisaType_0',
                type: 'SELECT',
                value: '2'
            },
            {
                name: 'Full Name',
                selector: '#txtFullNameContact',
                type: 'TEXT',
                value: process.env['CONTACT_FULL_NAME']
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
                value: process.env['CONTACT_VN_CODE_STRING']
            },
            {
                name: 'Mobile/Cell Telephone',
                selector: '#txtTelephone',
                type: 'TEXT',
                value: faker.phone.phoneNumber()
            },
            {
                name: 'Continue Payment',
                selector: '.btn-apply-submit',
                type: 'BUTTON',
                value: null
            },

        ]
    }
}