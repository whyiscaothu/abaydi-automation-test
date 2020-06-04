const fs                                    = require('fs');
const express                               = require('express');
const cors                                  = require('cors');
const bodyParser                            = require('body-parser');
const { runAutomationTest }                 = require('./index');
const app                                   = express();
const port                                  = 9009;
const PATH_FOLDER_RESULT                    = './result';
let dataSubmit;


app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send('ok');
});

app.post('/domains',(req, res) => {
    const data = fs.readFileSync('./domains.json', {
        encoding:'utf8',
        flag:'r'
    });

    let ret = JSON.parse(data);

    res.json(ret);
});

app.post('/data-submit', async (req, res) => {
    dataSubmit = req.body.dataSubmit;
    module.exports.dataSubmit = dataSubmit; //pass to index.js

    let arrDataTested = await runAutomationTest().catch(err => console.log(err));
    if (!fs.existsSync(PATH_FOLDER_RESULT)){
        fs.mkdirSync(PATH_FOLDER_RESULT);
    }
    fs.writeFileSync(PATH_FOLDER_RESULT + '/' + new Date().getTime() +'.json', JSON.stringify(arrDataTested));
    res.json(arrDataTested);
});

app.post('/test-result', async (req, res) => {
    let ret = [];
    await fs.readdirSync(PATH_FOLDER_RESULT).forEach(file => {
        if(file.toLowerCase().substring(file.length - 5) === ".json"){
            const data = fs.readFileSync(PATH_FOLDER_RESULT + '/' + file, {
                encoding:'utf8',
                flag:'r'
            });
            let name = file.toLowerCase().replace('.json', '');
            let dataJson = JSON.parse(data);
            ret.push({
                name,
                filename: file,
                data: dataJson
            })
        }
    });
    res.json(ret);
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
