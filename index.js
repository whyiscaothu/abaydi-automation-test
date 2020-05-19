const puppeteer             = require('puppeteer');
const { Cluster }           = require('puppeteer-cluster');
const expect                = require('expect-puppeteer');
const fs                    = require('fs');
require('dotenv').config();
const dataSubmit            = require('./server');
const { selectorVer2Step1 } = require('./selector/ver2/step1');
const { selectorVer2Step2a }= require('./selector/ver2/step2a');
const { selectorVer2Step2b }= require('./selector/ver2/step2b');
const { selectorVer3Step1 } = require('./selector/ver3/step1');
const { selectorVer3Step2 } = require('./selector/ver3/step2');
const { helper }            = require('./helpers/helpers');
let fillForm = async (selector, page) => {
    for await (const item of selector) {
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
        let ver2Step1   = [...selectorVer2Step1]
        let ver2Step2a  = [...selectorVer2Step2a]
        let ver2Step2b  = [...selectorVer2Step2b]
        let ver3Step1   = [...selectorVer3Step1]
        let ver3Step2   = [...selectorVer3Step2]
    /*  item: {
            url: "https://www.cambodiavisagov.asia/apply-visa",
            name: "cambodiavisagovasia",
            marketplace: "Cambodia",
            version: "2.1" || "2.2" || "3.0" || "4.0"
        }*/
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
        function processFinalArr (jsName, selector) {
            let isStep = fs.existsSync(`./selector/${versionForDir}/${item.marketplace}/${jsName}`);
            if (isStep) {
                let {step} = require(`./selector/${versionForDir}/${item.marketplace}/${jsName}`);
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
        }
        let marketplaces = fs.readdirSync(`./selector/${versionForDir}`,{ encoding:'utf8' });
        if ( marketplaces.includes(item.marketplace) ) {
            let marketplaceSites = fs.readdirSync(`./selector/${versionForDir}/${item.marketplace}`,{ encoding:'utf8' });
            if (marketplaceSites.includes(item.name)) {
                //code goes here
            } else {
                processFinalArr('step1.js', ver3Step1);
                processFinalArr('step2.js', ver3Step2);
                processFinalArr('step1.js', ver2Step1);
                processFinalArr('step2a.js', ver2Step2a);
                processFinalArr('step2b.js', ver2Step2b);
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
        let version = item.version;
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
            await fillForm(ver2Step1, page);
            //Step 2a
            for await (const item of ver2Step2a) {
                await page.waitForSelector(item.selector);
            }
            await fillForm(ver2Step2a, page);

            //step 2b
            for await (const waitFor of ver2Step2b) {
                await page.waitForSelector(waitFor.selector, {visible: true});
            }
            await fillForm(ver2Step2b, page);

        } else if (version === '3 or 4'){
            //Step 1
            await fillForm(ver3Step1, page);
            //Step 2
            for await (const waitFor of ver3Step2) {
                await page.waitForSelector(waitFor.selector, {visible: true});
            }
            await fillForm(ver3Step2, page);
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
