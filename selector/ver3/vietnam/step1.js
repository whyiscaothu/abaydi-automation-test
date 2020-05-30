module.exports.step = {
    includes: [
        {
            name: 'Do you have under 14 years old accompanying child(ren) included in your passport?',
            selector: '#chkIsChaperone[0]',
            type: 'RADIO',
            value: null
        },
    ],
    excludes: [
        {
            name: 'Type of Visa',
            selector: '#selVisaType_0',
        },
    ],
    overrides: [

    ],

}