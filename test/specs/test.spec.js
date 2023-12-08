const { expect } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const SecurePage = require("../pageobjects/secure.page");

describe("My Login application", () => {
    it("Feature - Login - SI-8222 - should login with valid credentials", async () => {
        await LoginPage.open();
        await LoginPage.login("tomsmith", "SuperSecretPassword!");
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining("You logged into a secure area!"));
    });

    it("Feature - Login - SI-1222 - should login with valid credentials", async () => {
        await LoginPage.open();

        await LoginPage.login("tomsmith", "SuperSecretPassword!");
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining("You logged into a secure area!"));
    });

    it("Feature - Login - SI-1229 - should login with valid credentials", async () => {
        await LoginPage.open();

        await LoginPage.login("tomsmith", "SuperSecretPassword!");
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining("You logged into a secure area!"));
    });

    it("Feature - Login - SI-188834 - should login with valid credentials", async () => {
        // let a = "";
        // await hi.hello()
    });
});
