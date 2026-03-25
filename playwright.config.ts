import { defineConfig, devices } from '@playwright/test';

const BASE_URL = 'https://cerulean-praline-8e5aa6.netlify.app/'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // headless: false,
    launchOptions: {
      slowMo: 1000
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      testIgnore: 'mobile/**',
      use: { ...devices['Desktop Chrome'], baseURL: BASE_URL },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'], baseURL: BASE_URL },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'], baseURL: BASE_URL },
    // },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      testDir: './tests/mobile', 
      use: { ...devices['Pixel 5'] },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
