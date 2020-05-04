const puppeteer             = require('puppeteer');
const { Cluster }           = require('puppeteer-cluster');
const expect                = require('expect-puppeteer');
const faker                 = require('faker');
require('dotenv').config();
const urls                  = require('./server');
const { step1 }     = require('./selector/ver2/step1');
const configStep1 = step1();
const selectorVer2Step2a    = require('./selector/ver2/step2a');
const selectorVer2Step2b    = require('./selector/ver2/step2b');
const selectorVer3Step1     = require('./selector/ver3/step1');
const selectorVer3Step2     = require('./selector/ver3/step2');


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


let today               = new Date();
let currentDate         = today.getDate();
today.setDate(currentDate + 4);
let currentDatePlus4    = today.getDate().toString().padStart(2, "0");
let currentMonth        = (today.getMonth() + 1).toString().padStart(2, "0");
let currentYear         = today.getFullYear().toString().padStart(4, "0");
today.setFullYear(today.getFullYear() - 25);
let birthdayYear        = today.getFullYear();
let date                = `${currentYear}-${currentMonth}-${currentDatePlus4}`;
let dateVer2            = `${currentDatePlus4}-${currentMonth}-${currentYear}`;
let birthday            = `${birthdayYear}-${currentMonth}-${currentDate}`;
let birthdayVer2        = `${currentDatePlus4}-${currentMonth}-${birthdayYear}`;


