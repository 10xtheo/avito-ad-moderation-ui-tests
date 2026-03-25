import { test } from "@playwright/test";
import { MainPage } from "../../../../pages/mainPage/mainPage";
import { StatsPage } from "../../../../pages/statsPage/statsPage";

const WAIT_TIME = '02:00';

test.describe("Проверка работы таймера автообновления статистики", () => {
    test("Пауза таймера", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);
        const statsPage = new StatsPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.openStatsPage();
        await statsPage.pauseTimer();

        //assert
        await statsPage.waitForOpen();
        await statsPage.assertTimerPaused();
    });

    test("Обновление таймера", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);
        const statsPage = new StatsPage(page);

        //act
        await mainPage.openMainPage();
        await statsPage.freezeTime();
        await mainPage.openStatsPage();
        await statsPage.fastForwardTime(WAIT_TIME);
        await statsPage.refreshTimer();

        //assert
        await statsPage.waitForOpen();
        await statsPage.assertTimerRefreshed();
    });

    test("Возобновление таймера", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);
        const statsPage = new StatsPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.openStatsPage();
        await statsPage.pauseTimer();
        await statsPage.resumeTimer();

        //assert
        await statsPage.waitForOpen();
        await statsPage.assertTimerResumed();
    });
});
