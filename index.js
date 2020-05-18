const puppeteer             = require('puppeteer');
const { Cluster }           = require('puppeteer-cluster');
const expect                = require('expect-puppeteer');
const fs                    = require('fs');
require('dotenv').config();
const { helper }            = require('./helpers/helpers');
const dataSubmit            = require('./server');
const { selectorVer2Step1 } = require('./selector/ver2/step1');
const { selectorVer2Step2a }= require('./selector/ver2/step2a');
const { selectorVer2Step2b }= require('./selector/ver2/step2b');
const { selectorVer3Step1 } = require('./selector/ver3/step1');
const { selectorVer3Step2 } = require('./selector/ver3/step2');


let NETWORK_PRESETS = {
    'GPRS': {
        'offline': false,
        'downloadThroughput': 50 * 1024 / 8,
        'uploadThroughput': 20 * 1024 / 8,
        'latency': 500
    },
    'Regular2G': {
        'offline': false,
        'downloadThroughput': 250 * 1024 / 8,
        'uploadThroughput': 50 * 1024 / 8,
        'latency': 300
    },
    'Good2G': {
        'offline': false,
        'downloadThroughput': 450 * 1024 / 8,
        'uploadThroughput': 150 * 1024 / 8,
        'latency': 150
    },
    'Regular3G': {
        'offline': false,
        'downloadThroughput': 750 * 1024 / 8,
        'uploadThroughput': 250 * 1024 / 8,
        'latency': 100
    },
    'Good3G': {
        'offline': false,
        'downloadThroughput': 1.5 * 1024 * 1024 / 8,
        'uploadThroughput': 750 * 1024 / 8,
        'latency': 40
    },
    'Regular4G': {
        'offline': false,
        'downloadThroughput': 4 * 1024 * 1024 / 8,
        'uploadThroughput': 3 * 1024 * 1024 / 8,
        'latency': 20
    },
    'DSL': {
        'offline': false,
        'downloadThroughput': 2 * 1024 * 1024 / 8,
        'uploadThroughput': 1 * 1024 * 1024 / 8,
        'latency': 5
    },
    'WiFi': {
        'offline': false,
        'downloadThroughput': 30 * 1024 * 1024 / 8,
        'uploadThroughput': 15 * 1024 * 1024 / 8,
        'latency': 2
    }
}
let runAutomationTest = async () => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 2,
        puppeteerOptions: {
            headless: false
        },
        timeout: 90000,
        retryLimit: 3,
        monitor: true,
    });

    await cluster.task(async ({ page, data: item }) => {
    /*  item: {
            url: "https://www.cambodiavisagov.asia/apply-visa",
            name: "cambodiavisagovasia",
            marketplace: "Cambodia",
            version: "2.1" || "2.2" || "3.0" || "4.0"
        }*/
        let checkFilesExit = (fileCheck, fileName, selector, folderSite = '') => {
            if (fileCheck) {
                let {step} = require(`./selector/${versionForDir}/${item.marketplace}${folderSite}/${fileName}`);
                if (step.includes.length) {
                    for (let includeItem of step.includes) {
                        selector.push(includeItem);
                    }
                }
                if (step.excludes.length) {
                    for (let excludeItem of step.excludes) {
                        let indexed = selector.findIndex( (index) => index.selector === excludeItem.selector);
                        selector.splice(indexed, 1);
                    }
                }
                if (step.overrides.length) {
                    for (let overrideItem of step.overrides) {
                        let indexed = selector.findIndex( (index) => index.selector === overrideItem.selector);
                        selector.splice(indexed, 1, overrideItem);
                    }
                }
            }
        }
        let versionForDir = item.version.trim();
        switch (versionForDir) {
            case '2.1':
            case '2.2':
                versionForDir = 'ver2';
                break;
            case '3.0':
            case '4.0':
                versionForDir = 'ver3';
                break;
        }
        let marketplaces = fs.readdirSync(`./selector/${versionForDir}`,{ encoding:'utf8' });
        if ( marketplaces.includes(item.marketplace) ) {
            let marketplaceSites = fs.readdirSync(`./selector/${versionForDir}/${item.marketplace}`,{ encoding:'utf8' });
            if (marketplaceSites.includes(item.name)) {
                let isFileVer3Step1Exit = fs.existsSync(`./selector/${versionForDir}/${item.marketplace}/${item.name}/step1.js`);
                let isFileVer3Step2Exit = fs.existsSync(`./selector/${versionForDir}/${item.marketplace}/${item.name}/step2.js`);
                let isFileVer2Step1Exit = fs.existsSync(`./selector/${versionForDir}/${item.marketplace}/${item.name}/step1.js`);
                let isFileVer2Step2aExit = fs.existsSync(`./selector/${versionForDir}/${item.marketplace}/${item.name}/step2a.js`);
                let isFileVer2Step2bExit = fs.existsSync(`./selector/${versionForDir}/${item.marketplace}/${item.name}/step2b.js`);
                checkFilesExit(isFileVer3Step1Exit, 'step1', selectorVer3Step1, `/${item.name}`);
                checkFilesExit(isFileVer3Step2Exit, 'step2', selectorVer3Step2, `/${item.name}`);
                checkFilesExit(isFileVer2Step1Exit, 'step1', selectorVer2Step1, `/${item.name}`);
                checkFilesExit(isFileVer2Step2aExit, 'step2a', selectorVer2Step2a, `/${item.name}`);
                checkFilesExit(isFileVer2Step2bExit, 'step2b', selectorVer2Step2b, `/${item.name}`);
            } else {
                // let isFileVer3Step1Exit = fs.existsSync(`./selector/${versionForDir}/${item.marketplace}/step1.js`);
                // let isFileVer3Step2Exit = fs.existsSync(`./selector/${versionForDir}/${item.marketplace}/step2.js`);
                // let isFileVer2Step1Exit = fs.existsSync(`./selector/${versionForDir}/${item.marketplace}/step1.js`);
                // let isFileVer2Step2aExit = fs.existsSync(`./selector/${versionForDir}/${item.marketplace}/step2a.js`);
                // let isFileVer2Step2bExit = fs.existsSync(`./selector/${versionForDir}/${item.marketplace}/step2b.js`);
                // checkFilesExit(isFileVer3Step1Exit, 'step1', selectorVer3Step1);
                // checkFilesExit(isFileVer3Step2Exit, 'step2', selectorVer3Step2);
                // checkFilesExit(isFileVer2Step1Exit, 'step1', selectorVer2Step1);
                // checkFilesExit(isFileVer2Step2aExit, 'step2a', selectorVer2Step2a);
                // checkFilesExit(isFileVer2Step2bExit, 'step2b', selectorVer2Step2b);
            }
        }
        await page.goto(item.url,{
            waitUntil: [
                'load',
                'domcontentloaded',
                'networkidle0',
                'networkidle2'
            ]
        });
        // Connect to Chrome DevTools
        const client = await page.target().createCDPSession();
        // Set throttling property
        await client.send('Network.emulateNetworkConditions', NETWORK_PRESETS.WiFi);

        let isSendMailNotiDone          = 'false';
        let isSendMailFailDone          = 'false';
        let orderDone                   = 'false';
        let version                     = item.version;
        switch (version) {
            case '2.1':
            case '2.2':
                version = '2.0';
                break;
            case '3.0':
            case '4.0':
                version = '3 or 4';
                break;
        }
        if (version === '2.0') {
            //Step 1
            helper.moveSubmitToEnd(process.env['SUBMIT_BUTTON_VER2_STEP1'], selectorVer2Step1);
            for await (const item of selectorVer2Step1) {
                //Check element is present
                let isPresent = await page.$(item.selector) || null;
                if (isPresent) {
                    switch (item.type) {
                        case "SELECT":
                            let valueForSelect = '';
                            if(item.value === '___RANDOM___'){
                                valueForSelect = await helper.pickRandomValue(item.selector, page)
                                    .then(data => data);
                            }else{
                                valueForSelect = item.value;
                            }
                            await page.select(item.selector, valueForSelect);
                            break;
                        case "RADIO":
                        case "BUTTON":
                            await page.click(item.selector, { delay: 500 });
                            break;
                    }
                }
            }
            //Step 2a
            helper.moveSubmitToEnd(process.env['RADIO_BUTTON_VER2_STEP2A'], selectorVer2Step2a);
            for await (const item of selectorVer2Step2a) {
                await page.waitForSelector(item.selector);
            }
            for await (const item of selectorVer2Step2a) {
                let isPresent = await page.$(item.selector) || null;
                if (isPresent) {
                    switch(item.type) {
                        case "TEXT":
                            await page.type(item.selector, item.value, { delay: 100 });
                            break;
                        case "SELECT":
                            let valueForSelect = '';
                            if(item.value === '___RANDOM___'){
                                valueForSelect = await helper.pickRandomValue(item.selector, page)
                                    .then(data => data);
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
            isSendMailNotiDone = 'true';

            //step 2b
            helper.moveSubmitToEnd(process.env['RADIO_BUTTON_VER2_STEP2B'], selectorVer2Step2b);
            for await (const waitFor of selectorVer2Step2b) {
                await page.waitForSelector(waitFor.selector, {visible: true});
            }
            for await (const item of selectorVer2Step2b) {
                let isPresent = await page.$(item.selector) || null;
                if (isPresent) {
                    switch (item.type) {
                        case "TEXT":
                            await page.type(item.selector, item.value, { delay: 100 });
                            break;
                        case "SELECT":
                            let valueForSelect = '';
                            if(item.value === '___RANDOM___'){
                                valueForSelect = await helper.pickRandomValue(item.selector, page)
                                    .then(data => data);
                            }else{
                                valueForSelect = item.value;
                            }
                            await page.select(item.selector, valueForSelect);
                            break;
                        case "BUTTON":
                            await page.click(item.selector);
                            break;
                    }
                }
            }
        } else if (version === '3 or 4'){
            //Step 1
            helper.moveSubmitToEnd(process.env['SUBMIT_BUTTON_VER3_STEP1'], selectorVer3Step1);
            for await (const item of selectorVer3Step1) {
                let isPresent = await page.$(item.selector) || null;
                if (isPresent) {
                    switch (item.type) {
                        case "TEXT":
                            await page.type(item.selector, item.value, { delay: 100 });
                            // await expect(page).toFill(item.selector, item.value, { delay: 100 });
                            break;
                        case "SELECT":
                            let valueForSelect = '';
                            if(item.value === '___RANDOM___'){
                                valueForSelect = await helper.pickRandomValue(item.selector, page)
                                    .then(data => data);
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
            isSendMailNotiDone = 'true';
            //Step 2
            helper.moveSubmitToEnd(process.env['SUBMIT_BUTTON_VER3_STEP2'], selectorVer3Step2);
            for await (const waitFor of selectorVer3Step2) {
                await page.waitForSelector(waitFor.selector, {visible: true});
            }
            for await (const item of selectorVer3Step2) {
                let isPresent = await page.$(item.selector) || null;
                if (isPresent) {
                    switch (item.type) {
                        case "TEXT":
                            await page.type(item.selector, item.value, { delay: 100 });
                            break;
                        case "SELECT":
                            let valueForSelect = '';
                            if(item.value === '___RANDOM___'){
                                valueForSelect = await helper.pickRandomValue(item.selector, page)
                                    .then(data => data);
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
        }

        await page.waitForNavigation({
            waitUntil: [
                'load',
                'domcontentloaded',
                'networkidle0',
                'networkidle2'
            ]
        });

        await page.waitForNavigation({
            waitUntil: [
                'load',
                'domcontentloaded',
                'networkidle0',
                'networkidle2'
            ]
        });
        isSendMailFailDone  = 'true';
        orderDone           = 'true';
        // Event handler to be called in case of problems
        // cluster.on('taskerror', (err, data) => {
        //     //In case of problem push error link back to urls array.
        //     urls.urls.push(data);
        //     exports.testProgress = {
        //         isSendMailNotiDone,
        //         isSendMailFailDone,
        //         orderDone,
        //     };
        // });
    });
    for (let item of dataSubmit.dataSubmit) {
        if (item.run_order) {
            await cluster.queue({
                url: `https://www.${item.name}/apply-visa`,
                name: item.name.toLowerCase().trim().replace(/\./g, ''),
                marketplace: item.marketplace.toLowerCase().trim().replace(/ /g, ''),
                version: item.version,
            });
        }
        if (item.run_payment) {
            await cluster.queue({
                url: `https://www.${item.name}/make-payment`,
                name: item.name.toLowerCase().trim().replace(/\./g, ''),
                marketplace: item.marketplace.toLowerCase().trim().replace(/ /g, ''),
                version: item.version,
            });
        }
        if (item.run_contact) {
            await cluster.queue({
                url: `https://www.${item.name}/contact-us`,
                name: item.name.toLowerCase().trim().replace(/\./g, ''),
                marketplace: item.marketplace.toLowerCase().trim().replace(/ /g, ''),
                version: item.version,
            });
        }
    }
    await cluster.idle();
    await cluster.close();
};
exports.runAutomationTest = runAutomationTest;
