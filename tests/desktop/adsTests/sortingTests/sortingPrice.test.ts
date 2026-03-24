import { test } from "@playwright/test";
import { MainPage } from "../../../../pages/mainPage/mainPage";

test.describe("Проверка сортировок по цене", () => {
    test("Сортировка по цене (по убыванию)", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);
        //act
        await mainPage.openMainPage();
        await mainPage.sortByPriceFromHigh();

        //assert
        await mainPage.waitForOpen();
        await mainPage.assertCardAreSortedByPriceFromHigh();
    });

    test("Сортировка по цене (по возрастанию)", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.sortByPriceFromLow();

        //assert
        await mainPage.waitForOpen();
        await mainPage.assertCardAreSortedByPriceFromLow();
    });
});
