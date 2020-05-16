module.exports.step2a = {
    includes: [
        {
            name: 'E-Code',
            selector: '#txtE_Code0',
            type: 'TEXT',
            value: '896950'
        },
    ],
    excludes: [
        {
            name: 'Type of Visa',
            selector: '#slTypeVisa0',
        },
    ],
    overrides: [
        {
            name: 'Nationality',
            selector: '#slNationality0',
            type: 'SELECT',
            value: '239'
        },
    ],

}