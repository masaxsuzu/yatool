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
 * @returns triggerType
 */
 function analyzeTriggerType(dom) {
    const document = dom.window.document;
    const trigger = document.querySelector(
        '#cardDetail > table > tbody > tr:nth-child(9) > td:nth-child(4)'
    );

    const triggerImages = trigger.querySelectorAll("img");
    let triggerSource = [];
    triggerImages.forEach(img => {
        const type = splitTriggerTypeImageSource(img.src);
        triggerSource.push(type);
    });

    return toTriggerType(triggerSource);
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

/**
 * 
 * @param {string[]} triggerIcons 
 */
 function toTriggerType(triggerIcons){
    if(triggerIcons.length === 0) {
        return 'none';
    }
    if(triggerIcons.length === 1) {
        return triggerIcons[0];
    }
    if(triggerIcons.length === 2) {
        return triggerIcons.join("+");
    }
    return 'none'
}
