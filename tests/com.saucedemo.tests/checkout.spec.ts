import { LoginPage } from '../com.saucedemo.pages/LoginPage';
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../com.saucedemo.pages/InventoryPage';
import { CartPage } from '../com.saucedemo.pages/CartPage';
import { CheckoutPage } from '../com.saucedemo.pages/CheckoutPage';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
});

test.describe('Pruebas de checkout', () => {
    test('realiza un checkout completo', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        // 1. Agregar un producto al carrito 
        await inventoryPage.addProductToCart(0);
        // 2. Ir al carrito
        await inventoryPage.goToCart();
        // 3. Hacer clic en "Checkout"
        await checkoutPage.goToCheckout();
        // 4. Completar el formulario de información del client
        await checkoutPage.fillCheckoutForm('Vanessa', 'Piragine', '12345');
        // 5. Verificar que se muestre la página de resumen del pedido
        await expect(page).toHaveURL(/checkout-step-two.html/);
        await expect(page.getByText('Payment Information')).toBeVisible();
        await expect(page.getByText('Shipping Information')).toBeVisible();
        await expect(page.getByText('Price Total')).toBeVisible();
        // 6. Hacer clic en "Finish"
        await checkoutPage.confirmPurchase();
        // 7. Verificar que se muestre la página de confirmación
        await expect(page).toHaveURL(/checkout-complete.html/);
        await expect(page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();
    })
});