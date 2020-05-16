module.exports.step1 = {
    includes: [
        {
            name: 'Address in Malaysia',
            selector: '#txtAddress_In_Malaysia0',
            type: 'TEXT',
            value: process.env['IT_TEST']
        },
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