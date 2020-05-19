const getTime = require('../../get-time')

module.exports.step = {
    includes: [
        {
            name: 'Date of Exit',
            selector: '#txtDateOfExit',
            type: 'TEXT',
            value: getTime.dateExit
        },
    ],
    excludes: [
        // {
        //     name: 'Transportation Method',
        //     selector: '[name="chkMethod"]',
        // },
    ],
    overrides: [

    ],

}