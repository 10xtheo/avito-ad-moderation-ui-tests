import { test } from "@playwright/test";
import { MainPage } from "../../../../pages/mainPage/mainPage";
import { StatsPage } from "../../../../pages/statsPage/statsPage";
test("Открытие страницы статистики", async ({ page }) => {
    //arrange
    const mainPage = new MainPage(page);
    const statsPage = new StatsPage(page);

    //act
    await mainPage.openMainPage();
    await mainPage.openStatsPage();

    //assert
    await statsPage.waitForOpen();
});
