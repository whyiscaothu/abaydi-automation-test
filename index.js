const puppeteer             = require('puppeteer');
const { Cluster }           = require('puppeteer-cluster');
const expect                = require('expect-puppeteer');
const faker                 = require('faker');
require('dotenv').config();
const urls                  = require('./server');
const { ver2Step1 }         = require('./selector/ver2/step1');
const { ver2Step2a }        = require('./selector/ver2/step2a');
const { ver2Step2b }        = require('./selector/ver2/step2b');
const { ver3Step1 }         = require('./selector/ver3/step1');
const { ver3Step2 }         = require('./selector/ver3/step2');
const selectorVer2Step1     = ver2Step1();
const selectorVer2Step2a    = ver2Step2a();
const selectorVer2Step2b    = ver2Step2b();
const selectorVer3Step1     = ver3Step1();
const selectorVer3Step2     = ver3Step2();


expect.setDefaultOptions({ timeout: 15000 });
let countIsCloseDontBreak;
let isVer2,
    ver2RandomValuePoA,
    ver2RandomValueToV,
    ver2RandomValueNationality;
let randomValuePoA, //portOfArrival
    randomValueCP,  //countryPassport
    randomValueVTP, //visaTypePassport
    randomValueZN;  //selZoneNumber
let isSendMailNotiDone,
    isSendMailFailDone,
    orderDone;



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

    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url,{
            waitUntil: [
                'load',
                'domcontentloaded',
                'networkidle0',
                'networkidle2'
            ]
        });

        isSendMailNotiDone          = 'false';
        isSendMailFailDone          = 'false';
        orderDone                   = 'false';

        let pickRandomValue = async selector => {
            let arrValue = await page.$$eval(`select${selector} option`, options => options.map(option => option.value));
            await arrValue.shift();//Remove first option in select tag.
            return arrValue[Math.floor(Math.random() * arrValue.length)];
        };
        isVer2 = await page.$(selectorVer2Step1[0].selector) || null;
        if (isVer2) {
            //Step 1
            //
            // await pickRandomValue(selectorVer2Step1.slPortOfArriVal)
            //     .then(data => ver2RandomValuePoA = data);


            for await (const item of selectorVer2Step1) {
                switch (item.type) {
                    case "SELECT":
                        await expect(page).toSelect(item.selector, item.value);
                        break;
                    case "RADIO":
                        await expect(page).toClick(item.selector);
                        break;
                    case "BUTTON":
                        await expect(page).toClick(item.selector, { delay: 500 });
                        break;
                }
            }
            //Step 2a
            await page.waitForNavigation({
                waitUntil: [
                    'load',
                    'domcontentloaded',
                    'networkidle0',
                    'networkidle2'
                ]
            });
            for await (const item of selectorVer2Step2a) {
                switch (item.type) {
                    case "TEXT":
                        await expect(page).toFill(item.selector, item.value, { delay: 100 });
                        break;
                    case "SELECT":
                        await expect(page).toSelect(item.selector, item.value);
                        break;
                    case "RADIO":
                        await expect(page).toClick(item.selector);
                        break;
                }
            }
            isSendMailNotiDone = 'true';

            //step 2b
            for await (const waitFor of selectorVer2Step2b) {
                await page.waitForSelector(waitFor.selector, {visible: true});
            }
            for await (const item of selectorVer2Step2b) {
                switch (item.type) {
                    case "TEXT":
                        await expect(page).toFill(item.selector, item.value, { delay: 100 });
                        break;
                    case "SELECT":
                        await expect(page).toSelect(item.selector, item.value);
                        break;
                    case "BUTTON":
                        await expect(page).toClick(item.selector);
                        break;
                }
            }
        } else {
            //Step 1
            for await (const item of selectorVer3Step1) {
                switch (item.type) {
                    case "TEXT":
                        await expect(page).toFill(item.selector, item.value, { delay: 100 });
                        break;
                    case "SELECT":
                        await expect(page).toSelect(item.selector, item.value);
                        break;
                    // case "RADIO":
                    case "BUTTON":
                        await expect(page).toClick(item.selector);
                        break;
                }
            }
/*            await pickRandomValue(selectorVer3Step1.portOfArrival)
                .then(data => randomValuePoA = data);
            await pickRandomValue(selectorVer3Step1.countryPassport)
                .then(data => randomValueCP = data);
            await pickRandomValue(selectorVer3Step1.visaTypePassport)
                .then(data => randomValueVTP = data);
            await pickRandomValue(selectorVer3Step1.selZoneNumber)
                .then(data => randomValueZN = data);
            isSendMailNotiDone = 'true';*/

            //Step 2
            for await (const waitFor of selectorVer3Step2) {
                await page.waitForSelector(waitFor.selector, {visible: true});
            }
            for await (const item of selectorVer3Step2) {
                switch (item.type) {
                    case "TEXT":
                        await expect(page).toFill(item.selector, item.value, { delay: 100 });
                        break;
                    case "SELECT":
                        await expect(page).toSelect(item.selector, item.value);
                        break;
                    case "RADIO":
                    case "BUTTON":
                        await expect(page).toClick(item.selector);
                        break;
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
        //Send data to server.js(expressJS)
        exports.testProgress = {
            isSendMailNotiDone,
            isSendMailFailDone,
            orderDone,
        };
        // Event handler to be called in case of problems
        cluster.on('taskerror', (err, data) => {
            //In case of problem push error link back to urls array.
            urls.urls.push(data);
            exports.testProgress = {
                isSendMailNotiDone,
                isSendMailFailDone,
                orderDone,
            };
        });



        //Loop 3 time if TimeoutError
    });
    for (const url of urls.urls) {
        cluster.queue(url);
    }
    while (true){
        countIsCloseDontBreak++;
        try {
            await cluster.idle();
            await cluster.close();
            break;
        } catch (err) {
            if (err instanceof puppeteer.errors.TimeoutError) {
                // Do something if this is a timeout.
                await cluster.idle();
                await cluster.close();
                break;
            }
            if (countIsCloseDontBreak >= 3){
                throw new Error(`${err} loop 3 time`)
            }
        }
    }

    // many more pages
};
exports.runAutomationTest = runAutomationTest;
