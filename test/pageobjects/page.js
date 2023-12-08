const { browser } = require("@wdio/globals");

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
module.exports = class Page {
    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    open(path) {
        return browser.url(`https://the-internet.herokuapp.com/${path}`);
    }
};

// Hello this is for sample 1st PR