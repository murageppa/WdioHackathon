const { expect } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const SecurePage = require("../pageobjects/secure.page");

describe("My Login application", () => {
    it("Feature - Login - SI-1231 - should login with valid credentials", async () => {
        await LoginPage.open();
        const hello = "world";
        await LoginPage.login("tomsmith", "SuperSecretPassword!");
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining("You logged into a secure area!"));
    });

    it("Feature - Login - SI-1233 - should login with valid credentials", async () => {
        await LoginPage.open();

        await LoginPage.login("tomsmith", "SuperSecretPassword!");
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining("You logged into a secure area!"));
    });

    it("Feature - Login - SI-12384 - should login with valid credentials", async () => {});
});
