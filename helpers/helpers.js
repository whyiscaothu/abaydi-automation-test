module.exports.helper = {
/*    moveSubmitToEnd: (button, arrSelector) => {
        let submitIndex = arrSelector.findIndex((index) => index.selector === button);
        let removedValues = arrSelector.splice(submitIndex, 1);
        arrSelector.push(removedValues[0]);
    },*/
    pickRandomValue: async (selector, page) => {
        let arrValue = await page.$$eval(`select${selector} option`, options => options.map(option => option.value));
        if (arrValue.length > 1) {
            await arrValue.shift();//Remove first option in select tag.
        }
        return arrValue[Math.floor(Math.random() * arrValue.length)];
    },
}