const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const { runAutomationTest } = require('./index');
const app = express();
const port = 8000;


let urls;


app.set('view engine', 'pug');
// app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.render('home.pug')
    // runAutomationTest().catch(err => console.log(err));
});
app.post('/urls', (req, res) => {
    urls = req.body.urls.trim().split('\r\n');
    module.exports.urls = urls;

    runAutomationTest().catch(err => console.log(err));
    res.redirect('/');
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
