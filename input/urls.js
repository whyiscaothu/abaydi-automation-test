let inputStr = `
https://www.indian-visagov.com/apply-visa true order
https://www.indian-visagov.com/apply-visa true payment
https://www.indianvisagov.asia/apply-visa true contact
https://www.indianvisagov.asia/apply-visa true order
https://www.indiavisagov.in/apply-visa false order
https://www.indiavisagov.in/apply-visa true payment
https://www.indian-visagov.com/apply-visa true order
https://www.indian-visagov.com/apply-visa true payment
https://www.indianvisagov.asia/apply-visa true contact
https://www.indianvisagov.asia/apply-visa true order
https://www.indiavisagov.in/apply-visa false order
https://www.indiavisagov.in/apply-visa true payment
https://www.indian-visagov.com/apply-visa true order
https://www.indian-visagov.com/apply-visa true payment
https://www.indianvisagov.asia/apply-visa true contact
https://www.indianvisagov.asia/apply-visa true order
https://www.indiavisagov.in/apply-visa false order
https://www.indiavisagov.in/apply-visa true payment
https://www.indian-visagov.com/apply-visa true order
https://www.indian-visagov.com/apply-visa true payment
https://www.indianvisagov.asia/apply-visa true contact
https://www.indianvisagov.asia/apply-visa true order
https://www.indiavisagov.in/apply-visa false order
https://www.indiavisagov.in/apply-visa true payment
https://www.indian-visagov.com/apply-visa true order
https://www.indian-visagov.com/apply-visa true payment
https://www.indianvisagov.asia/apply-visa true contact
https://www.indianvisagov.asia/apply-visa true order
https://www.indiavisagov.in/apply-visa false order
https://www.indiavisagov.in/apply-visa true payment
https://www.indian-visagov.com/apply-visa true order
https://www.indian-visagov.com/apply-visa true payment
https://www.indianvisagov.asia/apply-visa true contact
https://www.indianvisagov.asia/apply-visa true order
https://www.indiavisagov.in/apply-visa false order
https://www.indiavisagov.in/apply-visa true payment
https://www.indian-visagov.com/apply-visa true order
https://www.indian-visagov.com/apply-visa true payment
https://www.indianvisagov.asia/apply-visa true contact
https://www.indianvisagov.asia/apply-visa true order
https://www.indiavisagov.in/apply-visa false order
https://www.indiavisagov.in/apply-visa true payment
https://www.indian-visagov.com/apply-visa true order
https://www.indian-visagov.com/apply-visa true payment
https://www.indianvisagov.asia/apply-visa true contact
https://www.indianvisagov.asia/apply-visa true order
https://www.indiavisagov.in/apply-visa false order
https://www.indiavisagov.in/apply-visa true payment
https://www.indian-visagov.com/apply-visa true order
https://www.indian-visagov.com/apply-visa true payment
https://www.indianvisagov.asia/apply-visa true contact
https://www.indianvisagov.asia/apply-visa true order
https://www.indiavisagov.in/apply-visa false order
https://www.indiavisagov.in/apply-visa true payment
https://www.indian-visagov.com/apply-visa true order
https://www.indian-visagov.com/apply-visa true payment
https://www.indianvisagov.asia/apply-visa true contact
https://www.indianvisagov.asia/apply-visa true order
https://www.indiavisagov.in/apply-visa false order
https://www.indiavisagov.in/apply-visa true payment
`;


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
exports.urls  = objOfInputString;