/* ref. https://github.com/arkark/my-ctf-challenges/blob/41de771d75d6792d68a48d26ccde2f21757637d9/challenges/202409_IERAE_CTF_2024/web/leakleakleak/challenge/bot/bot.js */
import puppeteer from "puppeteer";

const FLAG = process.env.FLAG ?? console.log("No flag") ?? process.exit(1);

const APP_HOST = "web";
const APP_PORT = "3000";
export const APP_URL = `http://${APP_HOST}:${APP_PORT}`;

// Flag format
if (!/^ctf{[a-z\_]+}$/.test(FLAG)) {
    console.log("Bad flag");
    process.exit(1);
}

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
    context.setCookie({
        name: "FLAG",
        value: FLAG,
        domain: APP_HOST,
    });

    try {
        // Visit the given URL
        const page2 = await context.newPage();
        await page2.goto(url, { timeout: 3000 });
        await sleep(100 * 1000);
        await page2.close();
    } catch (e) {
        console.error(e);
    }

    await context.close();
    await browser.close();

    console.log(`end: ${url}`);
};
