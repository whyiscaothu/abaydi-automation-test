/*
 * 1. Export các sheet có trong https://docs.google.com/spreadsheets/d/1y00p1pHJ-e_54hablRZja-C8ZZHQYyHwsp6vUw3F5_U/edit : File -> Download as -> Web page (.html, zipped)
 * 2. Giải nén thư mực vừa download về và copy tất cả các file .html vào thư mục input của project. VD: input/Azer.html, input/Bahrain.html, ...
 * 3. Chạy lệnh: node get-domains
 * 4. File domains.json được trả ra ở thư mục gốc
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const FOLDER_NAME_INPUT = "input";
console.log('get domains name...');
(async () => {
    await getInputFromFile();

    async function getInputFromFile() {
        await puppeteer.launch({
            ignoreHTTPSErrors: true,
        }).then(async browser => {
            await browser.newPage().then(async page => {
                // get file
                var arr_file = [];
                fs.readdirSync(__dirname + "\\" + FOLDER_NAME_INPUT).forEach(file => {
                    if(file.toLowerCase().substring(file.length - 5) == ".html"){
                        arr_file.push(file);
                    }
                });
                // console.log(arr_file);

                // crawl content from file
                const ARR_SITE = [];
                for (let i=0; i<arr_file.length; i++){
                    let marketplace = arr_file[i].substring(0, arr_file[i].length - 5);

                    let result_html = await fs.readFileSync(__dirname + "\\" + FOLDER_NAME_INPUT + "\\" + arr_file[i], 'utf8');
                    result_html = result_html.match(/<table[^>]*>[\s\S]*<\/table>/gi) + "";

                    await page.setContent(result_html);
                    let arr_site_of_marketplace = await page.evaluate((marketplace) => {
                        let arr_site = [];
                        let tbody = document.getElementsByTagName('tbody')[0];
                        for (let j=1; j<tbody.childElementCount; j++){
                            let tr = tbody.children[j];
                            let td = tr.querySelectorAll('td:not(.freezebar-cell)');
                            if(td.length > 4){
                                let active = td[3].innerText.trim().toLowerCase();
                                if(active === 'active'){
                                    arr_site.push({
                                        name: td[2].innerText.trim(),
                                        marketplace: marketplace,
                                        version: td[4].innerText.trim(),
                                    });
                                }
                            }
                        }

                        return arr_site;
                    }, marketplace);

                    for (let j=0; j<arr_site_of_marketplace.length; j++){
                        ARR_SITE.push(arr_site_of_marketplace[j]);
                    }
                }
                // console.log(ARR_SITE);

                fs.writeFileSync('./domains.json', JSON.stringify(ARR_SITE));
            });

            await browser.close();
            console.log('complete!');
        });
    }
})();