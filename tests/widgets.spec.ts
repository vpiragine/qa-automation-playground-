import { test, expect } from '@playwright/test';


test.describe('Widgets difíciles', async () => {
    test('permite escribir en un editor de texto enriquecido', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/iframe');
        const editor = page.frameLocator('#mce_0_ifr').locator('#tinymce');
        await expect(editor).toBeVisible();
        await expect(editor).toHaveText('Your content goes here.');
    })
    test ('permite ver alertas de JavaScript', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
        page.on('dialog', dialog => dialog.accept());
        await page.getByText('Click for JS Alert').click();
        await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
    })
    test ('permite interactuar con contenido que se carga dinámicamente', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
        await page.getByText('Start').click();
        await expect(page.locator('#finish')).toHaveText('Hello World!');
    })
    test ('permite subir archivos', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload');
        const filePath = 'tests/fixtures/archivo-prueba.txt';
        await page.locator('#file-upload').setInputFiles(filePath);
        await page.locator('#file-submit').click();
        await expect(page.locator('#uploaded-files')).toHaveText('archivo-prueba.txt');
    })
    test('permite introducir datos en tablas dinámicas', async ({ page }) => {
        await page.goto('https://demoqa.com/webtables');
        await page.getByRole('button', { name: 'Add' }).click();
        await page.getByPlaceholder('First Name').fill('Juan');
        await page.getByPlaceholder('Last Name').fill('Perez');
        await page.getByPlaceholder('name@example.com').fill('asd@asd.com');
        await page.getByPlaceholder('Age').fill('30');
        await page.getByPlaceholder('Salary').fill('50000');
        await page.getByPlaceholder('Department').fill('Ventas');
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('tr').filter({ hasText: 'Juan'})).toBeVisible();
        await expect(page.locator('tr').filter({ hasText: 'Perez'})).toBeVisible();
    })
    test('permite interactuar con menus desplegables personalizados', async ({ page }) => {
        await page.goto('https://demoqa.com/select-menu');
        // 1. Haz clic para abrir el menú flotante
        await page.locator('#react-select-2-input').click(); // línea 44[cite: 3]
        // 2. Haz clic directamente en la opción del menú desplegable por su texto
        await page.getByText('Group 1, option 1', { exact: true }).click();
        await expect(page.locator('#withOptGroup')).toContainText('Group 1, option 1');
})
})