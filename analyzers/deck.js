import { JSDOM } from 'jsdom';

/**
 * Parse dom to obtain summarized deck info
 * @param {string} body 
 * @returns deckSummary
 */
export function analyzeDeck(body) {
    const dom = new JSDOM(body);
    const category = analyzeNeoStandardCategory(dom);
    const cxCards = analyzeCXCards(dom);

    return { category: category, cxCards: cxCards };
}

/**
 * 
 * @param {JSDOM} dom 
 * @returns 
 */
function analyzeNeoStandardCategory(dom) {
    let category = '';
    const document = dom.window.document;
    const span = document.querySelector(
        '#viewpage > div.preview-top-label > div.row.deck-preview-top-info > p.col-lg-6.col-12.preview-top-label-right > span'
    );

    category = span.innerHTML;

    return category;
}

/**
 * 
 * @param {JSDOM} dom 
 * @returns
 */
function analyzeCXCards(dom) {
    let cxCards = [];
    const document = dom.window.document;
    const deck = document.querySelector(
        '#viewpage > div.deckview > div > div'
    );

    for (const cardItem of deck.getElementsByClassName('card-item')) {
        const cardView = cardItem.querySelector('div');
        if (cardView.className.includes('wide-card')) {
            // wide-card is CX card.
            const numOfCards = cardView.querySelector('div > div > span.num')
            const image = cardView.querySelector('img');
            const cardTitle = parseCardTitle(image.title);

            const card = {
                id: cardTitle.id,
                name: cardTitle.name,
                numOfCards: Number.parseInt(numOfCards.innerHTML)
            }
            cxCards.push(card);
        }
    }

    return cxCards;
};

/**
 * 
 * @param {string} cardTitle 
 * @returns 
 */
function parseCardTitle(cardTitle) {
    let cardId = '';
    let cardName = '';

    let chunk = cardTitle.split(':');
    cardId = chunk[0];
    cardName = chunk[chunk.length - 1];

    return {
        id: cardId.trimEnd(),
        name: cardName.trimStart()
    };
}
