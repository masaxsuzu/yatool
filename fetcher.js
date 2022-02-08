import puppeteer from 'puppeteer';

/**
 * Fetch dynamic html body for the given url.
 * @param {string} url 
 * @param {puppeteer.Page} page 
 * @returns string
 */
export async function fetchBody(url, page) {
    let body = '';
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.waitForSelector('body');
    body = await page.$eval('body', (e) => e.outerHTML);

    return body;
};
