import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class ContactElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getEmailField(): Locator {
    return this.page.locator('input[name="email"]');
  }

  getNroOrdemField(): Locator {
    return this.page.locator('input[name="subject"]');
  }

  getMessageField(): Locator {
    return this.page.locator('#message');
  }

  getSendButton(): Locator {
    return this.page.locator('input[name="submit"]');
  }

  getSubjectSelect(): Locator {
    return this.page.locator('input[name="name"]');
  }

  getMessageOK(): Locator {
    return this.page.getByRole('heading', { name: 'Contact Us' });
  }
}
