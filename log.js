/**
 * Debug stringified message
 * @param {*} message 
 */
export function debug(message) {
    let log = JSON.stringify(message);
    console.dir(`${log}`);
}
