import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import ContactPage from '../support/pages/ContactPage';

test.describe('Formulário de contato', () => {
  const CONFIG = join(
    process.cwd(),
    'src',
    'support',
    'fixtures',
    'config.yml'
  );
  let contactPage: ContactPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.automationpractice_contact')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await page.goto(BASE_URL);
  });

  test('Enviar mensagem de contato', async () => {
    await contactPage.preencherFormulariodeContato('a@b.com.br');
    await contactPage.validarMensagemOK();
  });
});
