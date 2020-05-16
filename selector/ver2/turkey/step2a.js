module.exports.step2a = {
    includes: [
        {
            name: 'Passport Number',
            selector: '#txtPassportNumber0',
            type: 'TEXT',
            value: '220573'
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
            value: '250'
        },
    ],

}