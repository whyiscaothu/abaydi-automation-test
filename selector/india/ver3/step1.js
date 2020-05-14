require('dotenv').config();
const faker   = require('faker');
const getTime = require('../../get-time')

module.exports = {
    ver3Step1: function () {
        return {
            include: [
                {
                    name: 'Continue Payment',
                    selector: '.btn-apply-submit',
                    type: 'BUTTON',
                    value: null
                },
            ],
            exclude: [
                {
                    name: 'Continue Payment',
                    selector: '.btn-apply-submit',
                    type: 'BUTTON',
                    value: null
                },
            ],
            override: [
                {
                    name: 'Continue Payment',
                    selector: '.btn-apply-submit',
                    type: 'BUTTON',
                    value: null
                },
            ],
        }
    }
}