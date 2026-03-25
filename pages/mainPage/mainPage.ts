import { Locator, Page, expect } from "@playwright/test";
import {BasePage} from "../basePage";
import { parsePrice } from "../../helpers/parsePriceHeler";


export class MainPage extends BasePage {
    protected pageName = "Главная страница";
    readonly html: Locator
    readonly heading: Locator;
    readonly statsPageButton: Locator;

    readonly themeSwitchButton: Locator;

    readonly filtersBlock: Locator;
    readonly categoryFilterSelect: Locator;

    readonly filtersPriceRangeGroup: Locator;
    readonly priceRangeFromInput: Locator;
    readonly priceRangeToInput: Locator;

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
        this.html = page.locator('html');
        this.heading = page.getByRole('heading', { name: 'Модерация объявлений' });
        this.statsPageButton = page.locator('a[href="/stats"]');

        this.themeSwitchButton = page.locator('[class*="_themeToggle_"]');

        this.filtersBlock = page.getByRole('complementary').filter({ hasText: 'Фильтры' })
        this.categoryFilterSelect = this.filtersBlock.locator('label:has-text("Категория")').locator('..').locator('select');

        this.filtersPriceRangeGroup = this.filtersBlock.locator('div[class*="_filters__group_"]').filter({ has: page.locator('label', { hasText: 'Диапазон цен (₽)' }) });
        this.priceRangeFromInput = this.filtersPriceRangeGroup.getByPlaceholder('От');;
        this.priceRangeToInput = this.filtersPriceRangeGroup.getByPlaceholder('До');;

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
    
    async fillPriceRange(from: string, to: string) {
        if (from) {
            await this.priceRangeFromInput.fill(from);
        }
        if (to) {
            await this.priceRangeToInput.fill(to);
        }
    }

    async clickStatsPageButton() {
        await this.statsPageButton.click();
    }

    async openStatsPage() {
        await this.clickStatsPageButton();
    }

    async assertAllCardsHaveCategory(expectedCategory: string) {
        const count = await this.adCards.count();

        await expect(this.adCards).not.toHaveCount(0);

        for (let i = 0; i < count; i++) {
            const card = this.adCards.nth(i);
            const category = this.cardCategory(card);
            await expect(category, `Категория карточки ${i + 1} не соответствует ожидаемой категории = ${expectedCategory}`).toHaveText(expectedCategory);
        }
    }

    async clickThemeSwitchButton() {
        await this.themeSwitchButton.click();
    }

    async switchTheme() {
        await this.clickThemeSwitchButton();
    }

    async assertCardAreSortedByPriceFromHigh() {
        const count = await this.adCards.count();

        await expect(this.adCards, 'На странице не найдены объявления').not.toHaveCount(0);

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

        await expect(this.adCards, 'На странице не найдены объявления').not.toHaveCount(0);

        for (let i = 0; i < count - 1; i++) {
            const card = this.adCards.nth(i);
            const cardPrice = await parsePrice(await this.cardPrice(card).textContent());
            const nextCard = this.adCards.nth(i + 1);
            const nextCardPrice = await parsePrice(await this.cardPrice(nextCard).textContent());
            expect(cardPrice, `Цена карточки ${i + 1} не соответствует ожидаемой цене`).toBeLessThanOrEqual(nextCardPrice);
        }
    }

    async assertAllCardsHaveUrgentBadge() {
        await expect(this.adCards, 'На странице не найдены объявления').not.toHaveCount(0);

        const urgentBadgeCount = await this.adCardsUrgentBadges.count();

        await expect(this.adCardsUrgentBadges, 'На странице не найдено ни одного объявления с срочной меткой').not.toHaveCount(0);
        await expect(this.adCards, 'Есть карточки без срочной метки').toHaveCount(urgentBadgeCount);
    }

    async assertCardsBelongToPriceRangePositive(from: number | null, to: number | null) {
        const count = await this.adCards.count();

        await expect(this.adCards, `На странице найдены объявления при границах ${from !== null ? `от ${from}` : ''}${to !== null ? ` до ${to}` : ''}`).not.toHaveCount(0);
        for (let i = 0; i < count; i++) {
            const card = this.adCards.nth(i);
            const cardPrice = await parsePrice(await this.cardPrice(card).textContent());
            if (from != null) {     
                expect(cardPrice, `Цена карточки ${i + 1} не соответствует ожидаемой цене`).toBeGreaterThanOrEqual(from);
            }
            if (to != null) {
                expect(cardPrice, `Цена карточки ${i + 1} не соответствует ожидаемой цене`).toBeLessThanOrEqual(to);
            }
        }
    }

    async assertZeroCardsBelongToPriceRange(from: number | null, to: number | null) {
        await expect(this.adCards, `На странице найдены объявления при границах ${from !== null ? `от ${from}` : ''}${to !== null ? ` до ${to}` : ''}`).toHaveCount(0);
    }

    async assertNoMinPriceSet() {
        expect(this.page.url(), 'Добавлены параметры поиска минимальной цены в url').not.toContain('minPrice=');
    }

    async assertThemeSet(theme: 'dark' | 'light') {
        await expect(this.html, `Тема не ${theme}`).toHaveAttribute('data-theme', theme);
    }

    async assertThemeSwitchButtonSet(theme: 'Светлая' | 'Темная') {
        await expect(this.themeSwitchButton, `Надпись на кнопке смены темы не ${theme}`).toContainText(theme);
    }
}
