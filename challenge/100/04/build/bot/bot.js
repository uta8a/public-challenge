import puppeteer from "puppeteer";

const APP_HOST = "web";
const APP_PORT = "3000";
export const APP_URL = `http://${APP_HOST}:${APP_PORT}`;

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const visit = async (url) => {
    console.log(`start: ${url}`);

    const browser = await puppeteer.launch({
        headless: "new",
        executablePath: "/usr/bin/chromium",
        args: [
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            '--js-flags="--noexpose_wasm"',
        ],
    });

    const context = await browser.createBrowserContext();

    try {
        // Visit the given URL
        const page1 = await context.newPage();
        await page1.goto(APP_URL, { timeout: 3000 });
        const password = process.env.ADMIN_PASSWORD;
        await page1.type('input[name="username"]', 'admin');
        await page1.type('input[name="password"]', password);
        await page1.click('button[type="submit"]');
        await sleep(500);
        await page1.goto(url, { timeout: 3000 });
        await sleep(500);
        await page1.close();
    } catch (e) {
        console.error(e);
    }

    await context.close();
    await browser.close();

    console.log(`end: ${url}`);
};
