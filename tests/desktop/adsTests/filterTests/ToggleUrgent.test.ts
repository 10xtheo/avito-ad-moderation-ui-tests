import { test } from "@playwright/test";
import { MainPage } from "../../../../pages/mainPage/mainPage";
import { StatsPage } from "../../../../pages/statsPage/statsPage";
test.describe("Проверка положений работы тогла срочных объявлений", () => {
    test("ВКЛ Тогл срочных объявлений", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);
        const statsPage = new StatsPage(page);
        //act
        await mainPage.openMainPage();
        await mainPage.checkUrgentToggle();

        //assert
        await mainPage.waitForOpen();
        // await mainPage.assertCardAreSortedByPriceFromHigh();
        await mainPage.assertAllCardsHaveUrgentBadge();
        // await statsPage.waitForOpen();
    });
    // Тут некорректно сделал, тогл не убирает все срочные, просто оставляет все вне зависимости от срочности
    // test("ВЫКЛ Тогл срочных объявлений", async ({ page }) => {
    //     //arrange
    //     const mainPage = new MainPage(page);
    //     const statsPage = new StatsPage(page);
    //     //act
    //     await mainPage.openMainPage();
    //     await mainPage.uncheckUrgentToggle();

    //     //assert
    //     await mainPage.waitForOpen();
    //     await mainPage.assertZeroCardsHaveUrgentBadge();
    // });
});
