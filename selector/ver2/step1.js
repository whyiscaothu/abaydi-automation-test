module.exports = {
    step1: function(){
        return [
            {
                selector: '#slNumberOfVisa',
                type: 'SELECT',
                value: '2'
            },
            {
                selector: '.transportation-method',
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
        ];
    }
};