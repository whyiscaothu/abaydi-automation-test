module.exports.step1 = {
    includes: [
        {
            name: 'Are you an Australian permanent resident?',
            selector: '#chkAustralianResident0',
            type: 'RADIO',
            value: null
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