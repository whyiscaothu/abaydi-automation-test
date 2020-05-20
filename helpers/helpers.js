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
}