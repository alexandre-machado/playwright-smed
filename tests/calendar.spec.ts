import { test, expect } from '@playwright/test';

test('has calendar', async ({ page }) => {
  await page.goto('https://agendamento.procempa.com.br/?orgao=SMED');

  // Preenche os campos de login e faz a autenticação
  await page.fill('#username', process.env.SMED_USERNAME || '');
  await page.fill('#password', process.env.SMED_PASSWORD || '');
  await page.click('input[name="login"]');
  await page.waitForLoadState();

  // Seleciona a opção desejada no ng-select
  await page.click('ng-select');
  await page.locator('ng-dropdown-panel .ng-option', { hasText: 'Vagas Escolares - Educação Infantil' })
    .click();

  // Clica no botão "Agendar"
  await page.click('button:text("Agendar")');
  await page.waitForLoadState();

  await expect(page.locator('ng-fullcalendar .fc-view-container')).not.toContainText('esgotado');

  await page.click('button.fc-next-button');

  await expect(page.locator('ng-fullcalendar .fc-view-container')).not.toContainText('horários disponíveis');

});