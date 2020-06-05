module.exports.selectorsVer2Step1 = [
    {
        name: 'Number of Visa',
        selector: '#slNumberOfVisa',
        type: 'SELECT',
        value: '1'
    },
    {
        name: 'Transportation Method',
        selector: '[name="chkMethod"]',
        type: 'RADIO',
        value: 'airport'
    },
    {
        name: 'Port of Arrival',
        selector: '#slPortOfArriVal',
        type: 'SELECT',
        value: '___RANDOM___'
    },
    {
        name: 'Processing Time',
        selector: '[name="chkVisaFee"]',
        type: 'RADIO',
        value: null
    },
    {
        name: 'Continue',
        selector: '[name="btnStep1"]',
        type: 'BUTTON',
        value: null
    },
]