let runAutomationTest = async () => {//Immediately Invoked Function Expression (IIFE)
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

        isVer2 = await page.$(configStep1[0].selector) || null;
        if (isVer2) {
            //Step 1
            //Check if elements exit
            /*let slPortOfArriVal = await page.$(selectorVer2Step1.slPortOfArriVal) || null;
            let checkVisaFee    = await page.$(selectorVer2Step1.checkVisaFee) || null;

            await pickRandomValue(selectorVer2Step1.slPortOfArriVal)
                .then(data => ver2RandomValuePoA = data);
            //Fill data to input
            if (slPortOfArriVal) {
                await expect(page).toSelect(selectorVer2Step1.slPortOfArriVal, ver2RandomValuePoA);
            }
            if (checkVisaFee) {
                await expect(page).toClick(selectorVer2Step1.checkVisaFee);
            }
            await expect(page).toClick(selectorVer2Step1.orderS1SubmitVer2, { delay: 500 });*/

            await configStep1.forEach(async function (config, index) {
                if(config.type == 'SELECT'){
                    await expect(page).toSelect(config.selector, config.value);
                }else if(config.type == 'RADIO'){
                    await expect(page).toClick(config.selector + '[value='+ config.value +']');
                }else if(config.type == 'BUTTON'){
                    await expect(page).toClick(config.selector, { delay: 500 });
                }
            });












            //Step 2a
            await page.waitForNavigation({
                waitUntil: [
                    'load',
                    'domcontentloaded',
                    'networkidle0',
                    'networkidle2'
                ]
            });
            //Check if elements exit
            let fullName        = await page.$(selectorVer2Step2a.fullName) || null;
            let birthDay        = await page.$(selectorVer2Step2a.birthDay) || null;
            let email           = await page.$(selectorVer2Step2a.email) || null;
            let telephone       = await page.$(selectorVer2Step2a.telephone) || null;
            let address         = await page.$(selectorVer2Step2a.address) || null;
            let dateOfArrival   = await page.$(selectorVer2Step2a.dateOfArrival) || null;
            let specialRequest  = await page.$(selectorVer2Step2a.specialRequest) || null;
            let nationality     = await page.$(selectorVer2Step2a.nationality) || null;
            let typeOfVisa      = await page.$(selectorVer2Step2a.typeOfVisa) || null;
            let zoneNumber      = await page.$(selectorVer2Step2a.zoneNumber) || null;
            let methodDirect    = await page.$(selectorVer2Step2a.methodDirect) || null;
            //Fill data to input

            if (fullName) {
                await expect(page).toFill(selectorVer2Step2a.fullName, process.env.CONTACT_FULL_NAME, { delay: 100 });
            }
            if (birthDay) {
                await expect(page).toFill(selectorVer2Step2a.birthDay, birthdayVer2, { delay: 100 });
            }
            if (email) {
                await expect(page).toFill(selectorVer2Step2a.email, process.env.CONTACT_EMAIL, { delay: 100 });
            }
            if (telephone) {
                await expect(page).toFill(selectorVer2Step2a.telephone, faker.phone.phoneNumber(), { delay: 100 });
            }
            if (address) {
                await expect(page).toFill(selectorVer2Step2a.address, `${faker.address.streetAddress()},${faker.address.streetName()},${faker.address.state()},${faker.address.city()}`, { delay: 100 });
            }
            if (dateOfArrival) {
                await expect(page).toFill(selectorVer2Step2a.dateOfArrival, dateVer2, { delay: 100 });
            }
            if (specialRequest) {
                await expect(page).toFill(selectorVer2Step2a.specialRequest, faker.lorem.sentence(), { delay: 100 });
            }
            await pickRandomValue(selectorVer2Step2a.nationality)
                .then(data => ver2RandomValueNationality = data);
            if (nationality) {
                await expect(page).toSelect(selectorVer2Step2a.nationality, ver2RandomValueNationality);
            }
            await pickRandomValue(selectorVer2Step2a.typeOfVisa)
                .then(data => ver2RandomValueToV = data);
            if (typeOfVisa) {
                await expect(page).toSelect(selectorVer2Step2a.typeOfVisa, ver2RandomValueToV);
            }
            if (zoneNumber) {
                await expect(page).toSelect(selectorVer2Step2a.zoneNumber, process.env.CONTACT_VN_CODE_STRING);
            }
            if (methodDirect) {
                await expect(page).toClick(selectorVer2Step2a.methodDirect);
            }
            isSendMailNotiDone = 'true';

            //step 2b

            await page.waitForSelector(selectorVer2Step2b.orderS2Submit, {
                visible: true
            });
            //Check if element exit
            let billingFirstName    = await page.$(selectorVer2Step2b.billingFirstName) || null;
            let billingLastName     = await page.$(selectorVer2Step2b.billingLastName) || null;
            let billingCity         = await page.$(selectorVer2Step2b.billingCity) || null;
            let billingAddress      = await page.$(selectorVer2Step2b.billingAddress) || null;
            let cardNumber          = await page.$(selectorVer2Step2b.cardNumber) || null;
            let billingCVV2         = await page.$(selectorVer2Step2b.billingCVV2) || null;
            let billingCountry      = await page.$(selectorVer2Step2b.billingCountry) || null;
            let billingMonth        = await page.$(selectorVer2Step2b.billingMonth) || null;
            let billingYear         = await page.$(selectorVer2Step2b.billingYear) || null;
            let orderS2Submit       = await page.$(selectorVer2Step2b.orderS2Submit) || null;
            //Fill data to input
            if (billingFirstName) {
                await expect(page).toFill(selectorVer2Step2b.billingFirstName, faker.name.firstName(), { delay: 100 });
            }
            if (billingLastName) {
                await expect(page).toFill(selectorVer2Step2b.billingLastName, faker.name.lastName(), { delay: 100 });
            }
            if (billingCity) {
                await expect(page).toFill(selectorVer2Step2b.billingCity, faker.address.city(), { delay: 100 });
            }
            if (billingAddress) {
                await expect(page).toFill(selectorVer2Step2b.billingAddress, `${faker.address.streetAddress()}, ${faker.address.streetName()}, ${faker.address.state()}`, { delay: 100 });
            }
            if (cardNumber) {
                await expect(page).toFill(selectorVer2Step2b.cardNumber, process.env.CONTACT_CARD_NUMBER, { delay: 100 });
            }
            if (billingCVV2) {
                await expect(page).toFill(selectorVer2Step2b.billingCVV2, process.env.CONTACT_CARD_CVV, { delay: 100 });
            }
            if (billingCountry) {
                await expect(page).toSelect(selectorVer2Step2b.billingCountry, process.env.CONTACT_VN_CODE_STRING);
            }
            if (billingMonth) {
                await expect(page).toSelect(selectorVer2Step2b.billingMonth, currentMonth);
            }
            if (billingYear) {
                await expect(page).toSelect(selectorVer2Step2b.billingYear, currentYear);
            }
            if (orderS2Submit) {
                await expect(page).toClick(selectorVer2Step2b.orderS2Submit);
            }
        } else {

            //Step 1
            //Check if element exit
            let dateOfArrival       = await page.$(selectorVer3Step1.dateOfArrival) || null;
            let specialRequest      = await page.$(selectorVer3Step1.specialRequest) || null;
            let fullNamePassport    = await page.$(selectorVer3Step1.fullNamePassport) || null;
            let birthdayPassport    = await page.$(selectorVer3Step1.birthdayPassport) || null;
            let fullName            = await page.$(selectorVer3Step1.fullName) || null;
            let email               = await page.$(selectorVer3Step1.email) || null;
            let telephone           = await page.$(selectorVer3Step1.telephone) || null;
            let portOfArrival       = await page.$(selectorVer3Step1.portOfArrival) || null;
            let countryPassport     = await page.$(selectorVer3Step1.countryPassport) || null;
            let visaTypePassport    = await page.$(selectorVer3Step1.visaTypePassport) || null;
            let selZoneNumber       = await page.$(selectorVer3Step1.selZoneNumber) || null;
            await pickRandomValue(selectorVer3Step1.portOfArrival)
                .then(data => randomValuePoA = data);
            await pickRandomValue(selectorVer3Step1.countryPassport)
                .then(data => randomValueCP = data);
            await pickRandomValue(selectorVer3Step1.visaTypePassport)
                .then(data => randomValueVTP = data);
            await pickRandomValue(selectorVer3Step1.selZoneNumber)
                .then(data => randomValueZN = data);
            //Fill data to input
            if (dateOfArrival) {
                await page.type(selectorVer3Step1.dateOfArrival, date, { delay: 100 });
            }
            if (specialRequest) {
                await page.type(selectorVer3Step1.specialRequest, faker.lorem.sentence(), { delay: 100 });
            }
            if (fullNamePassport) {
                await page.type(selectorVer3Step1.fullNamePassport, `${faker.name.firstName()} ${faker.name.lastName()}`, { delay: 100 });
            }
            if (birthdayPassport) {
                 await page.type(selectorVer3Step1.birthdayPassport, birthday, { delay: 100 });
            }
            if (fullName) {
                await page.type(selectorVer3Step1.fullName, process.env.CONTACT_FULL_NAME, { delay: 100 });
            }
            if (email) {
                await page.type(selectorVer3Step1.email, process.env.CONTACT_EMAIL, { delay: 100 });
            }
            if (telephone) {
                await page.type(selectorVer3Step1.telephone, faker.phone.phoneNumber(), { delay: 100 });
            }
            if (portOfArrival) {
                await page.select(selectorVer3Step1.portOfArrival, randomValuePoA);
            }
            if (countryPassport) {
                await page.select(selectorVer3Step1.countryPassport, randomValueCP);
            }
            if (visaTypePassport) {
                await page.select(selectorVer3Step1.visaTypePassport, randomValueVTP);
            }
            if (selZoneNumber) {
                await page.select(selectorVer3Step1.selZoneNumber, randomValueZN);
            }
            await page.click(selectorVer3Step1.orderS1Submit);
            isSendMailNotiDone = 'true';

            //Step 2
            await page.waitForSelector(selectorVer3Step2.firstName, {visible: true});
            await page.waitForSelector(selectorVer3Step2.lastName, {visible: true});
            await page.waitForSelector(selectorVer3Step2.cardMonth, {visible: true});
            await page.waitForSelector(selectorVer3Step2.cardYear, {visible: true});
            await page.waitForSelector(selectorVer3Step2.cardCVV, {visible: true});
            await page.waitForSelector(selectorVer3Step2.orderS2Submit, {visible: true});

            await page.type(selectorVer3Step2.firstName, faker.name.firstName(), { delay: 100 });
            await page.type(selectorVer3Step2.lastName, faker.name.lastName(), { delay: 100 });
            await page.type(selectorVer3Step2.city, faker.address.city(), { delay: 100 });
            await page.type(selectorVer3Step2.address, `${faker.address.streetAddress()}, ${faker.address.streetName()}, ${faker.address.state()}`, { delay: 100 });
            await page.type(selectorVer3Step2.cardNumber, process.env.CONTACT_CARD_NUMBER, { delay: 100 });
            await page.type(selectorVer3Step2.cardMonth, currentMonth, { delay: 100 });
            await page.type(selectorVer3Step2.cardYear, currentYear, { delay: 100 });
            await page.type(selectorVer3Step2.cardCVV, process.env.CONTACT_CARD_CVV, { delay: 100 });
            await page.select(selectorVer3Step2.countryOfResidence, process.env.CONTACT_VN_CODE_STRING);
            await page.click(selectorVer3Step2.orderS2Submit);
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
