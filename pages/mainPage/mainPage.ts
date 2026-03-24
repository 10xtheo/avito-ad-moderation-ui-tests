import { Locator, Page, expect } from "@playwright/test";
import {BasePage} from "../basePage";
import { parsePrice } from "../../helpers/parsePriceHeler";


export class MainPage extends BasePage {
    protected pageName = "Главная страница";
    readonly heading: Locator;
    readonly statsPageButton: Locator;

    readonly filtersBlock: Locator;
    readonly categoryFilterSelect: Locator;
    readonly adCards: Locator;
    readonly adCardsUrgentBadges: Locator;
    readonly cardCategory: (card: Locator) => Locator
    readonly cardPrice: (card: Locator) => Locator

    readonly filtersBarSort: Locator
    readonly sortBySelect: Locator;
    readonly sortOrderSelect: Locator;

    readonly urgentToggle: Locator;

    constructor(page: Page) {
        super(page);
        this.heading = page.getByRole('heading', { name: 'Модерация объявлений' });
        this.statsPageButton = page.locator('a[href="/stats"]');
        this.filtersBlock = page.getByRole('complementary').filter({ hasText: 'Фильтры' })
        this.categoryFilterSelect = this.filtersBlock.locator('label:has-text("Категория")').locator('..').locator('select');
        this.adCards = page.locator('div[class^="_card_"]:not([class*="__"])');
        this.cardCategory = (card) => card.locator('[class*="_card__category_"]');
        this.cardPrice = (card) => card.locator('[class*="_card__price_"]');
        this.adCardsUrgentBadges = this.adCards.locator('[class*="_card__priority_"]:has-text("Срочно")')

        this.filtersBarSort = page.locator('div[class*="_filtersBar__sort_"]');
        this.sortBySelect = this.filtersBarSort.locator('div:has(label:has-text("Сортировать по")) select');
        this.sortOrderSelect = this.filtersBarSort.locator('div:has(label:has-text("Порядок")) select');

        this.urgentToggle = page.locator('label[class*="_urgentToggle"]');
    }

    protected root(): Locator {
        return this.heading;
    }

    async openMainPage() {
        await this.page.goto("/");
        await this.waitForOpen();
    }

    async filterByCategory(category: string) {
        await this.categoryFilterSelect.selectOption(category);
    }

    async sortByPriceFromLow() {
        await this.sortBySelect.selectOption("Цене");
        await this.sortOrderSelect.selectOption("По возрастанию");
    }

    async sortByPriceFromHigh() {
        await this.sortBySelect.selectOption("Цене");
        await this.sortOrderSelect.selectOption("По убыванию");
    }

    async checkUrgentToggle() {
        await this.urgentToggle.check();
    }

    // async uncheckUrgentToggle() {
    //     await this.urgentToggle.uncheck();
    // }

    async clickStatsPageButton() {
        await this.statsPageButton.click();
    }

    async openStatsPage() {
        await this.clickStatsPageButton();
    }

    async assertAllCardsHaveCategory(expectedCategory: string) {
        const count = await this.adCards.count();

        expect(count, 'На странице не найдены объявления').not.toBe(0);

        for (let i = 0; i < count; i++) {
            const card = this.adCards.nth(i);
            const category = await this.cardCategory(card).textContent();
            expect(category, `Категория карточки ${i + 1} не соответствует ожидаемой категории = ${expectedCategory}`).toBe(expectedCategory);
        }
    }

    async assertCardAreSortedByPriceFromHigh() {
        const count = await this.adCards.count();

        expect(count, 'На странице не найдены объявления').not.toBe(0);

        for (let i = 0; i < count - 1; i++) {
            const card = this.adCards.nth(i);
            const cardPrice = await parsePrice(await this.cardPrice(card).textContent());
            const nextCard = this.adCards.nth(i + 1);
            const nextCardPrice = await parsePrice(await this.cardPrice(nextCard).textContent());
            expect(cardPrice, `Цена карточки ${i + 1} не соответствует ожидаемой цене`).toBeGreaterThanOrEqual(nextCardPrice);
        }
    }

    async assertCardAreSortedByPriceFromLow() {
        const count = await this.adCards.count();

        expect(count, 'На странице не найдены объявления').not.toBe(0);

        for (let i = 0; i < count - 1; i++) {
            const card = this.adCards.nth(i);
            const cardPrice = await parsePrice(await this.cardPrice(card).textContent());
            const nextCard = this.adCards.nth(i + 1);
            const nextCardPrice = await parsePrice(await this.cardPrice(nextCard).textContent());
            expect(cardPrice, `Цена карточки ${i + 1} не соответствует ожидаемой цене`).toBeLessThanOrEqual(nextCardPrice);
        }
    }

    async assertAllCardsHaveUrgentBadge() {
        const count = await this.adCards.count();
        
        expect(count, 'На странице не найдены объявления').not.toBe(0);

        const urgentBadgeCount = await this.adCardsUrgentBadges.count();

        expect(urgentBadgeCount, 'На странице не найдено ни одного объявления с срочной меткой').not.toBe(0);
        expect(count, 'Есть карточки без срочной метки').toEqual(urgentBadgeCount);
    }

    // async assertZeroCardsHaveUrgentBadge() {
    //     const count = await this.adCards.count();
    //     const urgentBadgeCount = await this.adCardsUrgentBadges.count();
    //     expect(count, 'На странице не найдены объявления').not.toBe(0);

    //     expect(urgentBadgeCount, 'На странице есть объявления с срочной меткой').toBe(0);
    // }
}
