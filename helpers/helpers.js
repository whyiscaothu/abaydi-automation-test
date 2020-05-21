module.exports.helper = {
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
    }
}