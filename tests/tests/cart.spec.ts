import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
});

test.describe('Pruebas de carrito', () => {
    test('agrega 2 productos al carrito y elimina uno', async ({ page }) => {
        // 1. Agregar el primer producto
        await page.getByText('Add to cart').first().click();
        // 2. Agregar el segundo producto (el botón del primero cambió a "Remove")
        await page.getByText('Add to cart').first().click();
        // 3. Verificar que la insignia del carrito marque '2'
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
        // 4. Ir al carrito
        await page.locator('.shopping_cart_link').click();
        await expect(page).toHaveURL(/cart.html/);
        // 5. Eliminar un producto desde la vista del carrito
        await page.getByText('Remove').first().click();
        // 6. Verificar que la insignia del carrito marque '1'
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
})});

test.describe('Pruebas de checkout', () => {
    test('realiza un checkout exitoso', async ({ page }) => {
        // 1. Agregar un producto al carrito 
        await page.getByText('Add to cart').first().click();
        // 2. Ir al carrito
        await page.locator('.shopping_cart_link').click();
        await expect(page).toHaveURL(/cart.html/);
        // 3. Hacer clic en "Checkout"
        await page.getByText('Checkout').click();
        // 4. Completar el formulario de información del cliente
        await page.getByPlaceholder('First Name').fill('Ana');
        await page.getByPlaceholder('Last Name').fill('Perez');
        await page.getByPlaceholder('Zip/Postal Code').fill('28001');
        await page.getByText('Continue').click();
        // 5. Verificar que se muestre la página de resumen del pedido
        await expect(page).toHaveURL(/checkout-step-two.html/);
        // 6. Hacer clic en "Finish"
        await page.getByText('Finish').click();
        // 7. Verificar que se muestre la página de confirmación
        await expect(page).toHaveURL(/checkout-complete.html/);
        await expect(page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();
})});