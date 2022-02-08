import puppeteer from 'puppeteer';
import { debug } from './log.js'
import { fetchBody } from './fetcher.js'
import { analyzeDeck } from './analyzers/deck.js'
import { analyzeCxCard } from './analyzers/card.js';

async function main() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const deckCodes = ['HR9W', 'EAK7', 'EV7E'];

    try {
        for (const deckCode of deckCodes) {
            const deck = await inspect(deckCode, page);
            debug(deck);
        }
    } catch (error) {
        console.error(error);
    }

    await browser.close();
}

/**
 * Obtain deck category and cx trigger types in the deck
 * @param {string} deckCode 
 * @param {puppeteer.Page} page 
 * @returns 
 */
async function inspect(deckCode, page) {
    const deck = await inspectDeck(deckCode, page);
    let cards = [];
    for (const cxCardSummary of deck.cxCardSummary) {
        let triggerType = await inspectCxCard(cxCardSummary.id, page);
        cards.push({
            numOfCards: cxCardSummary.numOfCards,
            summary: {
                id: cxCardSummary.id,
                name: cxCardSummary.name,
                triggerType: triggerType
            }
        });
    }
    return {
        code: deckCode,
        category: deck.category,
        cxCards: cards,
    };
}

/**
 * Obtain deck info for the given deck
 * @param {string} deckCode 
 * @param {puppeteer.Page} page 
 * @returns deck
 */
async function inspectDeck(deckCode, page) {
    const deckUrl = `https://decklog.bushiroad.com/view/${deckCode}`;
    const body = await fetchBody(deckUrl, page);
    const deck = analyzeDeck(body);
    return deck;
}

/**
 * Obtain cx card's trigger type for the given cardId
 * @param {string} cardId 
 * @param {puppeteer.Page} page 
 * @returns cxCard
 */
async function inspectCxCard(cardId, page) {
    const deckUrl = `https://ws-tcg.com/cardlist/?cardno=${cardId}`;
    const body = await fetchBody(deckUrl, page);
    const cxCardType = analyzeCxCard(body);
    return cxCardType;
}

await main();
