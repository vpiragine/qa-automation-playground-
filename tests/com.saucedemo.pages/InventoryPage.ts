import { Page } from '@playwright/test';
// Mismo patrón que LoginPage: guardamos "page" en el constructor y cada método es una acción que se puede hacer en esta pantalla.
export class InventoryPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    //Agregar un producto
    async addProductToCart(index = 0) {
        await this.page.getByText('Add to cart').nth(index).click();
    }
    //Ver el contenido del carrito
    getCartBadge() {
        return this.page.locator('.shopping_cart_badge');
    }
    //Ir al carrito
    async goToCart() {
        await this.page.locator('.shopping_cart_link').click();
}
}