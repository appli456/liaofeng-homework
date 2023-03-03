const path = require('path');
const puppeteer = require('puppeteer');

const URL = 'http://localhost:5173/';
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
      await page.waitForSelector('.cart-menu');
      await page.screenshot({ path: path.join(__dirname, 'screenshots/start-cart-menu.png') });
      await page.click('.cart-menu .ant-btn:nth-child(3)');
      await page.screenshot({ path: path.join(__dirname, 'screenshots/click-size.png') });
    });
  }
)
