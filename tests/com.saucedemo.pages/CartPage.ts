import { Page } from '@playwright/test';
export class CartPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    //Quitar un producto
    async removeProduct(index = 0) {
        await this.page.getByText('Remove').nth(index).click();
    }
    //Ver el contenido del carrito
    async viewCartContents() {
        return this.page.locator('.cart_item');
    }
}