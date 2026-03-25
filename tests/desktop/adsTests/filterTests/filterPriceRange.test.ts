import { test } from "@playwright/test";
import { MainPage } from "../../../../pages/mainPage/mainPage";

const PRICE_ZERO = 0;

const PRICE_FROM = 20000;
const PRICE_TO = 50000;

const PRICE_FROM_NEGATIVE = -5000;
const PRICE_TO_NEGATIVE = -1;


test.describe("Проверка фильтрации по диапазону цен", () => {
    test("Отображение объявлений От и До", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.fillPriceRange(String(PRICE_FROM), String(PRICE_TO));

        //assert
        await mainPage.waitForOpen();
        await mainPage.assertCardsBelongToPriceRangePositive(PRICE_FROM, PRICE_TO);
    });

    test("Отображение объявлений только От", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.fillPriceRange(String(PRICE_FROM), "");

        //assert
        await mainPage.waitForOpen();
        await mainPage.assertCardsBelongToPriceRangePositive(PRICE_FROM, null);
    });

    test("Отображение объявлений только До", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.fillPriceRange("", String(PRICE_TO));

        //assert
        await mainPage.waitForOpen();
        await mainPage.assertCardsBelongToPriceRangePositive(null, PRICE_TO);
    });

});

test.describe("Негативные проверки фильтрации по диапазону цен", () => {
    test("Отрицательная нижняя граница (От)", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.fillPriceRange(String(PRICE_FROM_NEGATIVE), "");

        //assert
        await mainPage.waitForOpen();
        await mainPage.assertZeroCardsBelongToPriceRange(PRICE_FROM_NEGATIVE, null);
    });

    test("Отрицательная верхняя граница (До)", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.fillPriceRange("", String(PRICE_TO_NEGATIVE));

        //assert
        await mainPage.waitForOpen();
        await mainPage.assertZeroCardsBelongToPriceRange(null, PRICE_TO_NEGATIVE);
    });

    test("Нулевая нижняя граница (От)", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.fillPriceRange(String(PRICE_ZERO), "");

        //assert
        await mainPage.waitForOpen();
        await mainPage.assertNoMinPriceSet();
    });

    test("Нулевая верхняя граница (До)", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.fillPriceRange("", String(PRICE_ZERO));

        //assert
        await mainPage.waitForOpen();
        await mainPage.assertZeroCardsBelongToPriceRange(null, PRICE_ZERO);
    });
});
