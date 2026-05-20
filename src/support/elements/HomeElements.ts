import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class HomeElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getSearchField(): Locator {
    return this.page.locator('#search_product');
  }

  getSearchButton(): Locator {
    return this.page.locator('#submit_search');
  }

  getProductCount(): Locator {
    return this.page.locator('.productinfo').first();
  }

  getLoginField(): Locator {
    return this.page.locator('#user-name');
  }

  getPassField(): Locator {
    return this.page.locator('#password');
  }

  getSubmitButton(): Locator {
    return this.page.locator('#login-button');
  }
}
