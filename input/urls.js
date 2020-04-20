let inputStr = `
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true payment
https://www.indianvisagov.asia/apply-visa true contact
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa false order
https://www.indianvisagov.asia/apply-visa true payment
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa false contact
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa true payment
https://www.indianvisagov.asia/apply-visa true contact
https://www.indianvisagov.asia/apply-visa true order
https://www.indianvisagov.asia/apply-visa false order
https://www.indianvisagov.asia/apply-visa true payment
https://www.indianvisagov.asia/apply-visa true order`;


let objOfInputString = {
    url        : [],
    isTrue     : [],
    pageAction : []
};
let outputStr = inputStr.trim().split('\n');
for (const subArr of outputStr) {
    let tmpArr = subArr.split(' ');
    objOfInputString.url.push(tmpArr[0]);
    objOfInputString.isTrue.push(tmpArr[1]);
    objOfInputString.pageAction.push(tmpArr[2]);
}
exports.getUrls  = objOfInputString;