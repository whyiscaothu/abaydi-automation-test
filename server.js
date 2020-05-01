const express                               = require('express');
const bodyParser                            = require('body-parser');
const path                                  = require('path');
const low                                   = require('lowdb');
const FileSync                              = require('lowdb/adapters/FileSync');
const adapter                               = new FileSync('db.json');

const { runAutomationTest }                 = require('./index');
const app                                   = express();
const port                                  = 3000;
const db                                    = low(adapter);


// Set some defaults (required if your JSON file is empty)
db.defaults({ urls: [], page: [], count: 0 })
    .write();

// Add a post
db.get('page')
    .push({ id: 1, title: 'lowdb is great'})
    .write();

// Set a user using Lodash shorthand syntax
db.set('user.name', 'typicode')
    .write();

// Increment count
db.update('count', n => n + 1)
    .write();


let urls;


// app.set('view engine', 'pug');
// app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/views/home.html`));
    // runAutomationTest().catch(err => console.log(err));
});


app.post('/urls', (req, res) => {
    urls = req.body.urls.trim().split('\r\n');
    module.exports.urls = urls;

    runAutomationTest().catch(err => console.log(err));
    res.redirect('/');
});
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
