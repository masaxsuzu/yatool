import { JSDOM } from 'jsdom';

/**
 * Parse dom to obtain summarized cx card
 * @param {string} body 
 * @returns cardSummary
 */
export function analyzeCxCard(body) {
    const dom = new JSDOM(body);
    const type = analyzeTriggerType(dom);
    return type
}

/**
 * 
 * @param {JSDOM} dom 
 * @returns 
 */
 function analyzeTriggerType(dom) {
    const document = dom.window.document;
    const img = document.querySelector(
        '#cardDetail > table > tbody > tr:nth-child(9) > td:nth-child(4) > img'
    );

    return splitTriggerTypeImageSource(img.src);
}
/**
 * 
 * @param {string} src 
 */
function splitTriggerTypeImageSource(src){
    let path = src.split('/');
    let gif = path[path.length - 1];
    return gif.substring(0, gif.length - 4);
}
