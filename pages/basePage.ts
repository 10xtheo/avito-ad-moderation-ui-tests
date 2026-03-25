import { expect, Locator, Page } from "@playwright/test";

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected abstract root(): Locator;
    protected abstract pageName: string;

    async waitForOpen() {
        await expect(
            this.root(),
            `Страница ${this.pageName} не открылась`)
            .toBeVisible();
    }

    async fill(locator: Locator, value: string) {
        await locator.fill(value);
    }

    async click(locator: Locator) {
        await locator.click();
    }
}
