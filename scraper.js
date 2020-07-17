const puppeteer = require('puppeteer');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-config.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore()


async function scrapeData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.nike.com/launch?s=in-stock', {waitUntil: 'load', timeout: 0});

    const textContent = await page.$$('.card-link')

    const stuff = []
    for (let element of textContent) {
      const attr1 = await page.evaluate(el => el.getAttribute("aria-label"), element);
      const attr2 = await page.evaluate(el => el.getAttribute("href"), element);
      const data = {name: attr1, links: attr2}
      stuff.push(data)
    }
    console.log(stuff);

    const docRef = db.collection('users').doc('alovelace');

    await docRef.set({stuff}).then(() => {
      console.log('saved!!!!!!!!');
    });

  await page.goto('https://www.nike.com/launch', {waitUntil: 'load', timeout: 0});

  const textContent2 = await page.evaluate(() => document.querySelector("[data-qa='product-card-0']").innerHTML);

console.log(textContent2);


await page.goto('https://cactusplantfleamarket.com/', {waitUntil: 'load', timeout: 0});

  const textContent3 = await page.evaluate(() => document.querySelector('.item').innerHTML);

console.log(textContent3);
    

await page.goto('https://shop-usa.palaceskateboards.com/collections/new/', {waitUntil: 'load', timeout: 0});

  const textContent4 = await page.evaluate(() => document.querySelector('.clearfix').innerHTML);

console.log(textContent4);

await page.goto('https://undefeated.com/', {waitUntil: 'load', timeout: 0});

  const textContent5 = await page.evaluate(() => document.querySelector('.index-sections').innerHTML);

console.log(textContent5);


await page.goto('https://kith.com/collections/new-arrivals', {waitUntil: 'load', timeout: 0});

  const textContent6 = await page.evaluate(() => document.querySelector('.collection-products').innerHTML);

console.log(textContent6);


await page.goto('https://cncpts.com/collections/recently-added', {waitUntil: 'load', timeout: 0});

  const textContent7 = await page.evaluate(() => document.querySelector('#bc-sf-filter-products').innerHTML);

console.log(textContent7);


await page.goto('https://www.finishline.com/store/new-arrivals?mnid=newarrivals', {waitUntil: 'load', timeout: 0});

  const textContent8 = await page.evaluate(() => document.querySelector('.product-grid').innerHTML);

console.log(textContent8);

    
    browser.close();
}
    
scrapeData();