const { $ } = require("@wdio/globals");
const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    get flashAlert() {
        return $("#flash");
    }

    open(path) {
        return browser.url(`https://the-internet.herokuapp.com/${path}`);
    }
}

module.exports = new SecurePage();
