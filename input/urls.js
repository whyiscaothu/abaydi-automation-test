const { urls } = require('../server');
let inputStr = `
https://www.indian-visagov.com
https://www.indian-visagov.com
https://www.indianvisagov.asia
https://www.indianvisagov.asia
https://www.indiavisagov.in
https://www.indiavisagov.in
https://www.indian-visagov.com
https://www.indian-visagov.com
https://www.indianvisagov.asia
https://www.indianvisagov.asia
https://www.indiavisagov.in
https://www.indiavisagov.in
https://www.indian-visagov.com
https://www.indian-visagov.com
https://www.indianvisagov.asia
https://www.indianvisagov.asia
https://www.indiavisagov.in
https://www.indiavisagov.in
https://www.indian-visagov.com
https://www.indian-visagov.com
https://www.indianvisagov.asia
https://www.indianvisagov.asia
https://www.indiavisagov.in
https://www.indiavisagov.in
https://www.indian-visagov.com
https://www.indian-visagov.com
https://www.indianvisagov.asia
https://www.indianvisagov.asia
https://www.indiavisagov.in
https://www.indiavisagov.in
https://www.indian-visagov.com
https://www.indian-visagov.com
https://www.indianvisagov.asia
https://www.indianvisagov.asia
https://www.indiavisagov.in
https://www.indiavisagov.in
https://www.indian-visagov.com
https://www.indian-visagov.com
https://www.indianvisagov.asia
https://www.indianvisagov.asia
https://www.indiavisagov.in
https://www.indiavisagov.in
https://www.indian-visagov.com
https://www.indian-visagov.com
https://www.indianvisagov.asia
https://www.indianvisagov.asia
https://www.indiavisagov.in
https://www.indiavisagov.in
https://www.indian-visagov.com
https://www.indian-visagov.com
https://www.indianvisagov.asia
https://www.indianvisagov.asia
https://www.indiavisagov.in
https://www.indiavisagov.in
https://www.indian-visagov.com
https://www.indian-visagov.com
https://www.indianvisagov.asia
https://www.indianvisagov.asia
https://www.indiavisagov.in
https://www.indiavisagov.in
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