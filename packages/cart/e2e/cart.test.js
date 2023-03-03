const path = require('path');
const puppeteer = require('puppeteer');

const URL = 'http://localhost:5173/';

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
describe(
  '测试购物车页面',
  () => {
    let browser = null;
    let context = null;
    let page = null;

    beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: false,
        devtools: true,
        slowMo: 100,
      });
      context = await browser.createIncognitoBrowserContext();
      page = await context.newPage();
      await page.goto(URL, {
        waitUntil: 'networkidle0',
      });
      await page.setViewport({
        width: 1600,
        height: 800,
      });
    }, 20000);

    afterAll(async () => {
      await browser.close();
    });

    beforeEach(async () => {
      await page.evaluate(() => {
        localStorage.setItem('cart-data', '');
      });
    })

    test('add to cart', async () => {
      await page.waitForSelector('.product-item:nth-child(1) .ant-btn');
      await page.screenshot({ path: path.join(__dirname, 'screenshots/start-add-to-cart.png') });
      await page.click('.product-item:nth-child(1) .ant-btn');
      await page.screenshot({ path: path.join(__dirname, 'screenshots/add-to-cart.png') })
    });

    test('click size', async () => {
      await page.waitForSelector('.cart-size-button-group');
      await page.screenshot({ path: path.join(__dirname, 'screenshots/start-click-size.png') });
      await page.click('.cart-size-button-group .ant-btn:nth-child(3)');
      await page.screenshot({ path: path.join(__dirname, 'screenshots/click-size.png') });
    });

    test('click sort', async () => {
      await page.waitForSelector('.cart-sort-button-group');
      await page.screenshot({ path: path.join(__dirname, 'screenshots/start-click-sort.png'), });
      await page.click('.cart-sort-button-group .ant-btn:nth-child(1)');
      await page.screenshot({ path: path.join(__dirname, 'screenshots/click-sort.png') });
    });

    test('cart list', async () => {
      await page.waitForSelector('.cart-icon-container');
      await page.screenshot({ path: path.join(__dirname, 'screenshots/start-cart-icon-container.png'), });
      await page.click('.cart-icon-container');
      await sleep(700);
      await page.screenshot({ path: path.join(__dirname, 'screenshots/open-cart-list.png'), });

    });
  }
)
