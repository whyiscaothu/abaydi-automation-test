require('dotenv').config();
const faker = require('faker')
module.exports.step = {
    includes: [
        {
            name: 'Address in Malaysia',
            selector: '#txtAddress_In_Malaysia0',
            type: 'TEXT',
            value: faker.address.streetAddress()
        },
    ],
    excludes: [

    ],
    overrides: [

    ],

}