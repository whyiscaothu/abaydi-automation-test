const puppeteer             = require('puppeteer');
const { Cluster }           = require('puppeteer-cluster');
const expect                = require('expect-puppeteer');
const fs                    = require('fs');
require('dotenv').config();
const dataSubmit            = require('./server');
const { selectorVer2Step1 }         = require('./selector/ver2/step1');
const { selectorVer2Step2a }        = require('./selector/ver2/step2a');
const { selectorVer2Step2b }        = require('./selector/ver2/step2b');
const { selectorVer3Step1 }         = require('./selector/ver3/step1');
const { selectorVer3Step2 }         = require('./selector/ver3/step2');
let marketplaces = fs.readdirSync('./selector',{ encoding:'utf8' });


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
            name: "cambodiavisagov.asia",
            marketplace: "Cambodia",
            version: "2.1" || "2.2" || "3.0" || "4.0"
        }*/

        if ( marketplaces.includes(item.marketplace) ) {
            let marketplaceDetails = fs.readdirSync(`./selector/${item.marketplace}`,{ encoding:'utf8' });
            if ( marketplaceDetails.includes(item.name) ) {

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

        let pickRandomValue = async selector => {
            let arrValue = await page.$$eval(`select${selector} option`, options => options.map(option => option.value));
            await arrValue.shift();//Remove first option in select tag.
            return arrValue[Math.floor(Math.random() * arrValue.length)];
        };
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
            for await (const item of selectorVer2Step1) {
                //Check element is present
                let isPresent = await page.$(item.selector) || null;
                if (isPresent) {
                    switch (item.type) {
                        case "SELECT":
                            await page.select(item.selector, item.value);
                            break;
                        case "RADIO":
                        case "BUTTON":
                            await page.click(item.selector, { delay: 500 });
                            break;
                    }
                }
            }
            //Step 2a
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
                            await page.select(item.selector, item.value);
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
                            await page.select(item.selector, item.value);
                            break;
                        case "BUTTON":
                            await page.click(item.selector);
                            break;
                    }
                }
            }
        } else if (version === '3 or 4'){
            //Step 1
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
                                valueForSelect = await pickRandomValue(item.selector)
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
                                valueForSelect = await pickRandomValue(item.selector)
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
                name: item.name.replace(/\./g, ''),
                marketplace: item.marketplace,
                version: item.version,
            });
        }
        if (item.run_payment) {
            await cluster.queue({
                url: `https://www.${item.name}/make-payment`,
                name: item.name.replace(/\./g, ''),
                marketplace: item.marketplace,
                version: item.version,
            });
        }
        if (item.run_contact) {
            await cluster.queue({
                url: `https://www.${item.name}/contact-us`,
                name: item.name.replace(/\./g, ''),
                marketplace: item.marketplace,
                version: item.version,
            });
        }
    }
    await cluster.idle();
    await cluster.close();
};
exports.runAutomationTest = runAutomationTest;
