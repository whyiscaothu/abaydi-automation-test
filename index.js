const puppeteer             = require('puppeteer');
const { Cluster }           = require('puppeteer-cluster');
const expect                = require('expect-puppeteer');
const fs                    = require('fs');
require('dotenv').config();
const dataSubmit            = require('./server');
const { selectorsVer2Step1 } = require('./selector/ver2/step1');
const { selectorsVer2Step2a }= require('./selector/ver2/step2a');
const { selectorsVer2Step2b }= require('./selector/ver2/step2b');
const { selectorsVer3Step1 } = require('./selector/ver3/step1');
const { selectorsVer3Step2 } = require('./selector/ver3/step2');
const { helper }            = require('./helpers/helpers');
let getUrlContainOrderId;
let separateStr;
let filteredDataSubmit = [];
let maxConcurrency = 4;
let concurrency;
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
    let arrDataTested = [];
    for (let item of dataSubmit.dataSubmit) {
        if (item.run_order) {
            filteredDataSubmit.push(helper.filterDataSubmit('apply-visa', item.name, item.marketplace, item.version));
        }
        if (item.run_payment) {
            filteredDataSubmit.push(helper.filterDataSubmit('make-payment', item.name, item.marketplace, item.version));
        }
        if (item.run_contact) {
            filteredDataSubmit.push(helper.filterDataSubmit('contact-us', item.name, item.marketplace, item.version));
        }
    }
    concurrency = (filteredDataSubmit.length > maxConcurrency) ? maxConcurrency : filteredDataSubmit.length;
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: concurrency,
        puppeteerOptions: {
            headless: false,
            defaultViewport: null,
        },
        timeout: 90000,
        retryLimit: 3,
        monitor: false,
    });
    await cluster.task(async ({ page, data: item }) => {
        let ver2Step1   = [...selectorsVer2Step1]
        let ver2Step2a  = [...selectorsVer2Step2a]
        let ver2Step2b  = [...selectorsVer2Step2b]
        let ver3Step1   = [...selectorsVer3Step1]
        let ver3Step2   = [...selectorsVer3Step2]
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
        let marketplaces = fs.readdirSync(`./selector/${versionForDir}`,{ encoding:'utf8' });
        if ( marketplaces.includes(item.marketplace) ) {
            let marketplaceSites = fs.readdirSync(`./selector/${versionForDir}/${item.marketplace}`,{ encoding:'utf8' });
            if (marketplaceSites.includes(item.name)) {
                //code goes here
            } else {
                await helper.processFinalArr('step1.js', ver3Step1, item.marketplace, versionForDir);
                await helper.processFinalArr('step2.js', ver3Step2, item.marketplace, versionForDir);
                await helper.processFinalArr('step1.js', ver2Step1, item.marketplace, versionForDir);
                await helper.processFinalArr('step2a.js', ver2Step2a, item.marketplace, versionForDir);
                await helper.processFinalArr('step2b.js', ver2Step2b, item.marketplace, versionForDir);
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
        // remove tawkto
        await page.waitForSelector('iframe[title="chat widget"]');
        await page.evaluate(() => {
            document.querySelector('iframe[title="chat widget"]').parentNode.remove()
        });

        if (version === '2.0') {
            //Step 1
            await page.waitForSelector(ver2Step1[0].selector);
            await helper.waitForClassNameDeleted(page, '#applyVisaForm', 'form-loading');
            await helper.fillForm(ver2Step1, page);
            //Step 2a
            await page.waitForSelector(ver2Step2a[0].selector);
            await helper.waitForClassNameDeleted(page, '#applyVisaForm', 'form-loading');
            // remove tawkto
            await page.waitForSelector('iframe[title="chat widget"]');
            await page.evaluate(() => {
                document.querySelector('iframe[title="chat widget"]').parentNode.remove()
            });
            await helper.fillForm(ver2Step2a, page);
            //step 2b
            for await (const waitFor of ver2Step2b) {
                await page.waitForSelector(waitFor.selector, {visible: true});
            }
            await helper.fillForm(ver2Step2b, page);
        } else if (version === '3 or 4'){
            //Step 1
            await helper.fillForm(ver3Step1, page);
            //Step 2
            await page.waitForSelector('#applyPaymentForm')
            await page.waitForSelector(ver3Step2[0].selector);
            // remove tawkto
            await page.waitForSelector('iframe[title="chat widget"]');
            await page.evaluate(() => {
                document.querySelector('iframe[title="chat widget"]').parentNode.remove()
            });
            await helper.fillForm(ver3Step2, page);
        }
        const finalResponse = await page.waitForResponse(response => response.url().includes(item.url + '/confirm?info=credit-or-debit-card') && response.status() === 200);
        // console.log(finalResponse.url());
        getUrlContainOrderId = finalResponse.url();                            //https://www.egyptvisagov.com/apply-visa/confirm?info=credit-or-debit-card-fail-2015982
        separateStr = getUrlContainOrderId.split(/\?/g);                    //['https://www.egyptvisagov.com/apply-visa/confirm','info=credit-or-debit-card-fail-2015982']
        let orderIdAndMethodPayment = separateStr[1].split(/-/g);    //['info=credit','or','debit','card','fail','2015982']
        let orderId                 = orderIdAndMethodPayment.pop();        //2015982
        let paymentStatus           = orderIdAndMethodPayment.pop();        //fail
        let paymentMethod           = orderIdAndMethodPayment.join(' ');    //info=credit or debit card
        paymentMethod               = paymentMethod.replace('info=', '');    //credit or debit card
        arrDataTested.push({
            marketplace: item.marketplace,
            name: item.url.replace('https://www.', '').split('/')[0],
            version: item.version,
            resultOrder: {
                orderId,
                paymentMethod,
                paymentStatus,
            }
        });
    });
    for (let item of filteredDataSubmit) {
        await cluster.queue(item);
    }
    await cluster.idle();
    await cluster.close();

    return arrDataTested;
};

exports.runAutomationTest = runAutomationTest;
