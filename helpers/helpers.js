const fs = require('fs');
const path = require('path');

module.exports.helper = {
    filterDataSubmit: (uri, name, marketplace, version) => {
        return {
            url: `https://www.${name}/${uri}`,
            name: name.toLowerCase().trim().replace(/\./g, ''),
            marketplace: marketplace.toLowerCase().trim().replace(/ /g, ''),
            version: version
        }
    },
    pickRandomValue: async (selector, page) => {
        let arrValue = await page.$$eval(`select${selector} option`, options => options.map(option => option.value));
        if (arrValue.length > 1) {
            await arrValue.shift();//Remove first option in select tag.
        }
        let result = arrValue[Math.floor(Math.random() * arrValue.length)];

        switch (result) {
            case 'CA':
            case 'US':
                result = arrValue[Math.floor(Math.random() * arrValue.length)];
                break;
        }
        return result;
    },
    waitForClassNameDeleted: async (page, selector, className) => {
        let totalSecond = 0;
        while(true){
            await new Promise(function(resolve) {
                setTimeout(resolve, 1000);
            });
            totalSecond += 1000;
            // console.log('wait loading: ' + totalSecond);
            let isWaitLoading = await page.evaluate((selector, className) => $(selector).hasClass(className), selector, className);
            if(!isWaitLoading){
                break;
            }else{
                if(totalSecond > 30000){
                    // alert error
                }
            }
        }
    },
    processFinalArr: async (jsName, selector, marketplace, versionDir) => {
        let pathToStepFile = path.resolve(__dirname, `../selector/${versionDir}/${marketplace}/${jsName}`)
        let isStep = fs.existsSync(pathToStepFile);
        if (isStep) {
            let {step} = require(pathToStepFile);
            let indexBeforeSubmitBtn = (selector.length - 3);
            if (step.overrides.length) {
                for (let overrideItem of step.overrides) {
                    let indexed = selector.findIndex( (index) => index.selector === overrideItem.selector);
                    selector.splice(indexed, 1, overrideItem);
                }
            }
            if (step.excludes.length) {
                for (let excludeItem of step.excludes) {
                    let indexed = selector.findIndex( (index) => index.selector === excludeItem.selector);
                    selector.splice(indexed, 1);
                }
            }
            if (step.includes.length) {
                for (let includeItem of step.includes) {
                    selector.splice(indexBeforeSubmitBtn, 0, includeItem);
                }
            }
        }
    },
    fillForm: async function (selector, page) {
        for await (const item of selector) {
            let isPresent = await page.$(item.selector) || null;
            if (isPresent) {
                switch (item.type) {
                    case "TEXT":
                        await page.type(item.selector, item.value, { delay: 1 });
                        break;
                    case "SELECT":
                        let valueForSelect = '';
                        if(item.value === '___RANDOM___'){
                            valueForSelect = await this.pickRandomValue(item.selector, page)
                                .then(data => data);
                            if (valueForSelect === 'CA' || 'US') {
                                valueForSelect = await this.pickRandomValue(item.selector, page)
                                    .then(data => data);
                            }
                        }else{
                            valueForSelect = item.value;
                        }
                        await page.select(item.selector, valueForSelect);
                        break;
                    case "RADIO":
                    case "BUTTON":
                        await page.click(item.selector);
                        break;
                }
            }
        }
    },

}