import { Locator, Page, expect } from "@playwright/test";
import {BasePage} from "../basePage";

const WAIT_TIME = 3000;

export class StatsPage extends BasePage {
    protected pageName = "Статистика модератора";
    readonly heading: Locator;

    readonly timerRefreshButton: Locator;
    readonly timerPauseButton: Locator;
    // readonly timerResumeButton: Locator;
    readonly disabledTimerLabel: Locator;
    readonly timerValue: Locator;

    constructor(page: Page) {
        super(page);
        this.heading = page.getByRole('heading', { name: '📊 Статистика модератора' });

        this.timerRefreshButton = page.getByRole('button', { name: 'Обновить сейчас' });
        this.timerPauseButton = page.getByRole('button', { name: 'Отключить автообновление' });
        // this.timerResumeButton = page.getByRole('button', { name: 'Продолжить' });
        this.disabledTimerLabel = page.locator('[class*="_disabled_"]');
        this.timerValue = page.locator('[class*="_timeValue_"]');
    }

    protected root(): Locator {
        return this.heading;
    }

    async openStatsPage() {
        await this.page.goto("/stats");
        await this.waitForOpen();
    }

    async clickTimerRefreshButton() {
        await this.timerRefreshButton.click();
    }

    async refreshTimer() {
        await this.clickTimerRefreshButton();
    }

    async clickTimerPauseButton() {
        await this.timerPauseButton.click();
    }

    async pauseTimer() {
        await this.clickTimerPauseButton();
    }

    async assertTimerPaused() {
        await expect(this.disabledTimerLabel, "Не показно сообщение о выключенном автообновлении").toBeVisible();

        await expect(this.disabledTimerLabel, "Неверный текст сообщения о выключенном автообновлении").toHaveText("Автообновление выключено");

        await expect(this.timerValue, "Видно значение таймера").toBeHidden();
    }

    async assertTimerRefreshed() {
        await expect(this.timerValue, "Некорректное значение таймера").toHaveText('4:57'); // TODO: fix
    }
}
