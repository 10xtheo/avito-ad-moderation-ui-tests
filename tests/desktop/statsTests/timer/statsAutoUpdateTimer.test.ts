import { test } from "@playwright/test";
import { MainPage } from "../../../../pages/mainPage/mainPage";
import { StatsPage } from "../../../../pages/statsPage/statsPage";

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
        // await mainPage.waitForOpen();
        await statsPage.assertTimerPaused();
    });

    test("Обновление таймера", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);
        const statsPage = new StatsPage(page);
        //act
        await mainPage.openMainPage();
        await mainPage.openStatsPage();
        await statsPage.refreshTimer();

        //assert
        await statsPage.waitForOpen();
        // await mainPage.waitForOpen();
        await statsPage.assertTimerRefreshed();
    });
});
