import { test } from "@playwright/test";
import { MainPage } from "../../../pages/mainPage/mainPage";

const DARK_THEME = "dark";
const LIGHT_THEME = "light";

const BUTTON_TEXT_LIGHT = "Светлая"
const BUTTON_TEXT_DARK = "Темная"

test.describe("Проверка свитча смены темы", () => {
    test("Смена темы светлая -> темная", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.switchTheme();

        //assert
        await mainPage.waitForOpen();
        await mainPage.assertThemeSet(DARK_THEME);
        await mainPage.assertThemeSwitchButtonSet(BUTTON_TEXT_LIGHT);
    });

    test("Смена темы светлая -> темная -> светлая", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.switchTheme();
        await mainPage.switchTheme();

        //assert
        await mainPage.waitForOpen();
        await mainPage.assertThemeSet(LIGHT_THEME);
        await mainPage.assertThemeSwitchButtonSet(BUTTON_TEXT_DARK);
    })
});
