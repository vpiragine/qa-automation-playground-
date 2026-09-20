import { Page } from '@playwright/test';
export class CheckoutPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;

    }
    //Ir al checkout desde el carrito
    async goToCheckout() {
        await this.page.getByText('Checkout').click();
    }
    //Completar el formulario de checkout - info del cliente
    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.page.getByPlaceholder('First Name').fill(firstName);
        await this.page.getByPlaceholder('Last Name').fill(lastName);
        await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode);
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }
    //Hacer clic en "Finish" para completar la compra
    async confirmPurchase() {
        await this.page.getByRole('button', { name: 'Finish' }).click();
    }
}   
