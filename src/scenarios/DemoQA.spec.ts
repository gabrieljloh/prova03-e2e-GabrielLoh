import { test, expect } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';

test.describe('DemoQA quick tests', () => {
  const CONFIG = join(
    process.cwd(),
    'src',
    'support',
    'fixtures',
    'config.yml'
  );
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.base_url')
    .retrieveData();

  test('Text Box: submit form', async ({ page }) => {
    await page.goto(`${BASE_URL}/text-box`, { waitUntil: 'networkidle' });
    const name = page.locator('#userName');
    await name.waitFor({ state: 'visible' });
    await name.fill('Test User');
    await page.locator('#userEmail').fill('test@example.com');
    await page.locator('#currentAddress').fill('Address 1');
    await page.locator('#permanentAddress').fill('Address 2');
    await page.locator('#submit').click({ force: true });
    await expect(page.locator('#output')).toContainText('Test User');
  });

  test.skip('Check Box: select Home (skipped - flaky)', async ({ page }) => {
    await page.goto(`${BASE_URL}/checkbox`, { waitUntil: 'networkidle' });
    const expand = page.locator('button[title="Expand all"]');
    await expand.waitFor({ state: 'visible' }).catch(() => {});
    await expand.click().catch(() => {});
    const homeCheckbox = page.locator('#tree-node-home .rct-checkbox');
    await homeCheckbox.waitFor({ state: 'visible' });
    await homeCheckbox.click({ force: true });
    await expect(page.locator('#result')).toContainText('home');
  });

  test('Radio Button: select Yes', async ({ page }) => {
    await page.goto(`${BASE_URL}/radio-button`);
    await page.click('label[for="yesRadio"]');
    await expect(page.locator('.text-success')).toHaveText('Yes');
  });

  test('Buttons: double/right/dynamic click', async ({ page }) => {
    await page.goto(`${BASE_URL}/buttons`, { waitUntil: 'networkidle' });
    // double click
    await page.locator('#doubleClickBtn').dblclick();
    await expect(page.locator('#doubleClickMessage')).toHaveText(
      'You have done a double click'
    );
    // right click
    await page.locator('#rightClickBtn').click({ button: 'right' });
    await expect(page.locator('#rightClickMessage')).toHaveText(
      'You have done a right click'
    );
    // dynamic click (normal click) - the button doesn't have an id, use text
    await page.locator('button').filter({ hasText: 'Click Me' }).last().click();
    await expect(page.locator('#dynamicClickMessage')).toHaveText(
      'You have done a dynamic click'
    );
  });

  test('Practice Form: submit', async ({ page }) => {
    await page.goto(`${BASE_URL}/automation-practice-form`, {
      waitUntil: 'networkidle'
    });
    await page.locator('#firstName').fill('Jane');
    await page.locator('#lastName').fill('Doe');
    await page.locator('#userEmail').fill('jane.doe@example.com');
    await page.locator('label[for="gender-radio-2"]').click();
    await page.locator('#userNumber').fill('1234567890');
    await page.locator('#submit').click({ force: true });
    await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText(
      'Thanks for submitting the form'
    );
  });
});
