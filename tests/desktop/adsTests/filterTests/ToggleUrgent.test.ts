import { test } from "@playwright/test";
import { MainPage } from "../../../../pages/mainPage/mainPage";

test.describe("Проверка положений работы тогла срочных объявлений", () => {
    test("ВКЛ Тогл срочных объявлений", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);
        //act
        await mainPage.openMainPage();
        await mainPage.checkUrgentToggle();

        //assert
        await mainPage.waitForOpen();
        await mainPage.assertAllCardsHaveUrgentBadge();
        // TODO: добавить в асерт проверку последней страницы в пагинации
    });
});
