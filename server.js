const fs                                    = require('fs');
const express                               = require('express');
const cors                                  = require('cors');
const bodyParser                            = require('body-parser');
const { runAutomationTest }                 = require('./index');
const app                                   = express();
const port                                  = 3000;
let urls;

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



app.get('/', (req, res) => {
    res.send('ok');
});

app.post('/urls',(req, res) => {
    urls = req.body.urls;
    module.exports.urls = urls;

    runAutomationTest().catch(err => console.log(err));
    res.redirect('/');
});

app.post('/domains',(req, res) => {
    const data = fs.readFileSync('./domains.json', {
        encoding:'utf8',
        flag:'r'
    });

    let ret = JSON.parse(data);

    res.json(ret);
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
