

// const puppeteer = require('puppeteer');

// async function fetchTableData() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto('https://guvenilirgida.tarimorman.gov.tr/GuvenilirGida/gkd/SagligiTehlikeyeDusurecek?siteYayinDurumu=True');

//     await page.waitForSelector('#tblTehlike');

//     const data = await page.evaluate(() => {
//         const rows = Array.from(document.querySelectorAll('#tblTehlike tbody tr'));
//         // console.log(rows);
//         return rows.map(row => {
//             const cells = row.querySelectorAll('td');
//             console.log(cells);
//             return {
//                 DuyuruTarihi: cells[0]?.innerText.trim(),
//                 FirmaAdi: cells[1]?.innerText.trim(),
//                 Marka: cells[2]?.innerText.trim(),
//                 UrunAdi: cells[3]?.innerText.trim(),
//                 Uygunsuzluk: cells[4]?.innerText.trim(),
//                 PartiSeriNo: cells[5]?.innerText.trim(),
//                 Ilce: cells[6]?.innerText.trim(),
//                 Il: cells[7]?.innerText.trim(),
//                 UrunGrup: cells[8]?.innerText.trim(),
//             };
//         });
//     });

//     await browser.close();
// }

// fetchTableData();




// const axios = require('axios');
// const querystring = require('querystring');

// const url = 'https://guvenilirgida.tarimorman.gov.tr/GuvenilirGida/gkd/SagligiTehlikeyeDusurecek?';
// const headers = {
//   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//   'User-Agent': 'Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
//   'X-Requested-With': 'XMLHttpRequest',
//   'Origin': 'https://guvenilirgida.tarimorman.gov.tr',
//   'Referer': 'https://guvenilirgida.tarimorman.gov.tr/GuvenilirGida/gkd/SagligiTehlikeyeDusurecek?siteYayinDurumu=True',
//   'Cookie': 'Dil479=1; __RequestVerificationToken=BL6JaQjFeIKKRtS8zk_mYIanuX0CHT85M0TN03WHneBlmQDLITxo47UMo1omNJdCCwvygThz79jK-ecKPS9lC94Fej01; TS01fe2271=016f66f15e080fd70918577def334f028245bd92a25b8bfdb99e95f865f16e4578a173db616c89fddc3f35f60d3f7988e44da5598185f7582b8c811dc1dbd2c081b04052f2',
// };

// const requestData = querystring.stringify({
//   'siteYayinDurumu': 'True',  

// });

// axios.post(url, requestData, { headers })
//   .then(response => {
//     console.log('Response:', response.data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
