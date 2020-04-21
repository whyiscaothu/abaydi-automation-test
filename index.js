const puppeteer             = require('puppeteer');
const { Cluster }           = require('puppeteer-cluster');
const expect                = require('expect-puppeteer');
const data                  = require('./input/data');
const urls                  = require('./server');
const selectorVer2Step1     = require('./selector/ver2/step1');
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
let countTestFlag = 1;


let fullName            = data.firstName + ' ' + data.lastName;
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

        let pickRandomValue = async selector => {
            let arrValue = await page.$$eval(`select${selector} option`, options => options.map(option => option.value));
            await arrValue.shift();//Remove first option in select tag.
            return arrValue[Math.floor(Math.random() * arrValue.length)];
        };

        isVer2 = await page.$(selectorVer2Step1.slNumberOfVisa);
        if (isVer2) {
            //Step 1
            //Fill data to input
            await pickRandomValue(selectorVer2Step1.slPortOfArriVal)
                .then(data => ver2RandomValuePoA = data);
            await expect(page).toSelect(selectorVer2Step1.slPortOfArriVal, ver2RandomValuePoA);
            await expect(page).toClick(selectorVer2Step1.checkVisaFee);
            await expect(page).toClick(selectorVer2Step1.orderS1SubmitVer2, { delay: 500 });
            //Step 2a
            await page.waitForNavigation({
                waitUntil: [
                    'load',
                    'domcontentloaded',
                    'networkidle0',
                    'networkidle2'
                ]
            });
            await expect(page).toFill(selectorVer2Step2a.fullName, fullName, { delay: 100 });
            await expect(page).toFill(selectorVer2Step2a.birthDay, birthdayVer2, { delay: 100 });
            await expect(page).toFill(selectorVer2Step2a.email, data.email, { delay: 100 });
            await expect(page).toFill(selectorVer2Step2a.telephone, data.phoneNumber, { delay: 100 });
            await expect(page).toFill(selectorVer2Step2a.address, `${data.address} ${data.city}`, { delay: 100 });
            await expect(page).toFill(selectorVer2Step2a.dateOfArrival, dateVer2, { delay: 100 });
            await expect(page).toFill(selectorVer2Step2a.specialRequest, data.specialRequest, { delay: 100 });
            await pickRandomValue(selectorVer2Step2a.nationality)
                .then(data => ver2RandomValueNationality = data);
            await expect(page).toSelect(selectorVer2Step2a.nationality, ver2RandomValueNationality);
            await pickRandomValue(selectorVer2Step2a.typeOfVisa)
                .then(data => ver2RandomValueToV = data);
            await expect(page).toSelect(selectorVer2Step2a.typeOfVisa, ver2RandomValueToV);
            await expect(page).toSelect(selectorVer2Step2a.zoneNumber, data.vnCodeAlpha2ISO);
            await expect(page).toClick(selectorVer2Step2a.methodDirect);


            //step 2b

            await page.waitForSelector(selectorVer2Step2b.orderS2Submit, {
                visible: true
            });
            await expect(page).toFill(selectorVer2Step2b.billingFirstName, data.firstName, { delay: 100 });
            await expect(page).toFill(selectorVer2Step2b.billingLastName, data.lastName, { delay: 100 });
            await expect(page).toFill(selectorVer2Step2b.billingCity, data.city, { delay: 100 });
            await expect(page).toFill(selectorVer2Step2b.billingAddress, data.address, { delay: 100 });
            await expect(page).toFill(selectorVer2Step2b.cardNumber, data.cardNumber, { delay: 100 });
            await expect(page).toFill(selectorVer2Step2b.billingCVV2, data.cardCVV, { delay: 100 });
            await expect(page).toSelect(selectorVer2Step2b.billingCountry, data.vnCodeAlpha2ISO);
            await expect(page).toSelect(selectorVer2Step2b.billingMonth, currentMonth);
            await expect(page).toSelect(selectorVer2Step2b.billingYear, currentYear);
            await expect(page).toClick(selectorVer2Step2b.orderS2Submit);
            // await page.waitForXPath('/html/body/div/section/div/div/div/div/h1/span');
        } else {

            //Step 1

            await pickRandomValue(selectorVer3Step1.portOfArrival)
                .then(data => randomValuePoA = data);
            await pickRandomValue(selectorVer3Step1.countryPassport)
                .then(data => randomValueCP = data);
            await pickRandomValue(selectorVer3Step1.visaTypePassport)
                .then(data => randomValueVTP = data);
            await pickRandomValue(selectorVer3Step1.selZoneNumber)
                .then(data => randomValueZN = data);
            await page.type(selectorVer3Step1.dateOfArrival, date, { delay: 100 });
            await page.type(selectorVer3Step1.specialRequest, data.specialRequest, { delay: 100 });
            await page.type(selectorVer3Step1.fullNamePassport, `${data.firstName} ${data.lastName}`, { delay: 100 });
            await page.type(selectorVer3Step1.birthdayPassport, birthday, { delay: 100 });
            await page.type(selectorVer3Step1.fullName, `${data.firstName} ${data.lastName}`, { delay: 100 });
            await page.type(selectorVer3Step1.email, data.email, { delay: 100 });
            await page.type(selectorVer3Step1.telephone, data.phoneNumber, { delay: 100 });
            await page.select(selectorVer3Step1.portOfArrival, randomValuePoA);
            await page.select(selectorVer3Step1.countryPassport, randomValueCP);
            await page.select(selectorVer3Step1.visaTypePassport, randomValueVTP);
            await page.select(selectorVer3Step1.selZoneNumber, randomValueZN);
            await page.click(selectorVer3Step1.orderS1Submit);


            //Step 2
            await page.waitForSelector(selectorVer3Step2.firstName, {visible: true});
            await page.waitForSelector(selectorVer3Step2.lastName, {visible: true});
            await page.waitForSelector(selectorVer3Step2.cardMonth, {visible: true});
            await page.waitForSelector(selectorVer3Step2.cardYear, {visible: true});
            await page.waitForSelector(selectorVer3Step2.cardCVV, {visible: true});
            await page.waitForSelector(selectorVer3Step2.orderS2Submit, {visible: true});

            await page.type(selectorVer3Step2.firstName, data.firstName, { delay: 100 });
            await page.type(selectorVer3Step2.lastName, data.lastName, { delay: 100 });
            await page.type(selectorVer3Step2.city, data.city, { delay: 100 });
            await page.type(selectorVer3Step2.address, data.address, { delay: 100 });
            await page.type(selectorVer3Step2.cardNumber, data.cardNumber, { delay: 100 });
            await page.type(selectorVer3Step2.cardMonth, currentMonth, { delay: 100 });
            await page.type(selectorVer3Step2.cardYear, currentYear, { delay: 100 });
            await page.type(selectorVer3Step2.cardCVV, data.cardCVV, { delay: 100 });
            await page.select(selectorVer3Step2.countryOfResidence, data.vnCodeAlpha2ISO);
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

        //Loop 3 time if TimeoutError


        countTestFlag++;
    });
    for (const url of urls.urls) {
        cluster.queue(`${url}/apply-visa`);
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