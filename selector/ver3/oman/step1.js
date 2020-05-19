module.exports.step = {
    includes: [

    ],
    excludes: [
        // {
        //     name: 'Transportation Method',
        //     selector: '[name="chkMethod"]',
        // },
    ],
    overrides: [
        {
            name: 'Nationality',
            selector: '#drpCountry_0',
            type: 'SELECT',
            value: '250'
        },

    ],

}