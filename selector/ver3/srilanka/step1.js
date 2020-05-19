module.exports.step = {
    includes: [

    ],
    excludes: [
        // {
        //     name: 'Transportation Method',
        //     selector: '[name="chkMethod"]',
        // },
        {
            name: 'Port of Arrival',
            selector: '#selPortOfArrival',
        },
    ],
    overrides: [
        {
            name: 'Type of Visa',
            selector: '#selVisaType_0',
            type: 'SELECT',
            value: '1'
        },
    ],

}