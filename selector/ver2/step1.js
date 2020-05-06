module.exports = {
    ver2Step1: function () {
        return [
            {
                selector: '#slNumberOfVisa',
                type: 'CheckVer',
                value: null
            },
            {
                selector: '[name="chkMethod"]',
                type: 'RADIO',
                value: 'airport'
            },
            {
                selector: '#slPortOfArriVal',
                type: 'SELECT',
                value: '2'
            },
            {
                selector: 'input[name=chkVisaFee]',
                type: 'RADIO',
                value: '1'
            },
            {
                selector: '[name="btnStep1"]',
                type: 'BUTTON',
                value: ''
            },
        ]
    }
}