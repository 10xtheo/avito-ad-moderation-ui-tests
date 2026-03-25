import { test } from "@playwright/test";
import { MainPage } from "../../../../pages/mainPage/mainPage";

const CATEGORY = "Работа";

test("Фильтрация по категории", async ({ page }) => {
    //arrange
    const mainPage = new MainPage(page);

    //act
    await mainPage.openMainPage();
    await mainPage.filterByCategory(CATEGORY)

    //assert
    await mainPage.waitForOpen();
    await mainPage.assertAllCardsHaveCategory(CATEGORY);
    // TODO: добавить в асерт проверку последней страницы в пагинации
});
