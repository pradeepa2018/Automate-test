import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: './utils/auth.setup.ts',
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
   
    screenshot: 'only-on-failure',
    headless: false,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Login',
      testMatch: 'login.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },

    },
    {
      name: 'Username',
      testMatch: 'use.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        storageState: 'storageState.json',
      },
      dependencies: ['Login']
    },
  ],
});