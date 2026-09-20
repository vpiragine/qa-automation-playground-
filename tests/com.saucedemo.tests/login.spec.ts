import { LoginPage } from '../com.saucedemo.pages/LoginPage';
import { test, expect } from '@playwright/test'; 

test.describe('Pruebas de carrito', () => {
    test('permite ingresar con credenciales válidas', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('bloquea a un usuario bloqueado', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('locked_out_user', 'secret_sauce');
        await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
    });

    test('muestra error con contraseña incorrecta', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'wrong_password');
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    });
});
